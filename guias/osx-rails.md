---
layout: default
title: Entorno de desarrollo para Rails en OSX
slug: osx-rails
---

# Entorno de desarrollo para Ruby on Rails en OSX

Lo primero de todo es tener un gestor para las distintas versiones de ruby con las que solemos trabajar, ree, 1.9.3, 2.1.5 y 2.2.2.

La opción mas generalizada es usar RVM, pero si no tienes que mantener proyectos muy viejos que no usan bundler, RBENV se presenta como una buena alternativa alegando ser más ligero y menos intrusivo.

**¡OJO CUIDADO!** RVM y RBENV no pueden estar instalados simultáneamente.

##RVM
```
brew install gpg
gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable --auto-dotfiles --ruby
rvm use ruby-2.2.0@global --default
```

Normalmente uso .rvmrc en cada proyecto, en proyectos legacy uso un gemset por cada proyecto, a partir de rails3 y ruby-1.9.3 uso el gemset global.

RVM se queja cada vez que entras en una carpeta con .rvmrc, para evitar los warning:

````
rvm rvmrc warning ignore all.rvmrcs
````

##RBENV (alternativa a RVM)

Las malas lenguas dicen que puede dar problemas con proyectos muy viejos.

Resumiendo un poco, es más ligero que el RVM. [Aqui las principales diferencias](https://github.com/sstephenson/rbenv/wiki/Why-rbenv%3F)

**NOTA:** Revisar también el apartado de dotfiles si se va a usar RBENV.

Instalación:

```
brew install rbenv ruby-build rbenv-default-gems
```
Brew instala rbenv en su propio directorio y algunas cosas pueden tener problemas. Con un enlace lo solucionamos.

```
ln -s $RBENV_ROOT ~/.rbenv
```

Con el plugin rbenv-default-gem podremos especificar las gemas a instalar por defecto con cada ruby en el fichero ~/.rbenv/default-gems, por ejemplo las que solemos usar independiente mente de los proyectos:

```
bundler
tacoma
lunchy
powder
mailcatcher
```

Si vienes de RVM puede parecer raro que no tiene gemsets y deja que las gemas se gestionen con bundler directamente. Yo prefiero vendorizar las gemas en cada proyecto creando el fichero **~/.bundle/config**:

```
---
BUNDLE_PATH: ".bundle"
```

Con esto, ***bundle install*** instalará las gemas dentro del propio proyecto en ***.bundle/***, teniéndolas más a mano si se necesitan consultar. Borrar ese directorio, sería como limpiar el gemset de RMV.

**NOTA:** Sería recomendable añadir este directorio al git ignore si no está ya.

## Problemas típicos con gemas
Siempre hay alguna gema un poco puñetera sobre todo en proyectos viejos, estás son las que me han dado problemas hasta ahora.

**libxml-ruby** en versiones de la gema anteriores a la 2.4.0 no soporta la versión de libxml2 de maveriks y yosemite, hay que instalar una versión anterior con brew.

````
cd /usr/local/
git checkout 8939a91 Library/Formula/libxml2.rb
brew install libxml2
brew link libxml2 --force
````

**Nokogiri** aun en las últimas versiones llora con libxml2, se soluciona facilmente con bundle config

````
bundle config build.nokogiri --use-system-libraries
````

**rmagick** suele fallar por la versión de imagemagick, sirve cualquier versión, actualmente a mi me funcina con la 6.9.0, solo hay que hacer un par de enlaces simbólicos.

````
brew install imagemagick
cd "`Magick-config --prefix`"/lib
ln -s libMagick++-Q16.dylib   libMagick++.dylib
ln -s libMagickCore-Q16.dylib libMagickCore.dylib
ln -s libMagickWand-Q16.dylib libMagickWand.dylib
````

**libv8** dependiendo de la versión tiene problemas para compilar, se recomienda actualizar, si no es una opción, nuevamente hay que tirar de homebrew.

````
brew install v8
bundle config build.libv8 --with-system-v8
````
