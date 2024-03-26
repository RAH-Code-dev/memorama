from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profesores, Alumnos, Subpartidas, Partidas
from .serializers import ProfesoresSerializer, AlumnosSerializer, PartidasSerializer, CartasSerializer
from .serializers import PuntajeSerializer, SubPartidaSerializer, NumeroJugadoresEstadoSerializer


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

def createAlumno(name, subGameID):
    student = AlumnosSerializer(data={
        'nombre': name,
        'puntaje' : 0,
        'subpartidaID': subGameID,
    })

    if student.is_valid():
        student = student.save()
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

    studentID = createAlumno(studentName, subGameID=subGame.subpartidaID)
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


# FALTAN HACER TESTS, DEBERIA FUNCIONAR PERO NO LO HE PROBADO
@api_view(['GET'])
def getAlumnosPartida(request, partidaID):
    try:
        subGamesList = Subpartidas.objects.filter(subpartidaID=partidaID)
    except Subpartidas.DoesNotExist:
        return Response("No se encontraron subpartidas", status=status.HTTP_404_NOT_FOUND)
    
    if not subGamesList.exists():
        return Response("No se encontraron subpartidas", status=status.HTTP_404_NOT_FOUND)
    
    alumnos = []

    for subGame in subGamesList:
        try:
            alumnos.append(Alumnos.objects.filter(subpartidaID=subGame.subpartidaID))
        except Alumnos.DoesNotExist:
            pass

    serializer = AlumnosSerializer(alumnos, many=True)

    print(serializer)
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
