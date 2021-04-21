# Proyecto integrador de conocimientos.

## Objetivo: Creación de Base de datos para Recursos Humanos
##### En desarrollo

------------


## ¿Cómo usar esta app?

Hay un archivo *info.txt* donde se encuentr la información necesaria para conectarse a una base de datos ficticia y para test.

Esa DB se encuentra alojada en la nube y los datos para conectarse **usuario y contraseña** se encuentran en ese archivo.

Como verá los datos son *variables de entorno*

#### ¿Cómo se da cuenta?

Por qué cada variable es como texto plano. Pero cada nombre representa a una variable dentro del código de la app.

Entonces en el código *si es que tenés curiosidad*  vas a ver que hay variables con el nombre de *process.env* un punto y un nombre. Esas son las variables de entorno.

Para ahorrar el test directamente crea un archivo en la carpeta raíz con este nombre **.env**

:fire: NO PONER ej: miarchivo.env o cosas así SOLO **.env** :rage1:

la app detectará que es un archivo de entorno y usará sus variables

# IMPORTANTE
### Cosas necesarias para la instalación

1. NodeJS
2. NPM

### Pasos para correr la app

1. abrir la consola en la ubicación del archivo
2. ejecutar el comando **npm install**
3. Esperar...
4. Esperar un poco más...
5. si todo salió bien usted debería ejecutar en la consola **npm start** y el servidor estaría levantado :bowtie:

### Puede fallar :scream:

Muchas veces los servidores no se conectar a las DB por que el puerto no está habilitado, la app corre en puerto 3306, puerto por default de las bases de datos.

Si esto llegara a suceder debería configurar los datos de la nueva DB y para eso va a usar nuestro amado **.env** ¡No es tan difícil!

Las variables de entorno le indicaran que datos debe agregar, si dice DB_NAME agregue el nombre de la base de datos y así con todos los datos que le pide.

#### ¿y si sigue fallando?

Dentro del archivo connect.js dentro de la carpeta database se encuentran configuraciones. Dentro de este archivo encontrará que está comentada una conexión a una base de datos *sqlite* esto quiere decir que operará en memoria, al desconectarse del servidor la DB se destruirá y cuando vuelva a conectarse se creará una nueva SIN DATOS

## ¿Si no falla?

En la DB creada en la nube hay datos para que pueda ir testeando la DB. En caso de que se conecte a una Base de forma local: MYSQL, MariaDB, PostgreSQL, etc, hay un comando mágico que le permitirá crear datos masivos en pocos segundos

`npm run --initData`

Ese comando le creará datos en segundos :raised_hands:

