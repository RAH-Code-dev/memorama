from rest_framework import viewsets
from rest_framework.decorators import api_view, authentication_classes, permission_classes
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


class AlumnosViewSet(viewsets.ModelViewSet):
    queryset = Alumnos
    serializer_class = AlumnosSerializer


class PartidasViewSet(viewsets.ModelViewSet):
    queryset = Partidas
    serializer_class = PartidasSerializer


class SubpartidasViewSet(viewsets.ModelViewSet):
    queryset = Subpartidas
    serializer_class = SubpartidasSerializer


class CartasViewSet(viewsets.ModelViewSet):
    queryset = Cartas
    serializer_class = CartasSerializer
