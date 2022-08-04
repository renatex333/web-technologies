from utils import load_data, load_template, write_data, build_response
from urllib.parse import unquote_plus

def index(request):
    # A string de request sempre começa com o tipo da requisição (ex: GET, POST)
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
            chave_valor_split = chave_valor.split('=')
            chave = chave_valor_split[0]
            valor = unquote_plus(chave_valor_split[1])
            params[chave] = valor

        """
        # Também funciona:
        for chave_valor in corpo.split('&'):
            chave_valor = unquote_plus(chave_valor)
            index = chave_valor.find("=")
            params[chave_valor[:index]] = chave_valor[index+1:]
        """
            
        write_data(params)

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
    
    