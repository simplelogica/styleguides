---
layout: default
title: Drupal7
slug: drupal7
---

# Drupal 7

Esta guía pretende ser una ayuda para construir los proyectos en drupal 7.


## Estructura directorios

Lo ideal es que todo el proyecto esté bajo un entorno de desarrollo de ruby, rvm o similar. [Más información](https://tickets.the-cocktail.com/projects/php-room/wiki/Instalaci%C3%B3n_capistrano_y_dem%C3%A1s_gemas).

La estructura a primer nivel sería:

````
/config -> configuración de despliegue para capistrano
/drupal -> aplicación drupal
/shared -> carpetas y archivos compartidos
````

La estructura de drupal sería:

````
sites/all
  libraries     -> librerías de terceros
  modules       
    contrib     -> contribuidos por la Comunidad
    custom      -> específicos del proyecto
    devel       -> en desarrollo por la Comunidad
    features    -> configuraciones
    patched     -> contribuidos pero parcheados, (cada módulo es necesario que contenga también el fichero de patch)
  themes
    contrib     -> contribuidos por la Comunidad
    custom      -> específico del proyecto
sites/default
  files
````


## Settings.php

Fichero con algunas configuraciones locales a cada proyecto. Este fichero nunca estará en el repositorio con datos específicos. Pero sí estará como plantilla, el mejor sitio para que esté como plantilla es donde están las plantillas de capistrano para el despliegue, /config/templates/settings.php.erb.


## Caché

Siempre que el proyecto lo permita se sustituirá el almacenamiento de caché en la propia base de datos del proyecto por algún otro tipo de mecanismo de almacenamiento de caché, como [memcache](https://www.drupal.org/project/memcache) o [redis](https://www.drupal.org/project/redis).

Especial precaución con las cachés de formularios, según las recomendaciones debe ser persistente.

En el caso de memcache la configuración en el settings.php sería la siguiente:

```
/**
 * Memcache:
 *
 * From README.txt
 *
 * 7. Edit settings.php to make memcache the default cache class, for example:
 *     $conf['cache_backends'][] = 'sites/all/modules/memcache/memcache.inc';
 *     $conf['cache_default_class'] = 'MemCacheDrupal';
 *   The cache_backends path needs to be adjusted based on where you installed
 *   the module.
 * 8. Make sure the following line also exists, to ensure that the special
 *    cache_form bin is assigned to non-volatile storage:
 *      $conf['cache_class_cache_form'] = 'DrupalDatabaseCache';
 * 9. Optionally also add the following two lines to tell Drupal not to bootstrap
 *    the database when serving cached pages to anonymous visitors:
 *      $conf['page_cache_without_database'] = TRUE;
 *      $conf['page_cache_invoke_hooks'] = FALSE;
 *    If setting page_cache_without_database to TRUE, you also have to set
 *    page_cache_invoke_hooks to FALSE or you'll see an error like "Fatal error:
 *    Call to undefined function module_list()".
 *
 */
$conf['cache_backends'][] = 'sites/all/modules/contrib/memcache/memcache.inc';
$conf['cache_default_class'] = 'MemCacheDrupal';

// The 'cache_form' bin must be assigned to non-volatile storage.
$conf['cache_class_cache_form'] = 'DrupalDatabaseCache';
$conf['memcache_key_prefix'] = 'wadus_unique_key';

// Don't bootstrap the database when serving pages from the cache.
$conf['page_cache_without_database'] = TRUE;
$conf['page_cache_invoke_hooks'] = FALSE;

$conf['memcache_servers'] = array('localhost:11211' => 'default');
$conf['memcache_bins'] = array('cache' => 'default');
```


## Arquitectura

Como norma general se intentarán montar las páginas bien desde módulos custom o bien desde context donde se cargan blocks creados a través de módulos. Nos apoyaremos en el módulo *empty_page* (para crear la URLs necesarias) si la página sólo está compuesta de blocks.

El módulo views sólo deberá usarse en el CMS, se debe evitar el uso de views-page y views-block en el resto del site.

## Módulos

### Contribuidos

#### Desinstalar

Estos son los módulos que debemos desactivar y desinstalar.

Módulo  | Descripción
------------- | -------------
[overlay](https://www.drupal.org/documentation/modules/overlay) | layer para las páginas de administración
[dblog](https://www.drupal.org/documentation/modules/dblog) | grabación de los logs en base de datos


#### Instalar

Estos son los módulos más recomendados en la mayoría de las instalaciones.

Core  | Descripción
------------- | -------------
[jquery update](https://www.drupal.org/project/jquery_update) | actualizaciones del jQuery del core
[ctools](https://www.drupal.org/project/ctools) | navaja suiza
[entity](https://www.drupal.org/project/entity) | mejora el entity API
[libraries](https://www.drupal.org/project/libraries) | integración con librerías externas


Estructura  | Descripción
------------- | -------------
[context](https://www.drupal.org/project/context) | composición de páginas
[context error](https://www.drupal.org/project/context_error) | composición de páginas
[delta](https://www.drupal.org/project/delta) | configuraciones de context para el theme
[empty page](https://www.drupal.org/project/empty_page) | crear urls con páginas vacías (para luego usar con context y bloques)
[features](https://www.drupal.org/project/features) | gestión de configuraciones
[features extra](https://www.drupal.org/project/features_extra) | gestión de configuraciones
[rules](https://www.drupal.org/project/rules) | flujos de trabajo: acciones condicionales basadas en eventos
[strongarm](https://www.drupal.org/project/strongarm) | gestión de variables
[xautoload](https://www.drupal.org/project/xautoload) | cargador perezoso de clases


Contenido  | Descripción
------------- | -------------
[date](https://www.drupal.org/project/date) | campo para fechas
[imce](https://www.drupal.org/project/imce) | para subir imágenes y ficheros
[imce wysiwyg](https://www.drupal.org/project/imce_wysiwyg) | puente entre imce y wysiwyg
[link](https://www.drupal.org/project/link) | campo para enlaces
[wysiwyg](https://www.drupal.org/project/wysiwyg) | editores


Seo  | Descripción
------------- | -------------
[global redirect](https://www.drupal.org/project/globalredirect) | muchas funcionalidades para redirects
[hreflang](https://www.drupal.org/project/hreflang) | implementa el tag *link rel="alternate" hreflang="x"*
[metatag](https://www.drupal.org/project/metatag) | etiquetas meta tags
[pathauto](https://www.drupal.org/project/pathauto) | alias para urls/paths
[simplemap](https://github.com/simplelogica/simplemap) | generador de sitemaps


Métricas  | Descripción
------------- | -------------
[google analytics](https://www.drupal.org/project/google_analytics) | tracking de GA


Desarrollo  | Descripción
------------- | -------------
[devel](https://www.drupal.org/project/devel) | 
[devel debug log](https://www.drupal.org/project/devel_debug_log) | 
[diff](https://www.drupal.org/project/diff) |
[masquerade](https://www.drupal.org/project/masquerade) | cambiar rapidamente entre usuarios

*Estos módulos sólo deberán estar activos en entornos de desarrollo*

Caché  | Descripción
------------- | -------------
[memcache](https://www.drupal.org/project/memcache) | 
[redis](https://www.drupal.org/project/redis) |


Devel  | Descripción
------------- | -------------
[watchdog file](https://www.drupal.org/sandbox/kpander/1986402) | almacenar los registros del watchdog en fichero


I+D  | Descripción
------------- | -------------
[bean](https://www.drupal.org/project/bean) | bloques
[boxes](https://www.drupal.org/project/boxes) | bloques


*Estos módulos son interesantes pero deberán estudiarse más a fondo*


### Custom

Para crear los módulos custom seguiremos las especificaciones definidas en [Drupal-8-style PSR-4](https://www.drupal.org/node/2156625). Para ello nos ayudaremos del módulo [xautoload](https://www.drupal.org/project/xautoload) para hacer una carga perezosa de las clases. Siempre que sea posible se utilizará programación orienda a objetos y programación funcional (`array_map`, `array_reduce`, etc.).

#### .info

En el *.info* hay que acordarse de añadir las dependencias de otros módulos:

```
dependencies[] = xautoload
dependencies[] = ...
```

#### .module

En el *.module* básicamente se implementarán los *hooks* necesarios en el módulo: `hook_block_info()`, `hook_block_view()`, `hook_menu()`, `hook_form_FORM_ID_alter()`, etc. Para el resto de código se usarán includes u otros ficheros de código.

#### templates

Si fuese necesario se puede crear una carpeta *templates* para tpls con marcado básico. Los tpls con marcado definitivo deberían estar dentro del *custom theme* correspondiente.

#### js 

Para javascript será la carpeta *js*. Estos js serán exclusivos del módulo.

#### css

Para las hojas de estilo la carpeta *css*. Estos css serán exclusivos del módulo.

#### src

El código principal del módulo estará en carpetas dentro de la carpeta *src*:

```
Block -> para las clases que implementen bloques
Form -> para las clases o hooks que implementen formularios
Helper -> para las clases que implementen ayudas
Page -> para las clases que implemente páginas
Query -> para las clases que implementen EntityFieldQuery
```

Para las clases que sean *helpers* se crearán las carpetas correspondientes dentro de la estructura anterior: 

```
Block/Helper -> para las clases que implementen ayudas exclusivamente en los bloques
```

## Formularios

Siempre que se pueda para generar formularios se utilizará el api existente para ello [FAPI](https://api.drupal.org/api/drupal/developer!topics!forms_api_reference.html/7).

Una buena guía sobre cómo construir formularios puede encontrarse [aquí](http://themery.com/dgd7/advanced-theming/forms/generated-markup).

Una de las cosas más laboriosas en los formularios es eliminar el marcado que drupal realiza sobre los fields, incluso la gestión de las clases para css. Para ello nos ayudaremos de los *hooks* necesarios (`theme_form()`, `theme_form_element()`, etc).

En algunas ocasiones incluso será más óptimo especificar directamente en los propios tpls los *#id* que drupal necesita antes que estar alterando y preprocesando esta información.

No olvidar al final de los tpls de los formularios renderizar el resto de fields que se pueden necesitar: 

```
<?= drupal_render_children($form) ?>
```

Como mínimo existen estas tres variables que son obligatorias renderizarlas para el correcto funcionamiento:

```
<?= drupal_render($form_build_id) ?>
<?= drupal_render($form_token) ?>  
<?= drupal_render($form_id ) ?>  
```

## Features

Se hará uso de features, junto con strongarm, para la gestión de configuraciones del site de manera que se puedan exportar configuraciones desde la base de datos a código fuente. De esta forma se pueden tener versionadas en el respositorio y se pueden desplegar junto con el resto de código de la aplicación.

La mejor forma de exportar las features es por estructura (base fields, fields, content type, context, image styles, taxonomies, etc.) más que por funcionalidad (blog, agenda, noticias, destacados, etc.).

Lo primero será generar, si fuese necesario, features comunes de las cuales dependan otras features. Por ejemplo, una feature común para todos los content types, esta feature contendrá configuración genérica que cualquier content type necesita, por lo cual el resto de features dependerán de ésta.


## Theme

### integración con html estáticos

Si hubiese intregración con htmls estáticos (middleman o similares), se deberán tener en cuenta estos puntos en el desarrollo de estos estáticos:

* Drupal tiene su propia versión de jQuery, si fuese posible habría que utilizar esta misma versión para no tener que definir dos versiones dentro de drupal.
* Nombrar los ficheros sass como `.scss`, evitar `css.scss` para que posteriormente pueda compilar en drupal sin problemas.
* Utilizar librerías de terceros lo más cuidadosamente posible, ya que luego todo ese código de alguna manera hay que replicarlo en drupal.

### .info y regiones

Aquí podremos definir los css y js genéricos que se utilizarán en todo el site. Así como las regiones para cada uno de los diferentes layouts del site. Como norma general es interesante definir exactamente el número de regiones que después se van a utilizar.

### template.php

Este es el sitio para definir *hooks* y *preprocess* genéricos de la parte de theming. Especialmente es donde se implementará el `hook_theme()` para ir definiendo todos los tpls que se utilizarán en el site.

### assets

Carpeta para almacenar los recursos de front: fonts, images, javascripts, stylesheets, etc.

### css

Carpeta para almacenar las hojas de estilo de drupal. Para compilar los sass se deberá usar la gema `sass` de ruby. 

Para levantar el watcher cuando se necesite y generar el css que utilizará drupal desde los sass, el comando sería:

```
sass --watch assets/stylesheets:css --sourcemap=none
```

En caso que fuese necesario implicar a compass en la compilación, el comando sería:

```
sass --compass --watch assets/stylesheets:css --sourcemap=none
```

### templates

Todos los ficheros de templates se estructurán bajo esta carpeta. La organización dependerá de cada proyecto, pero es importante que siga una lógica paralela a los módulos.

### temas para el CMS

Algunos theme interesantes para las pantallas del CMS serían:

[Tao](https://www.drupal.org/project/tao) & [Rubik](https://www.drupal.org/project/rubik)

[Adminimal](https://www.drupal.org/project/adminimal_theme)


## Logs

Siempre que el proyecto lo permita no se llegará a activar el módulo contrib *dblog*, ya que este módulo graba los logs de la aplicación en base de datos. Esto a la larga puede generar serios problemas de rendimiento.

En su lugar se utilizará el módulo sandbox [watchdog file](https://www.drupal.org/sandbox/kpander/1986402). Este módulo nos permite almacenar el log de la aplicación en un fichero, para luego poder ser rotado desde sistemas.

Un ejemplo de configuración para el rotado usando logrotate sería:

```
/var/www/farmacia-principal/shared/log/farmacia-app.log {
  daily
  su www-data www-data
  missingok
  rotate 7
  compress
  dateext
  dateformat -%Y-%m-%d
  nomail
}
```






