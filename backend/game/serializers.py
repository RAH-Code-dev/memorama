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


class PuntajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumnos
        fields = (
            'puntaje',
        )


class PartidasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partidas
        fields = (
            'nombre',
            'profesorID',
            'estado',
        )