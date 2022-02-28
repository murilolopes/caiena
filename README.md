# caiena

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Run your unit tests

```
yarn test:unit
```

# Sobre o teste

Projeto iniciado usando Vue CLI, com as seguintes configurações:

Vue 2.x, Vuex, Jest, Eslint + Prettier

Para evitar a instalação de mais pacotes optei por usar a fetch API no lugar de instalar o axios.

Fiz a chamada direta no endpoint para retornar os usuários do github para não instalar o pacote Octo
do Github essa escolha traz consigo um ponto negativo que é apesar de trazer o número todos de registro
só é listado são acessível os primeiros 1000.

Uso o SweetAlert2 para tratar o erro acima.
