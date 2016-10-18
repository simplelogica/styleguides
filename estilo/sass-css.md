---
layout: default
title: Hojas de estilo (SASS/CSS)
slug: css
---

# Hojas de estilo (SASS/CSS)

## Codificación e indentado

Ver las [consideraciones generales](/guides/general.html).

**No es necesario incluir un `@charset` al principio del fichero.** Si no se indica los navegadores
[asumen utf8][css_utf8].

Los bloques se indentan enteros. Si hay bloques dentro de bloques (reglas `@media`, anidación en
SASS, etc.) se va anidando la indentación.

```scss
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
```

## Sintáxis

La llave de apertura <kbd>{</kbd> se pone en la misma linea del selector, dejando un espacio con el
mismo.

La llave de cierre <kbd>}</kbd> se pone en su propia linea, indentada con el selector. **Dejamos un
espacio en blanco entre la llave de cierre y el siguiente selector.**

Dejamos un espacio entre los dos puntos <kbd>:</kbd> de una propiedad y su valor.

Siempre ponemos el punto y coma <kbd>;</kbd> de cierre, incluso en la última linea.

Este bloque da una idea de cómo tiene que verse el código:

```scss
.wide-box {
  width: 100px;
  height: 20px;
}

#sidebar {
  position: absolute;
  left: 0;
  top: 0;
}
```

## Nombres de los selectores

Ver la [guía general](/guides/general.html#nombres_de_identificadores).

Es preferible que los nombres indiquen a qué estan dando estilos, mejor que el estilo que dan:

```scss
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
```

Si en el futuro los botones de acción principal son azules tenemos un problema

Los espacios se sustituirán por guiones <kbd>-</kbd>. Nada de caracteres de subrayado
<kbd>_</kbd> o _camelCase_.

```scss
#noEscribiremosAsi { }
#asi_tampoco { }
#mucho-mejor { }
```

La razón de esto es que Internet Explorer crea una [variable global][IE_globals] con el mismo nombre
que el ID de los elementos. Como un <kbd>-</kbd> no es válido dentro de un identificador en
Javascript evitamos que cree dichas variables y nos ahorramos dolores de cabeza.

## Múltiples selectores

<!-- No estoy del todo convencido con esto -->
En el caso de selectores múltiples siempre cada uno en una línea, aumenta la legibilidad.

Qué es corto o largo se deja a criterio del desarrollador, siempre premiando la legibilidad.

```scss
/* Así no */
.pre, .code, #mi-bloque p {
  font-family: 'Menlo', 'Bitstream Vera Sans Mono', 'Consolas', monospace;
}

/* Mucho más claro así sobre todo con selectores largos */
.pre,
.code,
#mi-bloque p
body#home #content .separator p span,
body#home #content .separator .wadus span {
  /*
   * Si tienes un selector así el menor de tus problemas
   * es si lo pones en una linea a parte o no.
   */
}
```

## Propiedades

Usaremos las propiedades _shorthand_ cuando tenga sentido.

```scss
/* Meh... */
body {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}

/* Aún lo podemos mejorar... */
body {
  margin: 10px 10px 10px 10px;
}

/* Perfecto */
body {
  margin: 10px;
}
```

## Colocación de las propiedades

Como regla general ponemos una propiedad por linea:

```scss
/* Esto es feo */
.class { width: 100px; height: 20px; font-size: 1.4em Arial, Helvetica, sans-serif; }

/* Esto mucho mejor */
.class {
  width: 100px;
  height: 20px;
  font: 1.4em Arial, Helvetica, sans-serif;
}
```

Si tenemos varios selectores que vayan variando la misma propiedad en el mismo elemento (un
`background-position` por ejemplo) podemos saltarnos esta regla. Poner las propiedades en una linea
permite juntar los selectores y asociarlos al elemento que están modificando.

En dicho caso tampoco es necesario dejar una linea en blanco entre selectores.

```scss
/*
 * Tenemos un icono en cada elemento de una lista de navegación
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
```

## Agrupación de las propiedades

Si tenemos un selector / clase muy extenso intentaremos agrupar las propiedades dejando una línea
entre las propiedades de cada tipo para poder ver más claramante. La agrupación recomendada es:

```scss
.mi-bloque {
  /* Propiedades relacionadas con la visualización, display, position, margin, padding... */
  display: inline-block;
  width: flex-grid(6, 12);
  padding-botton: 16px;

  /* Propiedades relacionadas con la tipografía */
  font-family: $font-sans;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;
  color: #f00;

  /* Efectos especiales, transiciones, animaciones... */
  transition: padding .5s ease-in;
}
```

## Agrupación de las propiedades (2)

De un tiempo a esta parte algunas propiedades que siempre vienen en _tuplas_ las estamos
poniendo en la misma línea, y parece que todo el mundo está a gusto. Podemos hacer esto
con `width: / height:` y con `top: / right: / bottom: / left:`.

```scss
.mi-bloque {
  display: block;
  width: 50%; height: 150px;
  position: absolute;
  top: 0; right: 10px; bottom: 20px; left: 0;
}
```

## Especificidad

La necesaria. Si hay más de tres niveles suele indicar un problema y conviene refactorizar. Por
ejemplo, para el siguiente HTML:

```scss
<nav id="main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog/">Nuestras diatrivas</a></li>
    <li><a href="/contacto">Dejanos una postal</a></li>
  </ul>
</nav>
```

Si queremos dar estilo a los enlaces usaremos la mínima especificidad necesaria.

```scss
/* Con esto haceis llorar a Bert Bos. */
#main ul li a {
  ...
}

/* Mejor así. */
#main a {
  ...
}
```

Es innecesario y [lento][mdn_css_Efficiency]. Además si en el futuro queremos dar un estilo
diferente a uno de los enlaces tenemos menos especificidad que sobreescribir.

## Colores

Hexadecimal es preferido. Usaremos la sintáxis compacta cuando sea posible.

```scss
/* Meh... */
a {
  color: #006699;
}

/* Mejor */
a {
  color: #069;
}
```

Si necesitamos especificar colores con transparencia / alpha empleamos `rgba`, si el projecto
requiere soporte IE8 es recomendable poner un _fallback_ con un color sólido:

```scss
.mi-bloque {
  background-color: #f00; /* IE 8 fallback */
  background-color: rgba( 255, 0, 0, 0.5)
}
```

## Unidades, dimensiones, etc.

**Si algo tiene valor `0` quitamos la unidad.**

Para las dimensiones de las cajas y del _layout_ emplearemos `%` no medidas en `px`.
Para la creación de el layout responsive se recomienda emplear un sistema de grid,
el que más nos gusta es `flex-grid`, un _mixin_ de SASS que hace los cálculos por nosotros.
[Pequeño tutorial de uso de Flex-grid](#url)


## Reset de estilos

Tenemos nuestro propio reset de CSS [Dom-Limpio](dom_limpio) que coge un montón de
ideas de otros resets y algunas de nuestra propia cosecha.

Dom-limpio incluye un reset de tipografías. Esto es muy útil para poder hacer
cambios de marcado debido a SEO, sin que tengamos que retocar estilos.


## Fuentes

Usar `@font-face` está bien, pero intentaremos no irnos mucho en tiempos de carga.

Si la fuente está en Google Web Fonts la cogemos de ahí. Si no, solemos usar [Font Squirrel][FF_Gen]
para generar los `@font-face`, aunque hay que retocar un poco el CSS que genera. Por ejemplo, en
este CSS:

```scss
@font-face {
  font-family: 'ArvoRegular';
  src: ...;
  font-weight: normal;
  font-style: normal
}

@font-face {
  font-family: 'ArvoBold';
  src: ...;
  font-weight: normal;
  font-style: normal
}
```

Hay que poner el mismo `font-family` en las dos declaraciones y cambiar el `font-weight` en la
segunda.

```scss
@font-face {
  font-family: 'Arvo';
  src: ...;
  font-weight: normal;
  font-style: normal
}

@font-face {
  font-family: 'Arvo';
  src: ...;
  font-weight: bold;
  font-style: normal
}
```

Aunque el soporte para `@font-face` es bastante bueno (incluso IE6) conviene siempre añadir una o
dos fuentes de sistema en el valor de `font-family`, terminando la familia genérica que corresponda.

```scss
/* http://www.google.com/webfonts/specimen/Petrona */
h1 {
  font-family: Petrona, Georgia, serif;
}

/* http://www.google.com/webfonts/specimen/Open+Sans */
p {
  font-family: 'Open sans', Arial, sans-serif;
}

/* http://www.google.com/webfonts/specimen/Inconsolata */
pre, code {
  font-family: Inconsolata, Consolas, 'Ubuntu Mono',monospace;
}
```

[css_utf8]: http://www.w3.org/TR/CSS21/syndata.html#charset
[IE_globals]: http://stackoverflow.com/questions/9275331/ie-cant-manage-global-variables
[mdn_css_efficiency]: https://developer.mozilla.org/en-US/docs/CSS/Writing_Efficient_CSS?redirectlocale=en-US&redirectslug=Writing_Efficient_CSS#Avoid_the_descendant_selector.21
[dom_limpio]: https://github.com/carloscabo/dom-limpio
[saner_reset]: http://afgomez.es/blog/a-saner-reset-stylesheet/
[FF_Gen]: http://www.fontsquirrel.com/fontface/generator
