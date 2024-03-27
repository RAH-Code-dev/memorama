from django.db import models


class Profesores(models.Model):
    profesorID = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50, blank=False, null=False)


class Alumnos(models.Model):
    alumnoID = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50, blank=False, null=False)
    puntaje = models.IntegerField()
    subpartidaID = models.ForeignKey("Subpartidas", on_delete=models.CASCADE)
    partidaID = models.ForeignKey("Partidas", on_delete=models.CASCADE)


class Partidas(models.Model):
    partidaID = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50, blank=False, null=False)
    profesorID = models.OneToOneField("Profesores", on_delete=models.CASCADE)
    estado = models.TextField(max_length=100)


class Subpartidas(models.Model):
    subpartidaID = models.AutoField(primary_key=True)
    partidaID = models.ForeignKey("Partidas", on_delete=models.CASCADE)
    turnoAlumnoID = models.ForeignKey("Alumnos", on_delete=models.SET_NULL, null=True)
    estado = models.CharField(max_length=50)
    numeroJugadores = models.IntegerField()


class Cartas(models.Model):
    cartaID = models.AutoField(primary_key=True)
    partidaID = models.ForeignKey("Partidas", on_delete=models.CASCADE)
    contenido = models.TextField(max_length=500)
    cartaPar = models.IntegerField(blank=False, null=False)


class CartasEnSubPartida(models.Model):
    subpartidaID = models.ForeignKey("SubPartidas", on_delete=models.CASCADE)
    cartaID = models.ForeignKey("Cartas", on_delete=models.CASCADE)
    estado = models.CharField(max_length=50)


class VisibilidadSubsala(models.Model):
    alumnoID = models.AutoField(primary_key=True)
    subpartidaID = models.ForeignKey("Subpartidas", on_delete=models.CASCADE)
    visto = models.BooleanField()
