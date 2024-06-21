# Handout-Heroku-TW

A aplicação foi postada em: https://hidden-temple-40145.herokuapp.com/

## Passo-a-passo para colocar a aplicação no Heroku

Primeiro de tudo, precisa-se ter um repositório no git para o projeto. Lembre de dar commits constantes e sempre dar push para o git antes de dar push para o Heroku.

Crie um ambiente virtual dentro da raiz do projeto:

    python3 -m venv env
    
Baixe, caso ainda não possua, a [CLI do Heroku](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
Faça login no Heroku através do terminal (dentro da raiz do projeto):

    heroku login
    
Crie um projeto Heroku:

    heroku create
    
Configure o repositório com o projeto: (Este "nome-do-projeto" foi criado automaticamente pelo Heroku no passo anterior. Você pode acessá-lo pelo [Dashboard do Heroku](https://dashboard.heroku.com/apps)

    heroku git:remote -a nome-do-projeto
    git remote -v
    
Sempre que fizer alguma alteração no projeto, faça push para o Heroku: (Lembre de dar commits constantes e sempre dar push para o git antes de dar push para o Heroku)

    git push heroku main
    
## Aplicações Django com Database Postgres
    
Até o momento, nós utilizamos o python manage.py runserver para executar o nosso servidor localmente. Esse comando é apropriado apenas para testes no ambiente de desenvolvimento. Ele não é otimizado para uma aplicação real. Para isso precisamos de um servidor de Web Server Gateway Interface (WSGI), que basicamente é um intermediário entre as requisições que chegam no servidor e o código Python. No nosso projeto nós utilizaremos o Gunicorn (Green Unicorn). Você pode instalá-lo com:

    pip install gunicorn

Praticamente toda aplicação web possui arquivos estáticos. Desde o primeiro servidor que implementamos foi necessário que o servidor fosse capaz de responder com o conteúdo desses arquivos. Entretanto, passar pela camada do Python para devolver um arquivo estático não é uma boa estratégia para uma aplicação no mundo real. Arquivos estáticos podem ser servidos de maneira muito mais eficiente. Por esse motivo, o Django serve arquivos estáticos apenas em ambientes de teste/desenvolvimento, mas não em produção.

Para que a nossa aplicação funcione com todos os arquivos estáticos será necessário adicionarmos mais algumas dependências e alterarmos algumas configurações. Comece instalando o WhiteNoise:

    pip install whitenoise
    
O WhiteNoise é responsável por servir arquivos estáticos no Django de forma eficiente. Ele precisa ser adicionado às configurações do Django. Abra o arquivo settings.py na pasta do projeto Django e procure pela lista MIDDLEWARE e adicione o seguinte conteúdo logo depois de 'django.middleware.security.SecurityMiddleware',:

    'whitenoise.middleware.WhiteNoiseMiddleware',

Nesse mesmo arquivo, procure por STATIC_URL = '/static/' e adicione a seguinte linha logo em seguida:

    STATIC_ROOT = BASE_DIR / 'staticfiles'

A primeira modificação faz com que o WhiteNoise seja utilizado pelo Django. A constante STATIC_ROOT define onde o Django deve colocar os arquivos estáticos que serão servidos em produção (por isso você não precisou dele até agora).

### Outras modificações nas configurações

Aproveite que está com o settings.py aberto e modifique o valor da constante DEBUG para False. Além disso, procure pela lista ALLOWED_HOSTS. Ela deve ser uma lista vazia. Por questões de segurança, o servidor Django aceita apenas requisições vindas de domínios previamente identificados. Para isso, descubra qual é o domínio do seu app Heroku. A URL do app será parecida com: https://nome-do-projeto.herokuapp.com/ (substituindo 'nome-do-projeto" pelo nome do seu projeto). Adicione o domínio (o que está entre o https:// e a última /) na lista ALLOWED_HOSTS:

    ALLOWED_HOSTS = ['nome-do-projeto.herokuapp.com', 'localhost', '127.0.0.1']

Note que também adicionamos o 'localhost' e o '127.0.0.1'. Eles serão necessários para você testar a aplicação no seu computador.

### Criando o arquivo requirements.txt

Cada projeto Python possui dependências diferentes. Quando outra pessoa (ou você mesmo em outro computador) vai executar o seu projeto é necessário executar uma série de pip install com cada uma das dependências. Para simplificar esse processo podemos criar o arquivo requirements.txt. Com esse arquivo basta executar:
    
    pip install -r requirements.txt 
    
para instalar todas as dependências do projeto. O Heroku também utiliza esse mesmo arquivo para configurar o seu projeto no servidor deles. O requirements.txt é basicamente um arquivo texto com a lista das dependências. Ele pode ser criado com o comando:

    pip freeze > requirements.txt

### Fazendo o deploy

Agora estamos prontos para fazer o deploy! Faça um commit com todas essas modificações e depois faça o push com o comando a seguir:

    git push heroku main
    
### Aplicações com Postgres

Agora que você fez o primeiro deploy (por mais que tenha ocorrido um erro ou não tenha mostrado nada no app) o Heroku identificou que você está publicando uma aplicação Django. Assim, ele já disponibiliza uma instância do Postgres para você! Acesse a sua aplicação no [Dashboard do Heroku](https://dashboard.heroku.com/apps) e o Postgres deve aparecer nos add-ons instalados.

Uma opção é acessar os dados de configuração desse banco e alterar manualmente o dicionário DATABASES nas configurações. Entretanto, isso faria com que o seu código parasse de funcionar em desenvolvimento (no seu computador). Por isso, vamos utilizar o dj-database-url:

    pip install dj-database-url

Sempre que você adiciona (ou remove) uma dependência é necessário atualizar o requirements.txt:

    pip freeze > requirements.txt

Adicione o import no settings.py do projeto Django:

    import dj_database_url

Depois substitua o dicionário DATABASES por: (assumindo que você utilizou a configuração do Postgres apresentada no [handout anterior](https://barbaratieko.github.io/tecweb.2022.1/aulas/05-bd/) - caso contrário, adapte a URL)

    DATABASES = {
        'default': dj_database_url.config(
            default='postgresql://localhost/getit?user=getituser&password=getitsenha',
            conn_max_age=600,
            ssl_require=not DEBUG
        )
    }

Faça um novo commit e dê o push em heroku master novamente. Acesse sua aplicação para verificar que está tudo funcionando.

Parabéns, você acaba de publicar sua aplicação Django no Heroku e já pode compartilhar com todos os amigos e familiares!
