# Generated by Django 5.0.3 on 2024-03-20 16:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Alumnos',
            fields=[
                ('alumnoID', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100)),
                ('puntaje', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Cartas',
            fields=[
                ('cartaID', models.AutoField(primary_key=True, serialize=False)),
                ('contenido', models.TextField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Profesores',
            fields=[
                ('profesorID', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='CartasEnPartida',
            fields=[
                ('subpartidaID', models.AutoField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=50)),
                ('cartaID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.cartas')),
            ],
        ),
        migrations.CreateModel(
            name='Partidas',
            fields=[
                ('partidaID', models.AutoField(primary_key=True, serialize=False)),
                ('estado', models.TextField(max_length=100)),
                ('profesorID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.profesores')),
            ],
        ),
        migrations.CreateModel(
            name='Subpartidas',
            fields=[
                ('subpartidaID', models.AutoField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=50)),
                ('cartaID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.cartas')),
                ('turnoAlumnoID', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='game.alumnos')),
            ],
        ),
        migrations.AddField(
            model_name='alumnos',
            name='subpartidaID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.subpartidas'),
        ),
        migrations.CreateModel(
            name='VisibilidadSubsala',
            fields=[
                ('alumnoID', models.AutoField(primary_key=True, serialize=False)),
                ('visto', models.BooleanField()),
                ('subpartidaID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.subpartidas')),
            ],
        ),
    ]
