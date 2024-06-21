import json

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
        file = open(caminho, 'r')
        string_file = str(file.read())
        file.close()
        return string_file
    else:
        file = open(caminho, 'rb')
        file_bytes = file.read()
        file.close()
        return file_bytes
"""

# read_file() de acordo com o novo enunciado - ler tudo como binary
def read_file(path):
    with open(path, 'rb') as file:
        content = file.read()
    return content

def load_data(nome_arquivo):
    arquivo = "data/" + nome_arquivo
    with open(arquivo, 'r', encoding="utf-8") as json_file:
        data = json.load(json_file)
    return data

def load_template(nome_arquivo):
    arquivo = "templates/" + nome_arquivo
    with open(arquivo, 'r') as file:
        string_file = str(file.read())
    return string_file

def write_data(params):
    arquivo = "data/notes.json"
    with open(arquivo, "r", encoding="utf-8") as file:
        data = json.load(file)

    data.append(params)

    with open(arquivo, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

def build_response(body='', code=200, reason='OK', headers=''):
    response = "HTTP/1.1 {0} {1}".format(code, reason)

    if headers:
        response += "\n" + headers

    response += "\n\n"

    if body:
        response += body
    
    return response.encode()