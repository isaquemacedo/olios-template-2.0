# Bradesco Boilerplate

> ...

## Setup

Instale o plugin [editorconfig](http://editorconfig.org/) no seu editor.

Caso não possua o [bower](http://bower.io/) e o [gulp](http://gulpjs.com/) definidos globalmente, execute os comandos:

```sh
$ npm install -g bower
$ npm install -g gulp
```

No diretório do projeto, execute os comandos:

```sh
$ npm install
$ bower install
```

Lista das principais tarefas:

1. `$ gulp serve`: inicia servidor local para desenvolvimento;
2. `$ gulp clean`: limpa o diretório /build;
3. `$ gulp build`: cria o diretório /build;
4. `$ gulp serve:build`: inicia servidor local no diretório /build;

**Atenção com as dependências e use o [bower](http://bower.io/)!**

## Misc

Gulp tasks: `$ gulp --tasks`.  
SSI syntax: `<!--#include file="inc/header.shtm" -->`.

## TODO

* Tarefa para [gulp-uncss](https://github.com/ben-eb/gulp-uncss/);
* Tarefa 'fonts' só buildar fontes usadas;
* ~~Adicionar opção para 'minificar' arquivos no 'build'~~;