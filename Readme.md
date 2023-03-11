# CRUD Node-Typescript-Sequelize
Este repositorio se irá actualizando hasta crear un CRUD con para trabajar con Node-Typescript-Sequelize en el que se incorporaran distintas validaciones de usuario con JWT asi como los distintos middlewares utilizados en el repositorio rest-server-esqueleto pero en este caso utilizando bases de datos relacionales SQL y typescript.

## Inicialización del proyecto
Es necesario ejecutar `npm install` para reconstruir los modulos de Node una vez clonado el proyecto, así como crear el archivo .env en el directorio raíz, con el mismo formato que tiene el archivo .env-example

## Peticiones y formato
Las distintas peticiones y formato para realizar las mismas se pueden consultar en:
[Node-TS-SQL](https://documenter.getpostman.com/view/16345932/2s935hQ6sK)

## Pasos para la creación de un proyecto en Typescript y Node
Este documento le he creado a modo de cheatsheet para realizar distintos proyectos con estas tecnologías, de modo que al iniciar otro proyecto nuevo que no sea un clon de este resulte fácil hacerle y no tener que revisar las documentaciones a corto plazo.

### Inicialización del proyecto de node
`npm init -y`
Nos creara el archivo package.json para poder realizar las configuraciones del proyecto Node

### Inicialización del proyecto Typescript
Instalación de Typescript de forma global si aun no lo tenemos instalado
`npm i typescript --save-dev`

Inicialización del proyecto
`tsc --init`
Nos creara el archivo tsconfig.json para realizar las configuraciones del Typescript
Se realizan las siguientes configuraciones
    "target": "ES6",
    "outDir": "./dist",
    "sourceMap": true,
    "moduleResolution": "node",
    "noImplicitAny": true,

### Instalación de la dependencia tslint
Instalamos la dependencia de desarrollo tslint
`npm i tslint --save-dev`

Creamos el archivo de configuración tslint
`./node_modules/.bin/tslint --init`

Editamos el archivo de configuración tslint.json para añadir que no muestre errores al utilizar la consola 
```
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {
        "no-console":false
    },
    "rulesDirectory": []
}
```

### Listo para comenzar
Una vez realizados los pasos anteriores ya podremos crear nuestros archivos .ts llamar a `tsc` y que nos transpile el archivo a JS con las caracteristicas indicadas en la carpeta **./dist**

### Paquetes necesarios
`npm i express cors dotenv`
`npm install --save sequelize`
Para sequelize además debemos instalar el driver especifico al servidor de base de datos que utilicemos
```
# One of the following:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database
```
Tenemos toda la documentación en 
[Sequelize](https://sequelize.org/docs/v6/getting-started/)

Al realizar por primera vez una importación de un modulo, por ejemplo express nos indicará error, informándonos que necesita la definición de tipos del paquete
`npm i --save-dev @types/express`
`npm i --save-dev @types/cors`

### Actualización constante de TSC
Podemos correr en dos terminales distintas.
Para que typescript transpile constantemente los cambios a JS
`tsc --watch`

En otra terminal para que se reinicie el servicio de node al realizar cambios
`nodemon dist/app.js`

Se podría realizar de forma conjunta pero así tendremos mas fácil el consultar los errores y logs
