from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profesores, Alumnos, Subpartidas, Partidas
from .serializers import ProfesoresSerializer, AlumnosSerializer, PartidasSerializer, CartasSerializer
from .serializers import PuntajeSerializer, SubPartidaSerializer


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


def createSubGame(partidaID, numeroJugadores):
    subPartida = SubPartidaSerializer(data={
        'partidaID': partidaID,
        'estado' : "iniciando",
        "numeroJugadores": numeroJugadores
    })

    if subPartida.is_valid():
        subPartida.save()
        return subPartida.validated_data['subpartidaID']

    return Response(subPartida.errors, status=status.HTTP_400_BAD_REQUEST)

def createAlumno(nombre, subPartidaID):
    alumno = AlumnosSerializer(data={
        'nombre' : nombre,
        'puntaje' : 0,
        'subpartidaID': subPartidaID,
    })

    if alumno.is_valid():
        alumno = alumno.save()
        return alumno.alumnoID

    return Response(alumno.errors, status=status.HTTP_400_BAD_REQUEST)

# EL ENDPOINT FUNCIONA PARA GUARDAR DATOS EN LA DB, PERO TIENE UN ERROR
# AL CREAR UNA SUBPARTIDA REGRESA UN KEY ERROR EN LUGAR DE LO QUE DEBERIA REGRESAR
@api_view(['POST'])
def unirse(request):
    if not Subpartidas.objects.last():
        try:
            createSubGame(request.data['partidaID'], 0)
        except KeyError as e:
            return Response({"KeyError": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    lastSubgame = Subpartidas.objects.last()
    try:
        subGameID = lastSubgame.subpartidaID
    except AttributeError:
        return Response({"Error": "No existe una partida con ese ID"}, status=status.HTTP_400_BAD_REQUEST)

    if lastSubgame.numeroJugadores >= 4:
        try:
            subGameID = createSubGame(request.data['partidaID'], 0)
        except KeyError as e:
            return Response({"KeyError here": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
        if not isinstance(subGameID, int):
            return subGameID
    
    try:
        alumnoID = createAlumno(request.data['nombre alumno'], subGameID)
    except KeyError as e:
        return Response({"KeyError": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    if not isinstance(alumnoID, int):
        return alumnoID
    
    lastSubgameSerializer = SubPartidaSerializer(lastSubgame, data={
        'numeroJugadores': lastSubgame.numeroJugadores+1,
        'partidaID' : lastSubgame.partidaID.pk,
        'estado' : lastSubgame.estado,
    })
    if not lastSubgameSerializer.is_valid():
        return Response(lastSubgameSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    subGameID = lastSubgameSerializer.save()
    
    return Response({
        "subpartidaID": subGameID.pk,
        "alumnoID": alumnoID,
    })


# FALTAN HACER TESTS, DEBERIA FUNCIONAR PERO NO LO HE PROBADO
@api_view(['GET'])
def getAlumnosPartida(request, partidaID):
    try:
        alumnos = Alumnos.objects.filter(pk=partidaID)
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


# FALTAN HACER TESTS, DEBERIA FUNCIONAR PERO NO LO HE PROBADO
@api_view(['GET'])
def getAlumnosSubpartida(request, subpartidaID):
    try:
        alumnos = Alumnos.objects.filter(subpartidaID=subpartidaID)
    except Alumnos.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    print(alumnos.exists())
    if not alumnos.exists():
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = AlumnosSerializer(alumnos, many=True)
    return Response(serializer.data)
