# Generated by Django 5.0.3 on 2024-03-22 01:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0007_alter_partidas_nombre'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartas',
            name='cartaPar',
            field=models.IntegerField(default=1),
        ),
    ]
