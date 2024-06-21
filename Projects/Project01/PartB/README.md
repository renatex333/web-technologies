# Projeto 1 - Parte B
Por: Renato Laffranchi Falcão

## Iniciando o Projeto

Crie uma pasta para a nova versão do projeto e, dentro dela, crie um ambiente virtual (venv) chamado env para o seu projeto. Lembre-se de ativar o ambiente antes de prosseguir.

Para criar um ambiente de trabalho virtual, seguiremos os seguintes passos:

## O que é um ambiente virtual (venv)?

Quando já temos uma versão do Python instalada e uma nova versão é lançada, o que acontece? Do ponto de vista do avanço da tecnologia isso parece ótimo! Mas pense nos projetos antigos. O que acontecerá com eles quando você atualizar a versão do Python no seu computador para uma versão mais recente que muda um comportamento ou remove uma função que você utilizava no projeto? O exemplo da versão do Python é um pouco mais drástico, mas e quanto às inúmeras bibliotecas/pacotes que você utiliza em cada projeto?

Para resolver esse (e outros) problema, foram criados os ambientes virtuais (venv) do Python. Ele cria uma "nova instalação" do Python exclusiva para o seu projeto e os pacotes são instalados apenas nesse ambiente. Ou seja, quando você muda de projeto, basta mudar de ambiente virtual para usar uma instalação diferente, com um conjunto diferente de pacotes.

### Criando um ambiente virtual

Para criar um ambiente virtual (venv), utilize o comando:

    python3 -m venv NOME_DA_PASTA_DO_VENV

É comum utilizarmos nomes como env ou .env para o NOME_DA_PASTA_DO_VENV. Mas vamos padronizar o uso do nome env. Assim, o comando seria:

    python3 -m venv env

Ou, caso não funcione:

    python -m venv env

Esse comando vai criar uma pasta chamada env dentro da pasta onde ele foi executado. Todos os arquivos necessários estarão dentro da pasta env.

### Ativando um ambiente virtual

Será necessário ativar o ambiente virtual toda vez que você for trabalhar com ele. No começo isso pode parecer um pouco maçante, mas é apenas um comando e você logo vai se acostumar:

    env\Scripts\activate.bat

Pronto! Agora quando você utilizar o Python nesse terminal, será utilizada a versão do ambiente virtual.

Os comandos acima ativam o ambiente virtual para aquela instância do terminal. Ou seja, se você abrir outro terminal, mesmo que seja na mesma pasta, você estará utilizando o Python do sistema.

## Instalando o Django

Agora sim, instale o Django:

    python -m pip install Django

Para verificar se a instalação foi bem sucedida, inicie o Python em sua versão interativa (digite python no terminal) e utilize os seguintes comandos:

    import django
    print(django.get_version())
    
## Configuração do Docker no Django

Agora vamos configurar o Django para que ele utilize o Postgres do nosso container ao invés do SQLite. Para isso será necessário instalar o módulo psycopg2 (não se esqueça de ativar o ambiente virtual antes):


    pip install psycopg2
    
Procure o código a seguir no arquivo getit/settings.py no seu projeto:

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
Substitua esse dicionário por:

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'getit',
            'USER': 'getituser',
            'PASSWORD': 'getitsenha',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }

Pronto! Seu projeto Django está configurado para utilizar o Postgres!

## Iniciando o servidor do Docker para iniciar o banco de dados

Execute o container (no PowerShell):

    docker run --rm --name pg-docker -e POSTGRES_PASSWORD=escolhaumasenha -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
    
Rode o servidor (no Prompt no caminho do projeto):

    python manage.py runserver

Para fechar o servidor do Docker:

    docker kill pg-docker


