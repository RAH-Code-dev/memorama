# Generated by Django 5.0.3 on 2024-03-22 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0008_cartas_cartapar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartas',
            name='cartaPar',
            field=models.IntegerField(),
        ),
    ]
