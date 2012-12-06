---
nav_title: SASS/CSS
title: Hojas de estilo (SASS/CSS)
---

## Codificación e identado

Ver las [consideraciones generales](/guides/general.html).

No es necesario incluir un `@charset` al principio del fichero. Si no se indica los navegadores
asumen utf8 (no lo digo yo, ¡[está en el estandar][w3c]!).

Los bloques se identan enteros. Si hay bloques dentro de bloques (reglas `@media`, anidación en
SASS, etc.) se va anidando la identación.

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

La llave de apertura <kbd>{</kbd> se pone en la misma linea del selector, dejando un espacio con el
mismo.

La llave de cierre <kbd>}</kbd> se pone en su propia linea, identada con el selector. Dejamos un
espacio en blanco entre la llave de cierre y el siguiente selector

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

## Múltiples selectores

<!-- No estoy del todo convencido con esto -->
En el caso de selectores múltiples... depende: si son cortos en la misma linea, dejando un espacio
entre la coma <kbd>,</kbd> y el siguiente selector. Si son largos en lineas a parte.

Qué es corto o largo se deja a criterio del desarrollador, siempre premiando la legibilidad.

    .pre, .code {
      font-family: 'Menlo', 'Bitstream Vera Sans Mono', 'Consolas', monospace;
    }

    body#home #content .separator p span,
    body#home #content .separator .wadus span {
      /*
       * Si tienes un selector así el menor de tus problemas
       * es si lo pones en una linea a parte o no.
       */
    }

## Colocación de las propiedades

Ponemos una propiedad por linea

    /* Esto es feo */
    .class { width: 100px; height: 20px; font-size: 1.4em Arial, Helvetica, sans-serif; }

    /* Esto mucho mejor */
    .class {
      width: 100px;
      height: 20px;
      font: 1.4em Arial, Helvetica, sans-serif;
    }

Si tenemos varios selectores que vayan variando la misma propiedad en el mismo elemento (un
`background-position` por ejemplo) podemos saltarnos esta regla. Poner las propiedades en una linea
permite juntar los selectores y asociarlos al elemento que están modificando.

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

## Orden de las propiedades

(Hablar de esto con Victor, que es el que lo tiene controlado).

<!--
Dentro del bloque las propiedades deben seguir este orden

    #orden {
      ...
    }
-->

## Nombres de los selectores

Ver la [guía general](/guides/general.html#nombres_de_identificadores).

Es preferible que los nombres indiquen a qué estan dando estilos, mejor que el estilo que dan:

    /* Describe cómo es el botón, no lo que hace */
    .red-button {
      ...
    }

    /*
     * Descríbe el típo de botón, no cómo es visualmente.
     * Si en el futuro los botones de acción principal son azules en vez de rojos no tendremos
     * problema.
     */
    .main-button {
      ...
    }

Si en el futuro los botones de acción principal son azules tenemos un problema

Los espacios se sustituirán por guiones <kbd>-</kbd>. Nada de caracteres de subrayado <kbd>_</kbd> o
camelCase.

    #noEscribiremosAsi { }
    #asi_tampoco { }
    #mucho-mejor { }

La razón de esto es que Internet Explorer crea una [variable global][IE_globals] con el mismo nombre
que el ID de los elementos. Como un <kbd>-</kbd> no es válido dentro de un identificador en
Javascript evitamos que cree dichas variables y nos ahorramos dolores de cabeza.

La otra razón es que te ahorras pulsar la tecla de mayusculas. ¡Una pulsación ahorrada es un
caracter más en el código!

## Especificidad

La necesaria. Si hay más de tres niveles suele indicar un problema y conviene refactorizar. Por
ejemplo, para el siguiente HTML:

    <nav id="main">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/blog/">Nuestras diatrivas</a></li>
        <li><a href="/contacto">Dejanos una postal</a></li>
      </ul>
    </nav>

Si queremos dar estilo a los enlaces usaremos la mínima especificidad necesaria.

    /* Con esto haceis llorar a Bert Bos. */
    #main ul li a {
      ...
    }

    /* Mejor así. */
    #main a {
      ...
    }

Es innecesario y [lento][mdn_css_Efficiency]. Además si en el futuro queremos dar un estilo
diferente a uno de los enlaces tenemos menos especificidad que sobreescribir.

[w3c]: http://www.w3.org/TR/CSS21/syndata.html#charset
[IE_globals]: http://stackoverflow.com/questions/9275331/ie-cant-manage-global-variables
[mdn_css_efficiency]: https://developer.mozilla.org/en-US/docs/CSS/Writing_Efficient_CSS?redirectlocale=en-US&redirectslug=Writing_Efficient_CSS#Avoid_the_descendant_selector.21

