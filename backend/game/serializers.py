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
            'nombre',
            'puntaje',
            'subpartidaID',
            'partidaID',
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


class CartasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cartas
        fields = (
            'contenido',
            'cartaPar',
            'partidaID',
        )


class SubPartidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subpartidas
        fields = (
            'partidaID',
            'turnoAlumnoID',
            'estado',
            'numeroJugadores',
        )


class NumeroJugadoresEstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subpartidas
        fields = (
            'estado',
            'numeroJugadores',
        )


class CartasEnSubPartidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartasEnSubPartida
        fields = (
            'subpartidaID',
            'cartaID',
            'estado',
        )