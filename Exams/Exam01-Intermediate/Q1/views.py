from utils import delete_data, load_data, load_template, write_data, update_data, build_response
from urllib.parse import unquote_plus

def index(request):
    # A string de request sempre começa com o tipo da requisição (ex: GET, POST)
    if request.startswith('POST'):
        request = request.replace('\r', '')  # Remove caracteres indesejados
        # Cabeçalho e corpo estão sempre separados por duas quebras de linha
        partes = request.split('\n\n')
        corpo = partes[1]
        params = {}

        splitted_corpo = corpo.split('&')
        # Se a request tiver apenas um "id", então está sendo pedida a remoção de um card com este  "id"
        if splitted_corpo[0].split('=')[0] == 'id' and len(splitted_corpo) == 1:
            note_id = splitted_corpo[0].split('=')[1]
            delete_data(note_id)
            
        # Se a request tiver um "id", além de outros parâmetros, quer dizer que está sendo pedida a edição do card com este "id"
        elif splitted_corpo[0].split('=')[0] == 'id':
            for chave_valor in splitted_corpo:
                chave_valor_split = chave_valor.split('=')
                chave = chave_valor_split[0]
                valor = unquote_plus(chave_valor_split[1])
                params[chave] = valor

            update_data(params)

        # Caso contrário, só adiciona mais um card
        else:
            # Preencha o dicionário params com as informações do corpo da requisição
            # O dicionário conterá dois valores, o título e a descrição.
            # Posteriormente pode ser interessante criar uma função que recebe a
            # requisição e devolve os parâmetros para desacoplar esta lógica.
            # Dica: use o método split da string e a função unquote_plus
            for chave_valor in corpo.split('&'):
                chave_valor_split = chave_valor.split('=')
                chave = chave_valor_split[0]
                valor = unquote_plus(chave_valor_split[1])
                params[chave] = valor

            write_data(params)
            """
            # Também funciona:
            for chave_valor in corpo.split('&'):
                chave_valor = unquote_plus(chave_valor)
                index = chave_valor.find("=")
                params[chave_valor[:index]] = chave_valor[index+1:]
            """

    # Cria uma lista de <li>'s para cada anotação
    # Se tiver curiosidade: https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions
    note_template = load_template('components/note.html')
    notes_li = [
        note_template.format(id = note.id, title = note.title, content = note.content)
        for note in load_data('banco')
    ]
    notes = '\n'.join(notes_li)

    body = load_template('index.html').format(notes=notes)

    if request.startswith('POST'):
        return build_response(body=body, code=303, reason='See Other', headers='Location: /')
    else: 
        return build_response(body=body)
    
    