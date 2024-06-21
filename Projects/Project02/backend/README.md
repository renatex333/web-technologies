# projeto-2-backend-williambonner-backend

Projeto 2 de TecWeb - Backend

Link do Heroku: https://enigmatic-hamlet-10547.herokuapp.com/

Por Diogo dos Reis Duarte e Renato Laffranchi Falcão

Vamos utilizar a [API Covid-19](https://rapidapi.com/api-sports/api/covid-193/)

Funcionalidade 1: Devolver os dados do brasil

Funcionalidade 2: Fazer uma comparação com um país de escolha do usuário

# Para o Desenvolvimento do Projeto

Para começar a trabalhar no projeto, é necessário ligar o ambiente virtual (env). Navegando pelo prompt até o diretório do projeto git, utilizar o comando:

    env\Scripts\activate.bat
    
Sempre que fizer alterações nas dependências do projeto (ou seja, bibliotecas), é importante utilizar o seguinte comando para que a aplicação no Heroku continue funcionando corretamente:

    pip freeze > requirements.txt

Para rodar o backend, utilize o comando:

    python manage.py runserver
    
Para inicializar o docker: (comando do PowerShell) (criei o container com o nome de wilbon-docker)

    docker run --rm --name wilbon-docker -e POSTGRES_PASSWORD=escolhaumasenha -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
    
Para manter o Heroku sempre atualizado, usar o comando:

    git push heroku main
