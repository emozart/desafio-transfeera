## Descrição
Esse projeto é parte do processo seletivo para empresa Transfeera.

## Instalação
Após clonar o repositório basta executar o comando 'npm install' na mesma pasta 
do projeto.
```bash
$ npm install
```
O projeto utiliza um banco de dados postgres e disponibiliza um arquivo 
docker-compose.yml com a configuração para um container docker com uma imagem
do postgres configurada para a aplicação.

Você deverá ter o docker instalado no seu computador para executar os comandos
abaixo na pasta do projeto.
```bash
$ docker compose up -d
```

Para verificar se o container está rodando execute o comando abaixo.
```bash
$ docker ps
```

Será apresentada uma lista com os containers que estiverem ativos.
```bash
CONTAINER ID   IMAGE      COMMAND                  CREATED      STATUS      PORTS                                       NAMES
dd6e495681e5   postgres   "docker-entrypoint.s…"   4 days ago   Up 2 days   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgres
```

## Rodando a aplicação
Execute o comando abaixo para rodar a aplicação.
```bash
$ npm run start:dev
```

## Testes
Execute o comando abaixo para executar os testes unitários da aplicação.
```bash
$ npm run test
```

Execute o comando abaixo para executar os testes e2e da aplicação.
```bash
$ npm run test:e2e
```
Caso queira rodar os testes e2e mais de uma vez execute o comando de reset do
prima para limpar o bando e rodar o script de seed.
```bash
$ npx prisma migrate reset
```

## Contato

- Autor: Elton Mozart [LinkedIn profile](https://www.linkedin.com/in/eltonmozart/)

## License

Este projeto está sobre a [MIT licensed](LICENSE).
