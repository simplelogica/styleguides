---
layout: default
title: Javascript
slug: javascript
---

# Javascript

## Codificación e indentado

Ver las [consideraciones generales](/estilo/general.html).

Ver [consejos y buenas prácticas de Javascript](https://docs.google.com/presentation/d/1IMl6Mg8bhaF5GJfeBON7KJ49V_lIhPXEmi7Ug7CP13M/edit?usp=sharing).

Ver [consejos y buenas prácticas de Jquery](https://docs.google.com/presentation/d/17pe7sTf_qAWTxGhE9pDOBx5_k65_QHa52q0-Z3hOPUo/edit?usp=sharing).

## Sintáxis

Las llaves de apertura `{` se ponen en la misma linea del bloque que abren.

La llave de cierre `}` se pone en su propia linea, indentada al mismo nivel del bloque que abre. Normalmente se debe dejar un salto de linea inmediatamente después de la llave, salvo en los `else if` y `else`.

Los punto y coma `;` **los ponemos siempre.** [Google][Google_ASI] lo explica estupendamente.

Mejor comillas simples `'` que dobles `"`. En HTML usamos comillas dobles, si en Javascript usamos comillas simples no es necesario escapar las del HTML:

```js
var html;

// Booo
html = "<span class=\"wadus\">...</span>";

// Yeah!
html = '<span class="wadus">...</span>';
```

En cuanto espacios en blanco entre operadores, paréntesis, etc, ver las [consideraciones generales](/estilo/general.html#espacios_en_blanco).

Este bloque da una idea de cómo debería verse el código:

```js
function foo(bar) {
  "use strict";

  var baz = 3;

  if (bar == baz) {
    return $('<span class="wadus">Igual!</span>');
  } else if (bar < baz) {
    return $('<span class="wadus">Menor!</span>');
  } else {
    return $('<span class="wadus">Mayor!</span>');
  }

}
```

## Nombres de los identificadores

Ver la [guía general](/estilo/general.html#nombres_de_identificadores).

- CAPS_SNAKE_CASE para constantes.
- UpperCamelCase para constructores (funciones que se usan con `new`).
- lowerCamelCase para métodos de un objeto o funciones normales.
- snake_case para variables.
- Las variables que contengan **objetos de JQuery** comienzan con el caracter `$`.


## Variables globales

Por lo general una por proyecto como namespace. Hace falta una buena razón para meter más.

## eval()

**Nunca debemos usar eval().** Puede ser útil para deserializar respuestas de AJAX en proyectos donde no usemos
jQuery (pero ¿qué proyectos son esos?).

## Constructores vs literales

Usamos literales en vez de constructores para tipos nativos ya que dan menos problemas. Por ejemplo
este código:

```js
var x = new Boolean(false);
if (x) {
  alert('Hola!');
}
```

Es contraintuitivo. `new Boolean` devuelve un objeto, que siempre va a evaluar a `true`.

Usar _type casting_ está permitido

```js
var x = Boolean(0);
if (x) {
  alert('Nadie me verá nunca!');
}
```

El constructor de Arrays es más problemático. En este código:

```js
var a = 4,
    b = 2;

var arr1 = new Array(a, b); // [4, 2]
var arr2 = new Array(a);    // [undefined, undefined, undefined, undefined]
```

El constructor funciona de manera distinta dependiendo del número de parametros. Al usar literales
no hay problemas:

```js
var arr1 = [a, b]; // [4, 2]
var arr2 = [a];    // [4]
```

El constructor de objetos no tiene estos problemas, pero es más cómodo añadir propiedades:

```js
  var o = new Object();
  o.a = 0;
  o.b = 1;
  o.c = 2;
  o['strange key'] = 3;

  var o2 = {
    a: 0,
    b: 1,
    c: 2,
    'strange key': 3
  };
```

<!--
## Documentación y comentarios

¿JSDoc[1] o Docco/Rocco[2]?

[1]:
[2]: http://jashkenas.github.com/docco/
-->

## Strict mode

Si, a nivel de función. Si lo ponemos a nivel global puede dar problemas al concatenar los
javascripts. Pasa [hasta en las mejores familias][amazon_strict_mode].

Para más informacion sobre el modo estricto hay [varios][mdn_strict] [articulos][jresig_strict]
[al respecto][zakas_strict].

En ficheros ya existentes para proyectos en mantenimiento evaluaremos si merece la pena. Si lleva
mucho tiempo (mas de 20 minutos) adaptarlo a modo estricto ponemos al principio del fichero el
siguiente comentario para que JSHint no se queje.

```js
/*jshint strict:false */
```
## JSHint

**Si, siempre, en ficheros antiguos y nuevos.**

Si hay errores en ficheros antiguos se arreglan. Cómo se ejecute ya depende de cada uno, aunque
se recomienda usar un editor que pueda integrarlo ya que ayuda a capturar errores durante el desarrollo.

El .jshintrc base que debe usarse es este:

```js
{
  "browser"  : true,      // Asume browser globals (window, document...)
  "jquery"   : true,      // Asume jQuery globals
  "devel"    : false,     // Warn about console calls
  "curly"    : true,      // Always require curly braces in `if` and `while` blocks
  "forin"    : true,      // Require hasOwnProperty inside for..in loops
  "latedef"  : true,      // Avoid hoisting problems
  "maxdepth" : 3,         // http://news.ycombinator.com/item?id=3414637
  "newcap"   : true,      // Capitalize constructor functions
  "noarg"    : true,      // Don't use arguments.callee. It's deprecated so you should
                          // not use it anyway
  "noempty"  : true,      // Don't allow empty blocks
  "quotmark" : "single",  // Use single quotes only
  "strict"   : true,      // Require strict mode
  "trailing" : true,      // Warn about trailing whitespace
  "undef"    : true,      // Don't use undeclared variables (avoid splicit globals)
  "unused"   : true       // Warn about unused variables
}
```

En el hipotético caso de que hagamos algo con otra plataforma que no sea un navegador o usemos otra
librería que no sea jQuery en algún proyecto lo cambiaremos sólo en ese proyecto.

[google_asi]: http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=Semicolons#Semicolons
[amazon_strict_mode]: https://bugzilla.mozilla.org/show_bug.cgi?id=579119
[mdn_strict]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Functions_and_function_scope/Strict_mode
[jresig_strict]: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
[zakas_strict]: http://www.nczonline.net/blog/2012/03/13/its-time-to-start-using-javascript-strict-mode/
