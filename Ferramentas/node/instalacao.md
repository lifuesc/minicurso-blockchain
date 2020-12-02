# Tutorial - Instalação NodeJs v14

1. [Instalação](#instalação)
   - [Linux (Ubuntu 20.04)](#linux)
   - [Windows 10](#windows-10)
   - [MacOs](#macos)
2. [Instalação ReactJs](https://github.com/lifuesc/minicurso-blockchain/tree/main/Ferramentas/reactjs)

## Instalação

### Linux

Instalando versão mais recente LTS do nodejs

```shellscript
$ cd ~

$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
​
$ sudo apt-get install nodejs -y
```

Verificando versão

```shellscript
$ node -v
# v14.15.1

$ npm -v
# 6.14.8
```

Caso sua versão do node venha inferior a v14, então rode o seguinte comando

```shellscript
$ sudo npm cache clean -f

$ sudo npm install -g n

$ sudo n stable

$ sudo n latest
```

### Windows 10

Em breve

### MacOs

Em breve
