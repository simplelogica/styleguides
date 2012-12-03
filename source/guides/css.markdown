---
nav_title: SASS/CSS
title: Hojas de estilo (SASS/CSS)
---

## Codificación e identado

Ver las [consideraciones generales](/guides/general.html)

No es necesario incluir un `@charset` al principio del fichero. Si no se indica los navegadores asumen utf8 (no lo digo
yo, ¡[está en el estandar][w3c]!).

Los bloques se identan enteros. Si hay bloques dentro de bloques (reglas `@media`, anidación en SASS, etc.) se va
anidando la identación.

    #por-favor-no-hagas-esto {
    width: 100px;
    height: 100px;
    }

    #mejor-asi {
      width: 100px;
      height: 100px;

      &.con-sass {
        width: 200px;
        height: 50px;
      }
    }


## Sintáxis

La llave de apertura <kbd>{</kbd> se pone en la misma linea del selector, dejando un espacio con el mismo.

La llave de cierre <kbd>}</kbd> se pone en su propia linea, identada con el selector. Dejamos un espacio en blanco entre la llave
de cierre y el siguiente selector

Dejamos un espacio entre los dos puntos <kbd>:</kbd> de una propiedad y su valor.

Siempre ponemos el punto y coma <kbd>;</kbd> de cierre, incluso en la última linea.

Este bloque da una idea de cómo tiene que quedar

    .wide-box {
      width: 100px;
      height: 20px;
    }

    #sidebar {
      position: absolute;
      left: 0;
      top: 0;
    }

### Dentro del bloque

Ponemos una propiedad por linea

    /* Esto es feo */
    .class { width: 100px; height: 20px; font-size: 1.4em Arial, Helvetica, sans-serif; }

    /* Esto mucho mejor */
    .class {
      width: 100px;
      height: 20px;
      font: 1.4em Arial, Helvetica, sans-serif;
    }

Si tenemos varios selectores que vayan variando la misma propiedad en el mismo elemento (un `background-position` por ejemplo) podemos saltarnos esta regla. Poner las propiedades en una linea permite juntar los selectores y asociarlos al
elemento que están modificando.

En dicho caso tampoco es necesario dejar una linea en blanco entre selectores.

    /*
     * Tenemos un icono en cada elemento de una lista de navegación
     *
     * Ponemos el fondo en el <li> genérico y alteramos el background-position
     * en cada elemento
     */
    #nav li {
      background: url(/images/sprite-nav.png) no-repeat 0 0;
    }
    #nav .home    { background-position: 0 0; }
    #nav .about   { background-position: 0 -32px; }
    #nav .contact { background-position: 0 -64px; }
    #nav .blog    { background-position: 0 -96px; }

<!--
Dentro del bloque las propiedades deben seguir este orden

    #orden {
      ...
    }
-->
[w3c]: http://www.w3.org/TR/CSS21/syndata.html#charset
