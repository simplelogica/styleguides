---
layout: default
title: Marcado (HTML)
slug: html
---

# Marcado (HTML)

## Codificación e indentado

Ver las [consideraciones generales](/estilo/general.html).

Meteremos un `<meta>` con la codificación del fichero. Normalmente es apache/nginx quien se encarga
de especificar la codificación en las cabeceras pero no siempre podemos controlar esto.

```html
<meta charset="utf8">
```

## Tags

Los tags **siempre en minúsculas**.

Es recomendable cerrar siempre las etiquetas, incluso las opcionales.

```html
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
```

Hay varias razones para esto:

- Tiene sentido. Si abres algo lo cierras cuando terminas de usarlo, ¿no?
- Generalmente los editores se vuelven un poco locos al reindentar automáticamente el primer bloque.
- También se vuelven locos en los comandos tipo "Close tag".
- ¿Quien se acuerda de cuando es opcional y cuando no? Cerramos todo y nos evitamos problemas.

## HTML5

Siempre en proyectos nuevos. En proyectos ya existentes respetamos lo que haya.

## Doctype

Siempre debe de haber un `DOCTYPE`. Evitaremos a toda costa que el navegador entre en _quirks mode_.

En proyectos nuevos usaremos el `DOCTYPE` de HTML5. En ya existentes dejaremos el que esté.

```html
<!DOCTYPE html>
```

# Usar las etiquetas más convenientes para cada contenido

Recordemos que podemos usar muchos tags en HTML5 que puede ser más semánticos que `<div>` sólamente por mencionar algunos:

```html
<article>
<aside>
<figcaption>
<figure>
<figure>
<nav>
<section>
<summary>
<time>
```

Por ejemplo si necesitamos mostrar una fecha o una hora es mucho más correcto emplear la etiqueta `<time>` que un `<div>` o un `<span>`:

```html
<p>I have a date on <time datetime="2008-02-14 20:00">Valentines day</time>.</p>
```

# Usar etiquetas de texto para contenidos de texto

Es recomendable por SEO y por mantener nuestro HTML semántico **emplear etiquetas de texto para contenidos de texto:**

```html
<!-- No muy bien -->
<div class="b-mi-bloque">
  <div class="title">Título</div>
  <div class="subtitle">Subtítulo</div>
  <div class="contenido">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam molestias quisquam consequuntur quasi, tempora cum?</div>
</div>

<!-- Mucho mejor -->
<div class="b-mi-bloque">
  <h3 class="title">Título</h3>
  <h4 class="subtitle">Subtítulo</h4>
  <p class="contenido">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam molestias quisquam consequuntur quasi, tempora cum?</p>
</div>
```

## Atributos

Siempre ponerlos entre **comillas dobles.** Mantiene la consistencia y evita futuros
problemas. Además destacan más en los editores puesto que cambia el resaltado de sintaxis.

```html
<div class="mi-clase">...
```

Hay una excepcción en la que usar **comillas simples**: **cuando se emplean
_data-attributes_, especialmente si estos pueden contener JSON en algún momento.**

```html
<div class="mi-clase" data-json='{"widget":{"debug": "on", "window": { "title": "Sample Konfabulator Widget", "name": "main_window", "width": 500, "height": 500}' ></div>
```
