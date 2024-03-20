from rest_framework import serializers
from .models import *


class ProfesoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesores
        fields = (
            'nombre',
        )
        read_only = (
            'profesorID',
        )


class AlumnosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumnos
        fields = (
            'alumnoID',
            'nombre',
            'puntaje',
            'subpartidaID',
        )


class PartidasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partidas
        fields = (
            'partidaID',
            'profesorID',
            'estado',
        )


class SubpartidasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subpartidas
        fields = (
            'turnoAlumnoID',
            'cartaID',
            'estado',
            'subpartidaID',
        )


class CartasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cartas
        fields = (
            'contenido',
        )
        read_only = (
            'cartaID',
        )


class CartasEnPartidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartasEnPartida
        fields = (
            'subpartidaID',
            'cartaID',
            'estado',
        )