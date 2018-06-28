---
layout: default
title: Preparación de entorno de desarrollo en OSX
slug: osx-general
---

# Preparación de entorno de desarrollo en OSX Yosemite

## Backup

Antes de nada backup de lo siguiente: (si es que lo usas ;)

- `/etc/hosts`
- `~/.ssh/`
- `~/.deployrc`
- `~/.localrc`
- `~/.powconfig`
- `~/.tacoma`
- `/usr/local/bin/deploya`
- `/usr/local/bin/get_password_from_keyring`
- `/usr/local/bin/rawclone`

## Instalación limpia
<img src="http://krakenbyte.com/wp-content/uploads/2014/11/kraken-instalar-os-x-yosemite.png" width="150" height="150">

Descargar de la AppStore y cuando termine la descarga y se abra el instalador, cerrarlo.

### Creación del disco de arranque con línea de comandos

Para crear un usb de instalación, primero necesitamos fomatearlo, abre Utilidad de Discos selecciona el usb, en la pestaña de particiones, seleccionar 1 partición, usar formato HFS+ 'Mac OS Plus (con registro)' y haz click en el botón de abajo Opciones, seleccionar tabla de particiones GUID.

Poner como nombre de unidad Untitled para que funcione la siguiente linea o modificarla con el nombre de la unidad correspondiente.

````
sudo /Applications/Install\ OS\ X\ Yosemite.app/Contents/Resources/createinstallmedia --volume /Volumes/Untitled --applicationpath /Applications/Install\ OS\ X\ Yosemite.app --nointeraction
````

Cuando termine (**paciencia, le puede costar unos 20 minutos dependiendo de la velocidad del usb**), reiniciar y antes de que arranque mantener pulsado alt para iniciar desde el USB.

### Creación del disco de arranque con DiskMakerX

[DiskMakerX](http://diskmakerx.com/) es una utilidad para crear el disco de arranque para la instalación limpia de OSX a partir del instalador y sin tocar una línea de comandos ni preocuparse de formatos.

Una vez descargado, lo ejecutamos y nos pedirá información sobre dónde está el instalador y qué disco queremos usar para crear el disco de arranque.

Cuando termine, sólo hay que reiniciar y mantener pulsada la tecla alt para iniciar desde el USB.

### Instalación

Cuando termine de cargar el instalador desde el disco de arranque, entrar en utilidad de discos y formatear el hd en Mac OS Plus con registro, después seguir los pasos de instalación.

Cuando termine de instalar, recuperar lo que hayamos guardado en el backup y entrar en la AppStore para instalar las actualizaciones correspondientes.

## Homebrew
Lo primero de todo instalar [homebrew](http://brew.sh) para actualizar la versión de git, openssh y zsh.

````
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install git zsh homebrew/dupes/openssh
````

En caso de que queramos instalar alguna versión de un programa anterior a la de la última fórmula (por ejemplo MySQL 5.6 en lugar de la 5.7), puede ser util este tap:

````
brew tap homebrew/versions
````

## Caskroom
Recientemente he descubierto [caskroom.io](http://caskroom.io) para instalar todas las aplicaciones que no están en la App Store con homebrew (siempre me ha dado mucha pereza ir web a web descargando instaladores).

Actualmente Caskroom se ha integrado en el desarrollo de Homebrew, por lo que no es necesario instalarlo como un paquete a parte, está disponible directamente en Homebrew.

Me chifla poder instalar varias aplicaciones en un comando:

````
brew cask install skype dropbox rowanj-gitx keepassx iterm2
````

## Dotfiles
Uso zsh por defecto ``chsh -s /bin/zsh`` con [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh/) y un theme personalizado con un par de plugins própios. Pegarle un vistazo a la carpeta plugins para conocer un poco de la magia.

A parte de eso, los dotfiles llevan un instalador y generador de .gitconfig, .gitignore, .irbrc y .gemrc

```
git clone https://github.com/vortizhe/dotfiles.git ~/.dotfiles
cd ~/.dotfiles
git submodule update --init
rake install
```
**NOTA:** Si vas a usar RBENV en vez de RVM, clona el repositorio *https://github.com/rsierra/dotfiles.git*, es el mismo, pero con los cambios necesarios para RBENV.

## POW

Instalar [Pow](http://pow.cx) para lanzar de forma cómoda todos los proyectos rack.

````
curl get.pow.cx | sh
````

Tenemos que crear un config.ru para proyectos viejos que no lo llevan con el siguiente contenido.

````
require File.dirname(__FILE__) + '/config/environment'
run ActionController::Dispatcher.new
````

Como complementos a pow uso Anvil e instalo powder en todos los gemset globales.

````
gem install powder
brew cask install anvil
````

## Bases de datos y utilidades

### Mysql

````
brew install mysql
ln -sfv /usr/local/opt/mysql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
````
Usuario por defecto ``root`` sin password.

Se recomenda conectar por socket para evitar la capa TCP y agilizar las conexiones poniendo en el database.yml de los proyectos ``socket: /tmp/mysql.sock``

Uso [Sequel Pro](http://www.sequelpro.com) para acceder comodamente al servidor local (incluso a alguno de producción ;) a pegar un vistazo rápido a algún registro, probar sqls o exportar/importar db.

``brew cask install sequel-pro``

### Postgresql

````
brew install postgresql
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
````
Usuario por defecto tu username sin password

A raiz de usar caskroom he encontrado [PSequel](http://www.psequel.com) una suerte de Sequel Pro para postgres. Está programado en swift y por ahora está muy verde, pero no está de más tenerlo en el radar.

``brew cask install psequel``

## Editores

Sin entrar en eternas guerras de editores, solemos usar sublime text, atom y emacs.

### Sublime text 3

Instalar [Sublime Text 3](http://www.sublimetext.com/3).

Para sincronizar plugins y configuración entre varios equipos con Dropbox:

````
mkdir ~/Dropbox/sublime
cd ~/Library/Application\ Support/Sublime\ Text\ 3/
mv Installed\ Packages ~/Dropbox/sublime
ln -s ~/Dropbox/sublime/Installed\ Packages
mv Packages ~/Dropbox/sublime
ln -s ~/Dropbox/sublime/Packages
````

**Plugins que considero necesarios:**

- [BracketHighlighter](https://github.com/facelessuser/BracketHighlighter)
- [GitGutter](https://github.com/jisaacks/GitGutter)
- [SublimeText Git](https://github.com/kemayo/sublime-text-git)
- [SublimeERB](https://github.com/eddorre/SublimeERB)

**Para frontenders:**

- [Sublime-JSHint](https://github.com/victorporof/Sublime-JSHint) ¡Obligatorio!
- [Sass](https://github.com/nathos/sass-textmate-bundle)
- [jQuery](https://github.com/SublimeText/jQuery)
- [jQuery Snippets](https://github.com/aaronpowell/sublime-jquery-snippets)

Y ya que estamos mi archivo de preferencias luce tal que así:

````js
{
	"always_prompt_for_file_reload": false,
	"auto_complete": false,
	"bold_folder_labels": false,
	"caret_style": "phase",
	"close_windows_when_empty": true,
	"color_scheme": "Packages/User/Expresso Libre.tmTheme",
	"create_window_at_startup": false,
	"ensure_newline_at_eof_on_save": true,
	"folder_exclude_patterns":
	[
		".svn",
		".git",
		".hg",
		".sass-cache",
		".bundle",
		"tmp",
		".*-cache",
		".tags",
		".tags_sorted_by_file",
		".gemtags"
	],
	"font_face": "PragmataPro",
	"font_options":
	[
		"subpixel_antialias"
	],
	"font_size": 13.0,
	"gpu_window_buffer": true,
	"highlight_line": true,
	"highlight_modified_tabs": true,
	"hot_exit": false,
	"ignored_packages":
	[
		"Vintage"
	],
	"indent_guide_options":
	[
		"draw_active"
	],
	"margin": 0,
	"remember_open_files": false,
	"save_on_focus_lost": true,
	"scroll_past_end": true,
	"scroll_speed": 3.0,
	"tab_size": 2,
	"theme": "Nexus.sublime-theme",
	"translate_tabs_to_spaces": true,
	"trim_trailing_white_space_on_save": true,
	"use_simple_full_screen": true,
	"word_wrap": true
}
````

### Atom.io

Puedes instalarlo descargando el instalador desde su web [atom.io](https://atom.io/) o con homebrew:

```
brew cask install atom
```

Al igual que en Sublime Text podemos compartir entre distintos equipos la configuración y plugins con Dropbox:

```
mkdir ~/Dropbox/atom
mv ~/.atom ~/Dropbox/atom
ln -s ~/Dropbox/atom ~/.atom
```

Atom trae un montón de plugins instalados por defecto y hay algunos poco o nada necesarios que pueden ralentizar la carga del editor, así que deshabilitamos lo siguiente.

- welcome
- metrics
- package-generator
- Y en general todos los lenguajes que no vayas a usar, objective-c, toml, perl, etc.

**Plugins que considero necesarios:**

- [highlight-selected](https://atom.io/packages/highlight-selected)
- [linter](https://atom.io/packages/linter)
- [linter-jshint](https://atom.io/packages/linter-jshint)
- [erb-snippets](https://atom.io/packages/erb-snippets)
- [project-manager](https://atom.io/packages/project-manager)
- [rails-partials](https://atom.io/packages/rails-partials)
- [todo-show](https://atom.io/packages/todo-show)

**Para frontenders:**

- [html-entities](https://atom.io/packages/html-entities)
- [color-picker](https://atom.io/packages/color-picker)

**Git**

Si quieres usar atom como editor de git, recuerda cambiar to .gitconfig `editor = atom -w --safe`
Dos plugins muy interesantes para el workflow con git:

- [languaje-diff](https://atom.io/packages/language-diff) Para los mensajes de commit y merges.
- [merge-conflicts](https://atom.io/packages/merge-conflicts)

También tengo que recomendar el theme [ristretto-syntax](https://atom.io/themes/ristretto-syntax) que es de la casa :D.

## Utilidades
Más abajo están todas desglosadas, pero si no te quieres romper mucho la cabeza mirando las utilidades, aqui tienes los comandos para instalarlas todas rápidamente:

**DEV UTILS**

```
brew cask install iterm2 rowanj-gitx sequel-pro psequel atom dash virtualbox
brew install heroku-toolbelt s3cmd terminal-notifier wget
gem install bundler tacoma lunchy powder mailcatcher
```

**FRONT UTILS**

```
brew cask install imageoptim
brew install png2ico node
npm install -g gulp grunt
```

**WORK UTILS**

```
brew cask install dropbox google-drive google-chrome firefox slack skype keepassx the-unarchiver cyberduck xtrafinder
```

*Nota:* si usas 1Password, hay que instalar Google Chrome sin usar caskroom. En caso contrario 1Password no puede verificar la firma del ejecutable y no podrás usar la integración.

**PERSONAL UTILS**

```
brew cask install spotify radiant-player macdown spectacle evernote 1password alfred
```

### Utilidades varias

[iTerm2](http://www.iterm2.com/) Sin duda la mejor terminal para OSX. Un must en toda regla.

``brew cask install iterm2``

[Heroku Toolbelt](https://toolbelt.heroku.com)

``brew install heroku-toolbelt``

[Tacoma](https://github.com/pantulis/tacoma)* gestión de multiples credenciales AWS de nuestro querido CTO Lupión. Totalmente necesario si llevas mas de un proyecto alojado en Amazon o que tire de S3.

*_Recuerda seguir los pasos de configuración de Tacoma indicados en el README del repo._

``gem install tacoma``

[Lunchy](https://github.com/eddiezane/lunchy) para gestionar launchctl y lanzar/parar/reiniciar servicios de forma cómoda y con autocompletado. Lo instalo en los gemsets globales de cada versión de ruby.

``gem install lunchy``

[Powder](https://github.com/Rodreegez/powder) Herramienta para gestionar Pow. Idem que el anterior, en todos los gemsets globales.

``gem install powder``

[s3cmd](http://s3tools.org/s3cmd) Utilidad de consola para gestionar AWS S3

``brew install s3cmd``

[mailcatcher](http://mailcatcher.me/) Servidor SMTP local para capturar los mails de una aplicación rails.

``gem install mailcatcher``

[terminal-notifier](https://github.com/alloy/terminal-notifier) Necesario para las notificaciones de mi script de deploys.

``brew install terminal-notifier``

[Gitx](http://rowanj.github.io/gitx/) El fork de Gitx más funcional que conozco y que parece que tiene mejor rendimiento.

``brew cask install rowanj-gitx``

[Cyberduck](https://cyberduck.io) Cliente de ftp muy cómodo para montar unidades de s3 o de máquinas remotas por sftp. Ojo, hay una versión de pago en la App Store, pero no hay ninguna diferencia con esta en cuanto a funcionalidad.

``brew cask install cyberduck``

[VirtualBox](http://www.virtualbox.org) Poco que decir :)

``brew cask install virtualbox``

[ievms](http://xdissent.github.io/ievms/) super cómodo para automatizar la descarga de las distintas imágenes de IE para VirtualBox.

``curl -s https://raw.githubusercontent.com/xdissent/ievms/master/ievms.sh | env IEVMS_VERSIONS="7 9" bash``

Ojo por defecto las instala en ``~/.ievms``, se puede cambiar añadiendo el parámetro ``INSTALL_PATH="/Path/to/.ievms"`` al curl.

Al terminar la instalación de las VM, hago una limpieza de todo lo que se ha descargado el script salvo las imágenes vdmk.

``find /Path/to/.ievms -type f ! -name "*.vmdk" -exec rm {} \;``

[GenyMotion](https://www.genymotion.com/#!/) Instala VM de Androids varios a través de VirtualBox. Requiere crearse una cuenta en su web y es algo incómodo el registro, pero es de lejos la mejor herramienta que he probado para testear webs en Android. ¡Gracias Carlos!

``brew cask install genymotion``

[XtraFinder](http://www.trankynam.com/xtrafinder/) Añade funcionalidades a finder como "cortar y pegar" o dos pestañas simultáneas.

``brew cask install xtrafinder``

[Dash](http://kapeli.com/dash) Acceso offline a documentaciones. Añádelo a sublime, atom o alfred para consultar rápidamente documentación desde el código.

``brew cask install dash``

[Spectacle](http://spectacleapp.com/) Accesos de teclado apra colocar ventanas rápidamente. Senfillo y gratuito.

``brew cask install spectacle``



### Utilidades para los frontenders

[png2ico](http://www.winterdrache.de/freeware/png2ico/) Muy util para generar favicon

``brew install png2ico``

[ImageOptim](http://imageoptim.com/) El nombre lo dice todo

``brew cask install imageoptim``


[node](node.js) con gulp y grunt instalados globalmente

````
 brew install node
 npm install -g gulp
 npm install -g grunt
 ````

[Symbols for Sketch](https://github.com/cognitom/symbols-for-sketch.git) Recientemente lo he usado en Genesis para generar webfonts desde svg en Sketch. Muy comodo y permite incluirlo en el repo para que cualquiera pueda seguir manteniendo la fuente.

````
brew install wget
wget http://sketchtool.bohemiancoding.com/sketchtool-latest.zip
unzip sketchtool-latest.zip
cd sketchtool-latest
./install.sh
cd ~/code
git clone git@github.com:cognitom/symbols-for-sketch.git
cd /symbols-for-sketch
npm install
````

[middleman-base](https://github.com/vortizhe/middleman-base) Template para iniciar proyectos nuevos con middleman.

``git clone https://github.com/vortizhe/middleman-base.git ~/.middleman/middleman-base``

Para iniciar un proyecto con middleman usando la plantilla:
``middleman init project_name --template=middleman-base``


## Aplicaciones de la App Store
Otras app que suelo instalar en todos los equipos (algunas de pago).

- 1password (brew cask install 1password)
- Dash (brew cask install dash)
- Divvy (brew cask install dash divvy)
- Evernote (brew cask install evernote)
- Slack (brew cask install slack)
- Sketch 3
- Telegram (brew cask install telegram)
- The unarchiver (brew cask install the-unarchiver)
- Twitter
- Wunderlist
