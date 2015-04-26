---
layout: default
title: Entorno de desarrollo para PHP/Drupal en OSX
slug: osx-php
---

# Entorno de desarrollo para Drupal en OSX

##Instalación phpbrew
Para la gestión a la hora de utilizar diferentes versiones de PHP utilizaremos PHPBrew.

###Dependencias phpbrew
Antes de instalar phpbrew debemos instalar las dependencias para los [usuarios de homebrew](https://github.com/phpbrew/phpbrew/wiki/Requirement). A continuación pongo exactamente el extracto utilizado.

````
brew install automake autoconf curl pcre re2c mhash libtool icu4c gettext jpeg libxml2 mcrypt gmp libevent
brew link icu4c
````

###phpbrew básico
Básicamente es seguir los pasos indicados en la documentación de [PHPBrew](http://phpbrew.github.io/phpbrew/) teniendo en cuenta las configuraciones específicas para homebrew. A continuación pongo exactamente el extracto utilizado.

````
cd ~/
curl -L -O https://github.com/phpbrew/phpbrew/raw/master/phpbrew
chmod +x phpbrew
sudo mv phpbrew /usr/local/bin/phpbrew
````

````
$ phpbrew init
````

Añadir esta línea al fichero .profile o .bashrc o .zshrc:

````
$ source ~/.phpbrew/bashrc
````

Si deseas sacar la versión de PHP que estás usando en cada momeneto también puedes añadir esta línea al fichero .profile o .bashrc o .zshrc:

````
export PHPBREW_SET_PROMPT=1
````

````
$ phpbrew lookup-prefix homebrew
````

Instalar la versión deseada más la variante *mysql*:

````
$ phpbrew install 0.0.0 +default +mysql
````

##Instalación drush
[Drush](http://www.drush.org/en/master/) es la heramienta para utilizar drupal en modo consola.

Para instalarlo en homebrew seguiremos los pasos de la [documentación](https://www.drupal.org/node/954766). A continuación pongo exactamente el extracto utilizado.


````
brew tap homebrew/dupes
brew tap homebrew/versions
brew tap homebrew/php
brew install drush
````

##Instalación drupal
Clonar de github el repositorio necesario. Importar la base de datos en mysql. Copiar la carpeta de files.

En el fichero settings.php modificar los parámetros de conexión a la base de datos, cambiar *host* por la dirección IP local:

````
host='127.0.0.1'
````

##Ejecución

Ejecutamos este comando drush dentro de la carpeta del drupal que queramos ejecutar. Nos indica en qué URL y puerto está escuchando *(ejemplo: http://127.0.0.1:8888)*.

````
drush rs --server=builtin
````
