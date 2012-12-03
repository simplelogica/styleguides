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
## Nombres de los selectores

Ver la [guía general](/guides/general.html#nombres_de_identificadores). Los espacios se sustituirán por guiones <kbd>-</kbd>.
Nada de caracteres de subrayado <kbd>_</kbd> o camelCase.

    #noEscribiremosAsi { }
    #asi_tampoco { }
    #mucho-mejor { }

La razón de esto es que Internet Explorer crea una [variable global][IE_globals]
con el mismo nombre que el ID de los elementos. Como un <kbd>-</kbd> no es válido dentro de un identificador en Javascript
evitamos que cree dichas variables y nos ahorramos dolores de cabeza.

La otra razón es que te ahorras pulsar la tecla de mayusculas. ¡Una pulsación ahorrada es un caracter más en el código!

## Especificidad

La necesaria. Si hay más de tres niveles suele indicar un problema y conviene refactorizar. Por ejemplo, para el
siguiente HTML:

    <nav id="main">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/blog/">Nuestras diatrivas</a></li>
        <li><a href="/contacto">Dejanos una postal</a></li>
      </ul>
    </nav>

Si queremos dar estilo a los enlaces usaremos la mínima especificidad necesaria.

    /* Con esto haceis llorar a Bert Bos, y a mi. */
    #main ul li a {
      ...
    }

    /* Con esto os invitará a unas cañas */
    #main a {
      ...
    }

Es innecesario y [lento][mdn_css_Efficiency].
Además si en el futuro queremos dar un estilo diferente a uno de los enlaces tenemos menos especificidad que
sobreescribir.

[w3c]: http://www.w3.org/TR/CSS21/syndata.html#charset
[IE_globals]: http://stackoverflow.com/questions/9275331/ie-cant-manage-global-variables
[mdn_css_efficiency]: https://developer.mozilla.org/en-US/docs/CSS/Writing_Efficient_CSS?redirectlocale=en-US&redirectslug=Writing_Efficient_CSS#Avoid_the_descendant_selector.21

