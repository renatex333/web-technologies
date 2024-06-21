const axios = require("axios");
const optionsToken = {headers: {"Content-Type": "application/json", "Accept": "application/json"}};
axios.post('https://tecweb-js.insper-comp.com.br/token', {username: "renatolf1"}, optionsToken).then(
    (response) => {
        token = response.data.accessToken;
        authorization = `Bearer ${token}`;
        optionsRequests = {headers: {"Content-Type": "application/json", "Accept": "application/json", "Authorization": authorization}};
        axios.get("https://tecweb-js.insper-comp.com.br/exercicio", optionsRequests).then(
            (response) => {
                console.log(response.data);
                let data = response.data;

                // soma
                let answer = soma(data);
                let url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/soma'
                envia_resposta(url_post, answer, optionsRequests, "Soma");

                // tamanho-string
                answer = tamanhoString(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/tamanho-string'
                envia_resposta(url_post, answer, optionsRequests, "Tamanho String");

                // nome-do-usuario
                answer = nomeDoUsuario(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/nome-do-usuario'
                envia_resposta(url_post, answer, optionsRequests, "Nome do Usuário");

                // jaca-wars
                answer = jacaWars(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/jaca-wars'
                envia_resposta(url_post, answer, optionsRequests, "JacaWars");

                // ano-bissexto
                answer = anoBissexto(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/ano-bissexto'
                envia_resposta(url_post, answer, optionsRequests, "Ano Bissexto");

                // volume-da-pizza
                answer = volumePizza(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/volume-da-pizza'
                envia_resposta(url_post, answer, optionsRequests, "Volume da Pizza");

                // mru
                answer = mru(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/mru'
                envia_resposta(url_post, answer, optionsRequests, "MRU");

                // inverte-string
                answer = inverteString(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/inverte-string'
                envia_resposta(url_post, answer, optionsRequests, "Inverte String");

                // soma-valores
                answer = somaValores(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/soma-valores'
                envia_resposta(url_post, answer, optionsRequests, "Soma Valores");

                // n-esimo-primo
                answer = nEsimoPrimo(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/n-esimo-primo'
                envia_resposta(url_post, answer, optionsRequests, "Enésimo Primo");

                // // maior-prefixo-comum
                // answer = maiorPrefixoComum(data);
                // url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/maior-prefixo-comum'
                // envia_resposta(url_post, answer, optionsRequests, "Maior Prefixo Comum");

                // soma-segundo-maior-e-menor-numeros
                answer = somaSegundoMaiorMenor(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/soma-segundo-maior-e-menor-numeros'
                envia_resposta(url_post, answer, optionsRequests, "Soma Segundo Maior e Menor Números");

                // conta-palindromos
                answer = contaPalindromos(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/conta-palindromos'
                envia_resposta(url_post, answer, optionsRequests, "Conta Palíndromos");

                // soma-de-strings-de-ints
                answer = somaStringsInts(data);
                url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/soma-de-strings-de-ints'
                envia_resposta(url_post, answer, optionsRequests, "Soma de Strings de Ints");

                // soma-com-requisicoes
                somaComRequisicoes(data).then(
                    (resposta) => {
                        answer = resposta;
                        url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/soma-com-requisicoes';
                        envia_resposta(url_post, answer, optionsRequests, "Soma com Requisições");
                    }
                );

                // caca-ao-tesouro
                cacaTesouro(data).then(
                    (resposta) => {
                        let answer = resposta;
                        url_post = 'https://tecweb-js.insper-comp.com.br/exercicio/caca-ao-tesouro';
                        envia_resposta(url_post, answer, optionsRequests, "Caça ao tesouro");
                    });
                
            }
        )
    }
);

async function envia_resposta(url_to_post, answer, optionsRequests, exercicio) {
    await axios.post(url_to_post, {"resposta": answer}, optionsRequests).then(
        (response) => {
            console.log(`${exercicio} => Sucesso: ${response.data.sucesso}`);
        });
};

// Exercícios que devem ser feitos:

// soma
function soma(data) {
    let entrada = data.soma.entrada;
    let a = entrada.a;
    let b = entrada.b;
    return a+b;
};
// tamanho-string
function tamanhoString(data) {
    let entrada = data["tamanho-string"].entrada;
    let s = entrada.string;
    return s.length;
};
// nome-do-usuario
function nomeDoUsuario(data) {
    let entrada = data["nome-do-usuario"].entrada;
    let email = entrada.email;
    return email.split("@")[0];
};
// jaca-wars
function jacaWars(data) {
    let entrada = data["jaca-wars"].entrada;
    let v = entrada.v;
    let thetaDegrees = entrada.theta;
    let thetaRadians = thetaDegrees * (Math.PI/180);
    let g = 9.8;
    let d = (Math.pow(v, 2) * Math.sin(2*thetaRadians))/g;
    if (d >= 102) {
        var resposta = 1;
    } else if (d <= 98) {
        var resposta = -1;
    } else {
        var resposta = 0;
    };

    return resposta;
};
// ano-bissexto
function anoBissexto(data) {
    let entrada = data["ano-bissexto"].entrada;
    let ano = entrada.ano;
    if ((ano % 400 == 0) || ((ano % 4 == 0) && (ano % 100 != 0))){
        var resposta = true;
    } else {
        var resposta = false;
    };

    return resposta;
};
// volume da pizza
function volumePizza(data) {
    let entrada = data["volume-da-pizza"].entrada;
    let raio = entrada.z;
    let altura = entrada.a;
    let volume = Math.round(Math.PI*altura*Math.pow(raio, 2));
    return volume;
};
// mru - movimento retilineo uniforme
function mru(data) {
    let entrada = data.mru.entrada;
    let s0 = entrada.s0;
    let v = entrada.v;
    let t = entrada.t;
    let s = s0 + v*t;
    return s;
};
// inverte-string
function inverteString(data) {
    let entrada = data["inverte-string"].entrada;
    let s = entrada.string;
    let splited = s.split("");
    let reverseArray = splited.reverse();
    let joined = reverseArray.join("");
    return joined;
};
// soma-valores
function somaValores(data) {
    let objeto = data["soma-valores"].entrada.objeto;
    let valores = Object.values(objeto);
    let soma = valores.reduce((a, b) => a + b, 0);
    return soma;
};
// n-esimo-primo
function numerosPrimos(num) {
let arrayPrimos = new Array();
for (var i = 0; i <= num; i++) {
    if (ehPrimo(i)){
        arrayPrimos.push(i);
    }
}
return arrayPrimos;
};
function ehPrimo(num) {
for(let i = 2; i < num; i++)
    if(num % i === 0) {
        return false
    };
return num > 1;
};
function nEsimoPrimo(data) {
    let entrada = data["n-esimo-primo"].entrada;
    let n = entrada.n;
    let arrayPrimos = numerosPrimos(10*n);
    return arrayPrimos[n-1]
};
// maior-prefixo-comum
function maiorPrefixoComum(data) {
    return 0
};
// soma-segundo-maior-e-menor-numeros
function somaSegundoMaiorMenor(data) {
    let entrada = data["soma-segundo-maior-e-menor-numeros"].entrada;
    let arrayNumeros = entrada.numeros;
    let ordered = arrayNumeros.sort((a, b) => a - b);
    let maior = Math.max(...ordered);
    let menor = Math.min(...ordered);
    for (var i = 0; i < ordered.length; i++){
        if (ordered[i] === maior || ordered[i] === menor){
            ordered.splice(i, 1);
            i--;
        };
    };
    let segmaior = Math.max(...ordered);
    let segmenor = Math.min(...ordered);

    return segmaior + segmenor;
};
// conta-palindromos
function contaPalindromos(data) {
    let entrada = data["conta-palindromos"].entrada;
    let palavras = entrada.palavras;
    var cont = 0;
    for (var i = 0; i < palavras.length; i++){
        let splited = palavras[i].split("");
        let reverseArray = splited.reverse();
        let invertida = reverseArray.join("");

        if (palavras[i] === invertida){
            cont++;
        };
    };
    return cont;
    
};
// soma-de-strings-de-ints
function somaStringsInts(data) {
    let entrada = data["soma-de-strings-de-ints"].entrada;
    let strings = entrada.strings;
    let numeros = strings.map((s) => parseInt(s, 10));
    let soma = numeros.reduce((a, b) => a+b, 0);
    return soma;
};
// soma-com-requisicoes
async function somaComRequisicoes(data) {
    let entrada = data["soma-com-requisicoes"].entrada;
    let endpoints = entrada.endpoints;
    var soma = 0;
    for (e of endpoints){
        await axios.get(e, optionsRequests).then(
            (response) => {soma += response.data});
    };
    return soma;  
}; 
// caca-ao-tesouro
async function getCacaTesouroData(endpoint){
    var achou = false;
    var resposta = 0;
    while (!achou) {
        await axios.get(endpoint, optionsRequests).then(
            (response) => {
                endpoint = response.data;
                if (typeof endpoint === 'number'){
                    achou = true;
                    resposta = endpoint;
                } else {
                }
        });
    }

    return resposta;
    
};
    
async function cacaTesouro(data) {
    let entrada = data["caca-ao-tesouro"].entrada;
    var inicio = entrada.inicio;
    var endpoint = inicio;
    var answer = 0;
    await getCacaTesouroData(endpoint).then(
        (resposta) => {
            answer = resposta;
        }
    )
    return answer;
};