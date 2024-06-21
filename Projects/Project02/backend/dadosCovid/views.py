from glob import glob
import time
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from .models import Note
from .serializers import NoteSerializer
import requests

# Dicionário com o nome dos países em português e em inglês
global paises
paises =  {
        "Argentina": "Argentina",
        "Bolívia": "Bolivia",
        "Brasil": "Brazil",
        "Chile": "Chile",
        "Colômbia": "Colombia",
        "Equador": "Ecuador",
        "Guiana": "Guyana",
        "Paraguai": "Paraguay",
        "Peru": "Peru",
        "Suriname": "Suriname",
        "Uruguai": "Uruguay",
        "Venezuela": "Venezuela"
    }

def get_api_data(country):
    url = "https://covid-193.p.rapidapi.com/statistics"

    querystring = {"country":country}

    headers = {
	    "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
	    "X-RapidAPI-Key": "431b871e74msha3177211b2d7899p1645e3jsnde8a9570000a"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    final = response.json()

    return final['response']

def index(request): 
    Note.objects.all().delete()
    return HttpResponse("Olá mundo! Este é o app dadosCovid de Tecnologias Web do Insper.")

@api_view(['GET', 'POST'])
def save_api_note(request):
    if request.method == 'POST':
        pais = request.data['data']

        # Checa a existência da nota no banco de dados.
        # Se não existir, faz a requisição na API, cria e salva a nota.
        Nota = Note.objects.filter(Pais = paises[pais])

        if not Nota:
        
            data = get_api_data(paises[pais])[0]

            num_novos_casos = 0
            num_novas_mortes = 0

            if data['cases']['new']:
                num_novos_casos = data['cases']['new']
                num_novos_casos = num_novos_casos.replace("+", "") 
                
            if data['deaths']['new']:
                num_novas_mortes = data['deaths']['new']
                num_novas_mortes = num_novas_mortes.replace("+", "") 

            Nota = Note(Pais = data['country'], 
                NumCasos = data['cases']['total'], 
                NumNovosCasos = num_novos_casos,
                NumMortes = data['deaths']['total'],
                NumNovasMortes = num_novas_mortes)
            
            Nota.save()

    return Response()

@api_view(['GET', 'POST'])
def get_country_data(request):
    if request.method == 'POST':
        pais = request.data["data"]
        
        Nota = Note.objects.filter(Pais = paises[pais])[0]

        serialized_note = NoteSerializer(Nota)
        return Response(serialized_note.data)
        
    return Response()