from data.database import Database, Note

def extract_route(request):
    request_lista = request.split(" ")
    route = request_lista[1] 
    route = route[1:] # Fatiamento da String pra remover o primeiro caractere
    return route

"""
# read_file() de acordo com o enunciado antigo
def read_file(path):
    caminho = str(path)
    split_path = caminho.split(".")
    ext = split_path[1]
    allowed_extensions = ["txt", "html", "css", "js"]
    if ext in allowed_extensions:
        with open(caminho, 'r', encoding="utf-8") as file:
            string_file = str(file.read())
        return string_file.encode()
    else:
        with open(caminho, 'rb') as file:
            file_bytes = file.read()
        return file_bytes"""


# read_file() de acordo com o novo enunciado - ler tudo como binary
def read_file(path):
    with open(path, 'rb') as file:
        content = file.read()
    return content

def load_data(nome_arquivo):
    db = Database(nome_arquivo)
    data = db.get_all()
    return data

def load_template(nome_arquivo):
    arquivo = "templates/" + nome_arquivo
    #caminho = 'templates/' + nome_arquivo
    with open(arquivo, 'r', encoding='utf-8') as file:
        string_file = str(file.read())
    return string_file

def write_data(params):
    db = Database('banco')
    new_note = Note(title = params['titulo'], content = params['detalhes'])
    db.add(new_note)

def update_data(params):
    db = Database('banco')
    updated_note = Note(id = params['id'], title = params['titulo-edit'], content = params['detalhes-edit'])
    db.update(updated_note)

def delete_data(id):
    db = Database('banco')
    db.delete(id)

def build_response(body='', code=200, reason='OK', headers=''):
    response = "HTTP/1.1 {0} {1}".format(code, reason)

    if headers:
        response += "\n" + headers

    response += "\n\n"

    if body:
        response += body
    
    return response.encode()

def read_insper():
    with open("arquivos/insper.html", 'rb') as file:
        content = file.read()
    return content