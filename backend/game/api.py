from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profesores, Alumnos, Subpartidas, Partidas, Cartas, CartasEnSubPartida, VisibilidadSubsala
from .serializers import ProfesoresSerializer, AlumnosSerializer, PartidasSerializer, CartasSerializer
from .serializers import PuntajeSerializer, SubPartidaSerializer, NumeroJugadoresEstadoSerializer, CartasEnSubPartidaSerializer
from rest_framework import viewsets

class ProfesoresViewSet(viewsets.ModelViewSet):
    queryset = Profesores.objects.all()
    serializer_class = ProfesoresSerializer

def JsonCardsConverter(cartasJSON, partidaID):
    for cardNum in cartasJSON:
        try:
            serializerQuestionCard = CartasSerializer(data={
                "contenido" : cartasJSON[cardNum]['question'],
                "cartaPar" : cardNum,
                "partidaID" : partidaID,
                })
            serializerAnswerCard = CartasSerializer(data={
                "contenido" : cartasJSON[cardNum]['answer'],
                "cartaPar" : cardNum,
                "partidaID": partidaID,
                })
        except KeyError as e:
            return Response({"KeyError": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        if not serializerQuestionCard.is_valid():
            return Response(serializerQuestionCard.errors, status=status.HTTP_400_BAD_REQUEST)
        
        if not serializerAnswerCard.is_valid():
            return Response(serializerAnswerCard.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializerQuestionCard.save()
        serializerAnswerCard.save()

@api_view(['POST'])
def crearPartida(request):
    try:
        nombreProfesor = request.data["nombre profesor"]
        nombreJuego = request.data["nombre juego"]
        cartas = request.data["cartas"]
    except KeyError as e:
        return Response({"KeyError": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    profesorSerializer = ProfesoresSerializer(data={"nombre" : nombreProfesor})
    if not profesorSerializer.is_valid():
        return Response(profesorSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    profesor = profesorSerializer.save()

    partidaSerializer = PartidasSerializer(data={
        "nombre" : nombreJuego,
        "profesorID" : profesor.profesorID,
        "estado" : "Iniciando",
        })
    if not partidaSerializer.is_valid():
        profesor.delete()
        return Response(partidaSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    partida = partidaSerializer.save()

    res = JsonCardsConverter(cartas, partida.partidaID)
    if res is not None: return res

    return Response({
        "profesorID": profesor.profesorID,
        "partidaID": partida.partidaID,
        })


def createSubGame(gameID, playersNumber):
    subGame = SubPartidaSerializer(data={
        'partidaID': gameID,
        'estado' : "iniciando",
        "numeroJugadores": playersNumber
    })

    if subGame.is_valid():
        subGame = subGame.save()
        return subGame
    return Response(subGame.errors, status=status.HTTP_400_BAD_REQUEST)

def turnoSubpartida(subGameID, alumnoID):
    subpartida = Subpartidas.objects.filter(subpartidaID=subGameID).first()
    if subpartida and not subpartida.turnoAlumnoID:
        subpartida.turnoAlumnoID = alumnoID
        subpartida.save()

def createAlumno(name, subGameID, gameID):
    student = AlumnosSerializer(data={
        'nombre': name,
        'puntaje' : 0,
        'subpartidaID' : subGameID,
        'partidaID' : gameID,
    })

    if student.is_valid():
        student = student.save()

        turnoSubpartida(subGameID, student.pk)
        return student.alumnoID
    return Response(student.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def unirse(request):
    try:
        gameID = request.data['partidaID']
        studentName = request.data['nombre alumno']
    except KeyError as e:
        return Response({"KeyError" : str(e)})

    # se crea o obtiene la subpartida y el alumno
    subGame = Subpartidas.objects.filter(partidaID=gameID).last()

    if not subGame:
        subGame = createSubGame(gameID, 0)

        if isinstance(subGame, Response):
            return subGame

    if subGame.numeroJugadores >= 4:
        subGame = createSubGame(gameID, 0)

        if isinstance(subGame, Response):
            return subGame

    studentID = createAlumno(studentName, subGame.subpartidaID, gameID)
    if isinstance(studentID, Response):
        return studentID

    # se suma 1 al numero de jugadores
    subGameSerializer = NumeroJugadoresEstadoSerializer(subGame, data={
        "estado" : subGame.estado,
        "numeroJugadores" : subGame.numeroJugadores+1,
    })
    if subGameSerializer.is_valid():
        subGameSerializer.save()
    
    return Response({
        "subpartidaID": subGame.subpartidaID,
        "alumnoID": studentID,
    })


@api_view(['GET'])
def getAlumnosPartida(request, partidaID):
    try:
        alumnos = Alumnos.objects.filter(partidaID=partidaID)
    except Alumnos.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if not alumnos.exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AlumnosSerializer(alumnos, many=True)
    return Response(serializer.data)



@api_view(['PUT'])
def updateScore(request, id):
    try:
        alumno = Alumnos.objects.get(pk=id)
    except Alumnos.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = PuntajeSerializer(alumno, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'puntaje' : serializer.validated_data['puntaje']})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getAlumnosSubpartida(request, subpartidaID):
    try:
        alumnos = Alumnos.objects.filter(subpartidaID=subpartidaID)
    except Alumnos.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if not alumnos.exists():
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = AlumnosSerializer(alumnos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCartasPartida(request, partidaID):
    try:
        cartas = Cartas.objects.filter(partidaID=partidaID)
    except Cartas.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if not cartas.exists():
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = CartasSerializer(alumnos, many=True)
    return Response(serializer.data)

def visualizarSubPartida(alumno):
    subpartidaview = VisibilidadSubsala.objects.filter(pk = alumno).first()
    subpartidaview.visto = True
    subpartidaview.save()

def usuariosVieron(subpartida):
    alumnos = Alumnos.objects.filter(subpartidaID=subpartida)

    i = 0
    for alumno in alumnos:
        subpartidaview = VisibilidadSubsala.objects.filter(pk = alumno.pk).first()

        if subpartidaview.visto:
            i = i + 1
    
    if i == len(alumnos):
        return True
    
    return False

def otrasVisualizaciones(subpartida):
    alumnos = Alumnos.objects.filter(subpartidaID=subpartida)

    if usuariosVieron(subpartida):
        for alumno in alumnos:
            subpartidaview = VisibilidadSubsala.objects.filter(pk = alumno.pk).first()
            subpartidaview.visto = False
            subpartidaview.save()

@api_view(['GET'])
def getCartasSubPartida(request, subpartidaID):

    alumno = Alumnos.objects.filter(subpartidaID=int(request.query_params.get("alumno"))).first()

    visualizarSubPartida(alumno)

    try:
        cartas = CartasEnSubPartida.objects.filter(subpartidaID=subpartidaID)
    except Cartas.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if not cartas.exists():
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if usuariosVieron(subpartidaID):
        for carta in cartas:
            carta_original = Cartas.objects.filter(cartaID=carta.cartaID).first()
            carta_par = CartasEnSubPartida.objects.filter(pk=carta_original).first()

            if carta.estado == "volteada" and carta_par.estado != "volteada":
                carta.estado = "oculta"
                carta.save()

    otrasVisualizaciones(subpartidaID)

    serializer = CartasEnSubPartidaSerializer(cartas, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def voltearCartas(request, subpartidaID):
    alumnoID = request.data.get("alumnoID")
    carta1ID = request.data.get("carta1ID")
    carta2ID = request.data.get("carta2ID")

    subpartida = Subpartidas.objects.filter(subpartidaID=subpartidaID).first()
    if subpartida.turnoAlumnoID_id != alumnoID:
        return Response({"message": "No tienes el turno en esta subpartida"}, status=status.HTTP_403_FORBIDDEN)

    carta1 = CartasEnSubPartida.objects.filter(subpartidaID=subpartidaID, cartaID=carta1ID).first()
    carta2 = CartasEnSubPartida.objects.filter(subpartidaID=subpartidaID, cartaID=carta2ID).first()

    if carta1 and carta2:
        carta1.estado = "volteada"
        carta1.save()
        carta2.estado = "volteada"
        carta2.save()

        cartas = CartasEnSubPartida.objects.filter(subpartidaID=subpartidaID)
        serializer = CartasEnSubPartidaSerializer(cartas, many=True)
        return Response(serializer.data)
    else:
        return Response({"message": "No se encontraron las cartas especificadas"}, status=status.HTTP_404_NOT_FOUND)
