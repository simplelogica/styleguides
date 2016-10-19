---
layout: default
title: Estructura modular (SASS/CSS)
slug: css
---

# Cómo estructurar el CSS de un projecto

## Nomenclatura y estructura

Nuestro enfoque está basado en el atomic design de Brad Frost, adapatado a la
tipología de nuestros proyectos.

Definimos 3 tipos de _entidades_ básicas:

1. Elemento
2. Bloque
3. Módulo

## 1. Elementos

Los elementos son el módulo mínimo reutilizable que se puede reutilizar en un
poryecto, el ejemplo típico es un **botón** o un **input de un formulario**
(personalizados para nuestro proyecto concreto.

Las clases relativas a elementos comienzan con `.e-` así por ejemplo la clase de
un botón sería `.e-btn`.

Cada tipo de elemento debe tener su propia hoja CSS que típicamente debería estar
en `assets/stylesheets/elements/...`.

Siguiendo con el ejemplo, la hoja de estilos de los botones de nuestro proyecto
sería `assets/stylesheets/elements/_e_buttons.scss`.

## 2. Bloques

Los bloques son las piezas más comunes y abundantes de un proyecto, suelen
reutilizarse en varias ubicaciones / páginas.

![Ejemplo de bloque](/images/block-sample.png)

Los bloques deben estar formados por un contendor con una clase que comience `.b-`
por ejemplo `.b-hotel-card`:

```html
<div class="b-hotel-card">
  <img class="big-img" src="image" alt="">
  <div class="text-content">
    <p class="location">Chiclana de la Frontera - Cádiz</p>
    <h3 class="title">
      <a href="#">IBEROSTAR Andalucía Playa</a>
    </h3>
    <div class="stars"><span class="rating-stars r5"></span></div>
    <ul class="e-features">
        <li>Direct access to the beach</li>
        <li>Sea front hotel</li>
        <li>Free Wi-Fi</li>
        <li>SeaSoul Beach Club</li>
        <li>All-inclusive (optional)</li>
    </ul>
  </div>
</div>
```

Este bloque debe tener su propia hoja de estilos ubicada en: `assets/stylesheets/blocks/` con el mismo nombre que la clase principal que lo define. Para nuestro ejemplo:

`assets/stylesheets/blocks/_b_hotel_card.scss`

Así el CSS típico de este bloque podría ser:

```SCSS
/* assets/stylesheets/blocks/_b_hotel_card.scss */
.b-hotel-card {
  width: 100%
  overflow: hidden;
  .big-img {
    ...
  }
  .location {
    ...
  }
  .title {
    ...
  }
}
```

Dentro del bloque se pueden emplear nombres de clases muy generales `.title`, `.subtitle`...
esas clases **NUNCA deben emplearse fuera del un bloque para evitar colisiones / efectos
secundararios**.

Si necesitamos un estilo para un título general a toda la aplicación que esté fuera
de un bloque mejor llamarlo `.app-title`, `.page-title` o similar.

Es una buena práctica en general pensar en que nuestros bloques se expandan al 100%
del ancho disponible. Suele ahorrarnos trabajo cuando hay que adapatarlos a responsive
o integrarlos dentro de un módulo (ver más adelante).

Cuando crees un módulo puedes ir adelantando trabajo y añadir la sección de responsive
al mismo, si quedase vacía, al minimizar el CSS desaparecerá, así que no te preocupes.

```SCSS
//
// Tablet
//
@include media($tablet) {
  .b-hotel-card {

  }
}

//
// Mobile
//
@include media($mobile) {
  .b-hotel-card {

  }
}
```

**Si nuestro bloque tiene un JS asociado (tiene algún tipo de funcionalidad, o interacción
  programada con JS), debemos crear un fichero JS con la misma nomenclatura:**

`assets/javascript/blocks/b_hotel_card.js`

Este fichero de JS puede tener su propio `$(document).ready` que lo autoinicialice, no es
necesario que esté en el `ready.js` general (lo hemos comprobado y no afecta al rendimiento).

Por ejemplo:

```js
/* assets/javascript/blocks/b_hotel_card.js */
$(function() {
  var $sliders = $('.b-hotel-card').find('.sliders');
  if ( !$sliders.length ) {
    return;
  }
  $sliders.find('.swiper-container').each(function() {
    var $el = $(this);
    $el.swiper({
      slidesPerView: 3,
      preloadImages: false,
      lazyLoading: true,
      lazyLoadingInPrevNext: true,
      breakpoints: {
        1024: {
          slidesPerView: 2,
        }
      }
    });

    $el.find('.card-container').matchHeight({
      byRow: false
    });
  });

  $sliders.find('.s-expand').fancybox();
});
```

## 3. Módulos

Los módulos son **agrupaciones de bloques** con una disposición determinada. Por ejemplo:

![Ejemplo de módulo](/images/module-sample.png)

En este ejemplo tenemos dos tipos de bloques diferentes que se combinan con una
determinada estructura que es lo que conforma el **módulo**.

Los módulos deben estar formados por un contendor con una clase que comience `.m-`
por ejemplo `.m-offers-1-4`.

Y su correspondiente fichero CSS en: `assets/stylesheets/modules/_m_offers_1_4.scss`

Podemos emplear los módulos para sobreescribir algunas propiedades de los bloques
que lo integran de forma sencilla:

```scss
.m-offers-1-4 {
  width: 100%;

  .b-hotel-card {
    .title {
      color: red;
    }
  }
}
```
