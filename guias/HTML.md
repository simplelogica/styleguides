---
layout: default
title: Marcado (HTML)
slug: html
---

# Marcado (HTML)

## Codificación e indentado

Ver las [consideraciones generales](/guides/general.html).

Meteremos un `<meta>` con la codificación del fichero. Normalmente es apache/nginx quien se encarga
de especificar la codificación en las cabeceras pero no siempre podemos controlar esto.

    <meta charset="utf8">

## Tags

En minusculas nos gustan más.

Es recomendable cerrar siempre las etiquetas, incluso las opcionales.

    <!-- Meh... -->
    <p>Lorem ipsum dolor sit amet

    <ul>
      <li>First item
      <li>Second item
      <li>Third item
    </ul>

    <!-- Bondad! -->
    <p>Lorem ipsum dolor sit amet</p>

    <ul>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </ul>

Hay varias razones para esto:

- Tiene sentido. Si abres algo lo cierras cuando terminas de usarlo, ¿no?
- Generalmente los editores se vuelven un poco locos al reindentar automáticamente el primer bloque.
- También se vuelven locos en los comandos tipo "Close tag".
- ¿Quien se acuerda de cuando es opcional y cuando no? Cerramos todo y nos evitamos problemas.

## Atributos

Mejor ponerlos entre comillas aunque sean opcionales. Mantiene la consistencia y evita futuros
problemas. Además destacan más en los editores puesto que cambia el resaltado de sintaxis.


## HTML5

Siempre en proyectos nuevos. En proyectos ya existentes respetamos lo que haya (generalmente XHTML
1.0).

## Doctype

Siempre debe de haber un `DOCTYPE`. Evitaremos a toda costa que el navegador entre en _quirks mode_.

En proyectos nuevos usaremos el `DOCTYPE` de HTML5. En ya existentes dejaremos el que esté.

    <!DOCTYPE html>
