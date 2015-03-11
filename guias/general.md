---
layout: default
title: Consideraciones generales
slug: general
---

#Consideraciones generales

La regla de oro es **ser consistente**. Cuando modifiques código en un fichero existente echa un
vistazo alrededor, mira como está hecho y hazlo igual. Dentro del mismo fichero, es mejor un mal
estilo que una mezcla de estilos.

Para ficheros nuevos mejor usar esta guía.

Los editores más usados (Vim, Emacs, Textmate, Sublime text, etc.) se pueden configurar para
automatizar lo que contamos aquí. Puedes usar el editor o IDE que quieras, pero si permite
automatizar determinadas cosas te ahorrará preocupaciones y nosotros viviremos más felices.

## Codificación y fin de linea

Estamos en el siglo XXI, así que todo debe de ir guardado en utf8 sin BOM (Byte Order Mark). Meter
un BOM [rompe Internet Explorer][ie_bom].

Casi todos usamos Mac o Linux, así que el fin de linea debe ser el de UNIX (LF)

## Indentado

Dos espacios. No parece haber un estándar para Javascript/HTML/CSS en esto, así que heredamos el de
Ruby/Rails. Además, al usar espacios se mantiene la indentación al ver el código fuente en otras
partes (navegador, diffs, etc.).

Si puntualmente hay que usar un lenguaje con otras reglas aceptadas (como Python)
[se usarán las del lenguaje][pep8].

Si necesitas más de tres niveles de indentación [seguramente tienes un problema][linus_indent].

## Espacios en blanco

Los espacios en blanco al final de linea los quitamos. No aportan nada y manchan los diffs. Las
lineas en blanco no se indentan por la misma razón.

Es preferible que los ficheros [terminen con un caracter de fin de linea][whitespace].

En expresiones y sentencias los espacios en blanco son bondad. Mejor código legible que compacto.

    // Meh...
    for(var i=0;i<arr.length;i++){
      ...
    }

    // Mejor
    for (var i = 0; i < arr.length; i++) {
      ...
    }

## Nombres de identificadores

Tan corto como sea posible. Tan largo como sea necesario. Por ejemplo, no usar `navigation` si con
`nav` basta. Usar `author` si `aut` no es suficiente.

En cuanto al idioma, mejor en Inglés. Las APIs de todo con lo que trabajamos están en Inglés, así
que mejor ser consistentes.

## Documentación y comentarios

- Escribir código es más divertido que escribir su documentación.
- Descifrar qué hace un fragmento de código es más dificil que leer documentación.
- El código se lee más veces de las que se escribe, muchas veces por más personas.

Los beneficios de escribir la documentación **siempre** compensan el esfuerzo inicial, así que mejor documentar.

En cuanto al idioma mejor en Inglés. Si algo es susceptible de liberarse como open source nos
evitamos tener que traducirlo.

Si necesitamos hacer una marcianada en vez de explicar **qué** estamos haciendo es mejor explicar **por qué** lo hacemos. Si hay un ticket relacionado se puede indicar. Por ejemplo en este código:

    /* Booo! */
    #header {
      ...
      zoom: 1; /* Triggers hasLayout */
    }

    /* Bien!! */
    #header {
      ...
      zoom: 1; /* Helps IE to calculate the height properly. Refs #1234 */
    }

En bloques de comentarios grandes usamos markdown para dar formato:

    /**
     * jQuery.lastTweet
     * ----------------
     *
     * Fetch the last tweet from the specified user
     *
     * Usage:
     *
     *     $('#container').lastTweet('username');
     *
     * This will parse URLs and mentions and write them into the `#container` node.
     */
    ;(function($) {
      "use strict";
      $.fn.lastTweet = function...
      ...
    }(jQuery));


[ie_bom]: http://stackoverflow.com/a/5063836/508684
[pep8]: http://www.python.org/dev/peps/pep-0008/#code-lay-out
[linus_indent]: http://en.wikiquote.org/wiki/Linus_Torvalds#1995
[whitespace]: http://stackoverflow.com/q/729692/508684
