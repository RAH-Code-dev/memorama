from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profesores, Alumnos, Subpartidas, Partidas
from .serializers import ProfesoresSerializer, AlumnosSerializer, PartidasSerializer, CartasSerializer
from .serializers import PuntajeSerializer, subPartidaSerializer


class ProfesoresViewSet(viewsets.ModelViewSet):
    queryset = Profesores.objects.all()
    serializer_class = ProfesoresSerializer
    

def JsonCardsConverter(cartasJSON):
    for cardNum in cartasJSON:
        try:
            serializerQuestionCard = CartasSerializer(data={
                "contenido" : cartasJSON[cardNum]['question'],
                "cartaPar" : cardNum
                })
            serializerAnswerCard = CartasSerializer(data={
                "contenido" : cartasJSON[cardNum]['answer'],
                "cartaPar" : cardNum
                })
        except KeyError:
            return Response("Bad request", status=status.HTTP_400_BAD_REQUEST)
        
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
    except KeyError:
        return Response("Bad request", status=status.HTTP_400_BAD_REQUEST)
    
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

    res = JsonCardsConverter(cartas)
    if res is not None: return res

    return Response({
        "profesorID": profesor.profesorID,
        "partidaID": partida.partidaID,
        })


def createSubGame(partidaID, numeroJugadores):
    partida = Partidas.objects.get(pk=partidaID)
    subPartidaSerializer(data={
        'partidaID': partidaID,
        # AQUI CREO Q SE DEBE CAMBIAR LOS MODELS DE LAS CARTAS
        'cartaID' : partida.cartaID,
        'estado' : "iniciando",
        "numeroJugadores": numeroJugadores
    })
    pass


# FALTA Q SIRVA LA FUNCION createSubGame()
@api_view(['POST'])
def unirse(request):
    if not Subpartidas.objects.last():
        try:
            createSubGame(request.data['partidaID'], 1)
        except KeyError:
            return Response("Bad request", status=status.HTTP_400_BAD_REQUEST)
    
    lastSubgame = Subpartidas.objects.last()
    print(lastSubgame)
    if lastSubgame.numeroJugadores >= 4:
        try:
            createSubGame(request.data['partidaID'], lastSubgame.numeroJugadores+1)
        except KeyError:
            return Response("Bad request", status=status.HTTP_400_BAD_REQUEST)
    
    return Response({"prueba": lastSubgame})


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
