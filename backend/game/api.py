from django.core.exceptions import MultipleObjectsReturned
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profesores, Alumnos
from .serializers import ProfesoresSerializer, AlumnosSerializer, PartidasSerializer
from .serializers import PuntajeSerializer


class ProfesoresViewSet(viewsets.ModelViewSet):
    queryset = Profesores.objects.all()
    serializer_class = ProfesoresSerializer
    

def CartasSave(cartasJSON):
    pass

@api_view(['POST'])
def crearPartida(request):
    try:
        nombreProfesor = request.data["nombre profesor"]
        nombreJuego = request.data["nombre Juego"]
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

    CartasSave(cartas)

    return Response({
        "profesorID": profesor.profesorID,
        "partidaID": partida.partidaID,
        })


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
def getAlumnosSubpartida(request, id):
    try:
        alumnos = Alumnos.objects.filter(subpartidaID=id)
    except Alumnos.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = AlumnosSerializer(alumnos, many=True)
    return Response(serializer.data)
