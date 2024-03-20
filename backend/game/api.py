from rest_framework import viewsets, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .models import Profesores, Alumnos, Partidas, Subpartidas, Cartas
from .serializers import ProfesoresSerializer, AlumnosSerializer, PartidasSerializer, SubpartidasSerializer, CartasSerializer


# Tiene permitido POST, GET, DELETE y PATCH
# Recibe un nombre por POST y lo guarda en la BDD
# con una peticion GET regresa todos los nombres de los profesores guardados
# si le pasas el id como parametro por la url en una peticion GET te regresa el nombre
# lo mismo para PATCH y DELETE
# ej. api/profesores/2/
class ProfesoresViewSet(viewsets.ModelViewSet):
    queryset = Profesores.objects.all()
    serializer_class = ProfesoresSerializer


# ERROR AL HACER POST X EL CAMPO subpartidaID, no debe ser nulo pero no deja ponerlo como input en el POST
class AlumnosViewSet(viewsets.ModelViewSet):
    queryset = Alumnos.objects.all()
    serializer_class = AlumnosSerializer
    

# falta debugguear este endpoint, no esta en las urls tampoco
@api_view(['PUT'])
def updateScore(request, pk):
    try:
        alumno = Alumnos.objects.get(pk=pk)
    except Alumnos.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

    serializer = AlumnosSerializer(alumno, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class PartidasViewSet(viewsets.ModelViewSet):
    queryset = Partidas
    serializer_class = PartidasSerializer


class SubpartidasViewSet(viewsets.ModelViewSet):
    queryset = Subpartidas
    serializer_class = SubpartidasSerializer


class CartasViewSet(viewsets.ModelViewSet):
    queryset = Cartas
    serializer_class = CartasSerializer
