# Generated by Django 5.0.3 on 2024-03-21 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0006_partidas_nombre_alter_alumnos_nombre_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='partidas',
            name='nombre',
            field=models.CharField(max_length=50),
        ),
    ]
