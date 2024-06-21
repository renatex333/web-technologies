from utils import load_data, load_template, build_response
from urllib.parse import unquote_plus
import json

def index(request):

    if request.startswith('POST'):
        request = request.replace('\r', '')  # Remove caracteres indesejados
        # Cabeçalho e corpo estão sempre separados por duas quebras de linha
        partes = request.split('\n\n')
        corpo = partes[1]
        params = {}
        # Preencha o dicionário params com as informações do corpo da requisição
        # O dicionário conterá dois valores, o título e a descrição.
        # Posteriormente pode ser interessante criar uma função que recebe a
        # requisição e devolve os parâmetros para desacoplar esta lógica.
        # Dica: use o método split da string e a função unquote_plus
        for chave_valor in corpo.split('&'):
            chave_valor = unquote_plus(chave_valor)
            index = chave_valor.find("=")
            params[chave_valor[:index]] = chave_valor[index+1:]

        add_nota(params)

    # Cria uma lista de <li>'s para cada anotação
    # Se tiver curiosidade: https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions
    note_template = load_template('components/note.html')
    notes_li = [
        note_template.format(title=dados['titulo'], details=dados['detalhes'])
        for dados in load_data('notes.json')
    ]
    notes = '\n'.join(notes_li)

    body = load_template('index.html').format(notes=notes)

    if request.startswith('POST'):
        return build_response(body=body, code=303, reason='See Other', headers='Location: /')
    else:
        return build_response(body=body)

def add_nota(params):
    with open("data/notes.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    data.append(params)

    with open("data/notes.json", "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)
