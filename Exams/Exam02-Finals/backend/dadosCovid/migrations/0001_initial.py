# Generated by Django 4.0.4 on 2022-05-17 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Pais', models.CharField(max_length=200)),
                ('NumCasos', models.CharField(max_length=200)),
                ('NumNovosCasos', models.CharField(max_length=200)),
                ('NumMortes', models.CharField(max_length=200)),
                ('NumNovasMortes', models.CharField(max_length=200)),
            ],
        ),
    ]