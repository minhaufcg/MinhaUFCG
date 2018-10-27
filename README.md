MinhaUFCG
=========

Overview
--------

> WebApp destinado a melhorar o contato entre alunos e funcionários da Universidade Federal de Campina e a prefeitura universitária.

## MinhaUFCG
> Aplicação full stack, consistindo em uma RESTful API escrita em [Express.js](https://expressjs.com/pt-br/) consumida por um cliente [AngularJS](https://angularjs.org/) e juntamente com um banco de dados MongoDB e bibliotecas NodeJS.

## Build Status

Travis

[![Build Status](https://travis-ci.org/minhaufcg/MinhaUFCG.svg?branch=master)](https://travis-ci.org/minhaufcg/MinhaUFCG)

# Demo

Veja a aplicação [aqui](https://minhaufcg.herokuapp.com/)

## Executando a aplicação através do código fonte.

1. Garanta que vc tem
    
    ```NodeJS``` instalado - veja [aqui](https://nodejs.org/en/download/package-manager/) como instalar.

2. Clone esse repositório na sua maquina (branch padrão 'master')

3. Para baixar as dependencias
    ```
    npm install
    ```

4. Para executar a aplicação execute o seguinte comando na na pasta raiz do projeto.
    ```
    npm start
    ```

> NOTA: Para essa versão o time MinhaUFCG irá manter um controle refinado subre o banco de dados, dessa forma, a aplicação sempre irá se conectar ao nosso banco de dados caso uma implantação alternativa como a detalhada acima seja feita. 