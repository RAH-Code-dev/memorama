# Generated by Django 5.0.3 on 2024-03-21 16:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0004_alter_subpartidas_partidaid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subpartidas',
            name='cartaID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='game.cartas'),
        ),
    ]