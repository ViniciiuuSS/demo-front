# Demo Front

Front em Angular do cadastro de clientes.

## O que precisa ter na máquina

- Node.js 20 ou superior
- PostgreSQL instalado e rodando
- O back-end do projeto rodando na porta 8080

## Como rodar

```bash
npm install
npm start
```

Depois abre http://localhost:4200 no navegador.

## Banco de dados

O front não fala direto com o banco, quem acessa é a API, mas pra tela funcionar o PostgreSQL precisa estar no ar:

1. Sobe o PostgreSQL
2. Cria o banco do projeto (pelo pgAdmin ou `createdb demo`)
3. Sobe o back-end na porta 8080
4. o Back-End criará automaticamente a tabela, no arquivo application.properties tem o parametro spring.jpa.hibernate.ddl-auto precisa estar como create primeiro depois muda para update para não perder os dados


Se o back não estiver rodando, a tela abre mas a tabela fica vazia.

## Comandos úteis

- `npm start` — sobe o front em modo dev
- `npm run build` — gera o build de produção
- `npm test` — roda os testes
