---
layout: default
title: Drupal7
slug: drupal7
---

# Drupal 7

Esta guía pretende ser una ayuda para construir los proyectos en drupal 7, tanto a nivel de utilización de los módulos contribuidos como a nivel de desarrollo de los módulos custom.

## Estructura directorios

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
    dev         -> en desarrollo por la Comunidad
    features    -> configuraciones
    patched     -> contribuidos pero parcheados, (cada módulo es necesario que contenga también el fichero de patch)
  themes
    contrib     -> contribuidos por la Comunidad
    custom      -> específico del proyecto
sites/default
  files
````


## Settings.php

Fichero con algunas configuraciones locales a cada proyecto. Este fichero nunca estará en el repositorio con datos específicos. Pero sí estará como plantilla, el mejor sitio para que esté como plantilla es donde están las plantillas de capistrano para el despliegue,/config/templates/settings.php.erb

## Caché

Siempre que el proyecto lo permita se sustituirá el almacenamiento de caché en la propia base de datos del proyecto por algún otro tipo de mecanismo almacenamiento de caché, como [memcache](https://www.drupal.org/project/memcache) o [redis](https://www.drupal.org/project/redis).

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
$conf['memcache_key_prefix'] = 'ach_unique_key';

// Don't bootstrap the database when serving pages from the cache.
$conf['page_cache_without_database'] = TRUE;
$conf['page_cache_invoke_hooks'] = FALSE;

$conf['memcache_servers'] = array('localhost:11211' => 'default');
$conf['memcache_bins'] = array('cache' => 'default');
```

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

##### Core

Módulo  | Descripción
------------- | -------------
[jquery update](https://www.drupal.org/project/jquery_update) | actualizaciones del jQuery del core
[ctools](https://www.drupal.org/project/ctools) | navaja suiza
[entity](https://www.drupal.org/project/entity) | mejora el entity API
[libraries](https://www.drupal.org/project/libraries) | integración con librerías externas

##### Estructura

Módulo  | Descripción
------------- | -------------
[context](https://www.drupal.org/project/context) | composición de páginas
[context error](https://www.drupal.org/project/context_error) | composición de páginas
[delta](https://www.drupal.org/project/delta) | configuraciones para el theme
[empty page](https://www.drupal.org/project/empty_page) | crear urls con páginas vacías (para luego usar con context y bloques)
[features](https://www.drupal.org/project/features) | gestión de configuraciones
[features extra](https://www.drupal.org/project/features_extra) | gestión de configuraciones
[strongarm](https://www.drupal.org/project/strongarm) | gestión de variables
[xautoload](https://www.drupal.org/project/xautoload) | cargador perezoso de clases

##### Contenido

Módulo  | Descripción
------------- | -------------
[date](https://www.drupal.org/project/date) | campo para fechas
[imce](https://www.drupal.org/project/imce) | para subir imágenes y ficheros
[imce wysiwyg](https://www.drupal.org/project/imce_wysiwyg) | puente entre imce y wysiwyg
[link](https://www.drupal.org/project/link) | campo para enlaces
[wysiwyg](https://www.drupal.org/project/wysiwyg) | editores

##### SEO

Módulo  | Descripción
------------- | -------------
[global redirect](https://www.drupal.org/project/globalredirect) | muchas funcionalidades para redirects
[hreflang](https://www.drupal.org/project/hreflang) | implementa el tag *link rel="alternate" hreflang="x"*
[metatag](https://www.drupal.org/project/metatag) | etiquetas meta tags
[pathauto](https://www.drupal.org/project/pathauto) | alias para urls/paths
[simplemap](https://github.com/simplelogica/simplemap) | generador de sitemaps

##### Métricas

Módulo  | Descripción
------------- | -------------
[google analytics](https://www.drupal.org/project/google_analytics) | tracking de GA

##### Desarrollo

Estos módulo sólo deben estar activos en entornos de desarrollo

Módulo  | Descripción
------------- | -------------
[devel](https://www.drupal.org/project/devel) | 
[devel debug log](https://www.drupal.org/project/devel_debug_log) | 
[diff](https://www.drupal.org/project/diff) |
[masquerade](https://www.drupal.org/project/masquerade) | cambiar rapidamente entre usuarios

##### Caché

Módulo  | Descripción
------------- | -------------
[memcache](https://www.drupal.org/project/memcache) | 
[redis](https://www.drupal.org/project/redis) |

### Devel

Módulo  | Descripción
------------- | -------------
[watchdog file](https://www.drupal.org/sandbox/kpander/1986402) | almacenar los registros del watchdog en fichero

### I+D

Módulo  | Descripción
------------- | -------------
[bean](https://www.drupal.org/project/bean) | bloques
[boxes](https://www.drupal.org/project/boxes) | bloques

### Custom

## Formularios

## Features

## Theme

### .info y regiones

### template.php

### tpls

### temas para el CMS

## Logs






