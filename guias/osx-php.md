---
layout: default
title: Entorno de desarrollo para PHP/Drupal en OSX
slug: osx-php
---

# Entorno de desarrollo para Drupal en OSX

##Instalación phpbrew
Para la instalación de PHP y la gestión de sus diferentes versiones utilizaremos PHPBrew.

###Dependencias phpbrew
Antes de instalar phpbrew debemos instalar las dependencias para los [usuarios de homebrew](https://github.com/phpbrew/phpbrew/wiki/Requirement). De esta documentación hay que prestar especial atención a:

````
brew install automake autoconf curl pcre re2c mhash libtool icu4c gettext jpeg libxml2 mcrypt gmp libevent
````

###instalación básica phpbrew
Seguiremos los pasos indicados en la documentación de [PHPBrew](http://phpbrew.github.io/phpbrew/) teniendo en cuenta las configuraciones específicas para homebrew. De esta documentación hay que prestar especial atención a:

####instalación
````
cd ~/
curl -L -O https://github.com/phpbrew/phpbrew/raw/master/phpbrew
chmod +x phpbrew
sudo mv phpbrew /usr/local/bin/phpbrew
````

####inicialización
````
$ phpbrew init
````

####configuración shell
Añadir esta línea al fichero .profile o .bashrc o .zshrc según el shell que usemos:

````
source ~/.phpbrew/bashrc
````

Si deseas visualizar en tu shell la versión de PHP que estás usando en cada momento, también puedes añadir esta línea al fichero .profile o .bashrc o .zshrc según el shell que usemos:

````
export PHPBREW_SET_PROMPT=1
````

####configuración del prefijo para las librerías
De nuevo configuramos para usuarios de homebrew:

````
$ phpbrew lookup-prefix homebrew
````

####versiones
Por último ya podremos instalar las versiones de PHP y de las librerías necesarias. El parámetro *install* nos permite realizar esto mediante *variantes*. La versión mínima a instalar de PHP es la 5.4.x. Además deberemos instalar las variantes *default* y *mysql*. Esto nos instalará un PHP con las librerías más comunes y la librería para acceder a mysql. Para instalación más detallada de otras variantes consultar la [documentación](http://phpbrew.github.io/phpbrew/).

````
$ phpbrew install 0.0.0 +default +mysql
````

Para obtener un listado de todas las versiones disponibles:

````
$ phpbrew known
````

*ejemplo para la versión 5.4.2*

````
$ phpbrew install 5.4.2 +default +mysql
````
Un poco de paciencia que esta instalación durará un rato.


##Instalación drush
[Drush](http://www.drush.org/en/master/) es la herramienta para utilizar drupal en modo consola. Nos ayudará en tareas como instalación de módulos de drupal, arrancar un sencillo servidor http para desarrollo, limpiar caché, etc. En esta [documentación](http://drushcommands.com/) se pueden consultar todos los comandos de drush.

Para instalarlo en homebrew seguiremos los pasos de la [documentación](https://www.drupal.org/node/954766) existente en la comunidad. De esta documentación hay que prestar especial atención a:


````
brew tap homebrew/dupes
brew tap homebrew/versions
brew tap homebrew/php
brew install drush
````

##Instalación drupal
Para este punto puede ser más cómodo hablar con el desarrollador del proyecto para que nos pueda facilitar los ficheros necesarios.

Clonar de github el repositorio correspondiente. Importar la base de datos en mysql y crear/copiar la carpeta de *files*.

La carpeta *files* está fuera del respositorio ya que contiene ficheros binarios que son siempre del ámbito del contenido del site (imágenes, documentos, temporales, etc.). Lo normal es que se encuentre en la ruta *sites/default/files*.

Parte de la configuración de drupal se encuentra  en el fichero *settings.php*, normalmente en la ruta *sites/default/settings.php*. Aquí por ejemplo se encuentran los parámetros de conexión a la base de datos. Este fichero también está fuera del repositorio. [Aquí](http://cgit.drupalcode.org/drupal/tree/sites/default/default.settings.php?h=7.x) puedes descargar un *settings.php* de ejemplo para drupal 7. En el propio repositorio del proyecto también debería estar este fichero de ejemplo. Acuérdate de renombrarlo de *default.settings.php* a *settings.php*.

Debemos modificar los parámetros de conexión a la base de datos con los que correspondan a nuestro entorno de desarrollo, y especialmente en OSX cambiar *host* modificando *localhost* por la IP local:

````
host='127.0.0.1'
````

##Día a día

Lo primero que tenemos que hacer siempre que queramos acceder a un drupal en local es levantar un pequeño servidor http que nos sirva el site. Esto lo haremos mediante el comando de drush [runserver](http://drushcommands.com/drush-6x/runserver/runserver).

Ejecutamos por consola este comando en la carpeta raíz del drupal que necesitemos. Si todo ha ido bien nos indica en qué URL y puerto está escuchando (por defecto lo hace en el 8888).

El comando en cuestión sería:

````
drush rs --server=builtin
````

En este caso tendríamos nuestro drupal en la url *http://127.0.0.1:8888*

####Pow

Si estamos usando pow podemos configurarlo para tener el dominio *mi-dominio.dev* apuntando al puerto 8888.

````
echo '8888' > ~/.pow/mi-dominio
````
