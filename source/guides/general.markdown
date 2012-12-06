---
nav_title: General
title: Consideraciones generales
---

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

## Identado

Dos espacios.

No parece haber un estándar para Javascript/HTML/CSS en esto, así que heredamos el de Ruby/Rails.
Además, al usar espacios se mantiene la identación al ver el código fuente en otras partes
(navegador, diffs, etc.).

Si puntualmente hay que usar un lenguaje con otras reglas aceptadas (como Python)
[se usarán las del lenguaje][pep8].

## Espacios en blanco

Los espacios en blanco al final de linea los quitamos. No aportan nada y manchan los diffs.

Las lineas en blanco no se identan por la misma razón.

Los ficheros deben terminar con un caracter de fin de linea. [Razón aqui](http://stackoverflow.com/q/729692/508684)

## Nombres de identificadores

Tan corto como sea posible. Tan largo como sea necesario.

Por ejemplo, no usar `navigation` si con `nav` basta. Usar `author` si `aut` no es suficiente.
[ie_bom]: http://stackoverflow.com/a/5063836/508684
[pep8]: http://www.python.org/dev/peps/pep-0008/#code-lay-out
