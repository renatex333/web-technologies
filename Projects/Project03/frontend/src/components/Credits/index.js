import React from "react";
import "./index.css";

export default function Credits() {

  return (
    <div className="credits-page">
        <p>
          O Nintendo Switch é um console de videogame lançado em março de 2017 pela Nintendo. 
          O Switch se trata de um console híbrido semelhante a um tablet, o qual pode ser acoplado a um dock e, assim, ser transformado em um console de mesa. 
          O console também conta com dois controles sem fio acopláveis de cada lado, chamados pela Nintendo de Joy-Con, que podem ser usados individualmente ou 
          ser acoplados à unidade principal (no modo portátil) ou a uma base semelhante a um gamepad. Os títulos suportam jogatinas online através 
          da uma conexão de Internet e também modo multijogador local com outros consoles.
        </p>
        <p>
          No entanto, apesar do console permitir que seus usuários se conectem com outros jogadores, as ferramentas desenvolvidas pela Nintendo para proporcionar 
          a comunicação entre os usuários são rudimentares e deficientes. Portanto, surge uma necessidade dentro da comunidade por mais formas de interação e comunicação.
        </p>
        <p>
          Desta forma, desenvolvemos uma plataforma em que usuários de Nintendo Switch possam desenvolver novas amizades dentro da comunidade. Assim, os usuários 
          podem fazer novos amigos com mais facilidade, além de receberem notícias sobre o mundo dos Games.
        </p>
        <p>
          As notícias são obtidas através de uma API chamada "Gaming-News". Mais informações sobre ela podem ser encontradas <a href={"https://rapidapi.com/alexaustin9816-BYtbNAGYg_K/api/gaming-news/"}>neste link</a>.
        </p>
        <p className="authors">
          Made by: <br />
          Renato Falcão <br />
          Diogo Duarte <br />
          Jorás Custodio <br />
          Matheus Ribeiro <br />
        </p>
    </div>
  );
}