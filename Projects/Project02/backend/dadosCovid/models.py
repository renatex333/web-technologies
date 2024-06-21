from django.db import models


class Note(models.Model):
    Pais = models.CharField(max_length=200)
    NumCasos = models.CharField(max_length=200)
    NumNovosCasos = models.CharField(max_length=200)
    NumMortes = models.CharField(max_length=200)
    NumNovasMortes = models.CharField(max_length=200)