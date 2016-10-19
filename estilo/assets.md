---
layout: default
title: Estrcutura de los assets
slug: assets
---

# Estructura de los assets en un proyecto

A continuación un ejemplo de la estructura de los assets en un proyecto complejo / extenso.

## Estructura de CSS / SASS
```
.
+-- assets
|   +-- images
|   +-- stylesheets
|   |   +-- base (A)
|   |   |   +-- _variables.scss
|   |   |   +-- _mixins.scss
|   |   |   +-- _typography.scss
|   |   |   +-- _gradients.scss
|   |   |   +-- _animations.scss
|   |   |   +-- _forms.scss
|   |   |   +-- ...
|   |   |
|   |   +-- blocks (B)
|   |   |   +-- _b_cancel_booking_emea.scss
|   |   |   +-- _b_check_in_module.scss
|   |   |   +-- _b_children_destination.scss
|   |   |   +-- ...
|   |   |
|   |   +-- elements (C)
|   |   |   +-- _e_alert.scss
|   |   |   +-- _e_buttons.scss
|   |   |   +-- _e_drop_down_links.scss
|   |   |   +-- ...
|   |   |
|   |   +-- modules (D)
|   |   |   +-- _m_filter_by.scss
|   |   |   +-- _m_filter_row.scss
|   |   |   +-- _m_info_box.scss
|   |   |   +-- ...
|   |   |
|   |   +-- pages (E)
|   |   +-- libs (F)
|   |   |   +-- _fancybox.scss
|   |   |   +-- _formikation.scss
|   |   |   +-- ...
|   |   |
|   |   +-- application.scss
```

### (A) assets / stylesheets / base

En esta carpeta guardaremos las hojas de estilo de todos los **elementos generales
a todo el site: variables, mixins, estilos básicos de formularios, animaciones
reutilizables, etc.**

### (B) assets / stylesheets / blocks

La unidad constructiva fundamental de nuestro sistema es el bloque ( ver [estructura modular](/guides/estructura-modular.html) )
en esta carpeta tendremos todos los bloques que empleemos en el site. El nombre
del CSS **debe ser similar al nombre de la clase que define el bloque**.

Asó si tenemos un bloque `.b-mi-bloque` debe está en un fichero que se llame `_b_mi_bloque.scss`.

Esta misma regla se sigue para los **elementos** y para los **módulos**.

### (E) assets / stylesheets / pages

Ocurre que algunos projectos precisan de estilos especiales para algunas páginas
concretas que sobreescriben los estilos generales de algunos bloques. Si esto
sucede podemos hacer una hoja de estilo para la página particular aquí.

### (F) assets / stylesheets / libs

Hojas de estilo de librerías / componentes propios o de terceros.

## Estructura de JS
```
.
+-- assets
|   +-- images
|   +-- stylesheets
|   +-- javascripts
|   |   +-- blocks   (A)
|   |   |   +-- b_cancel_booking_emea.js
|   |   |   +-- b_check_in_module.js
|   |   |   +-- b_children_destination.js
|   |   |   +-- ...

|   |   +-- modules  (B)
|   |   |   +-- m_filter_by.js
|   |   |   +-- m_filter_row.js
|   |   |   +-- m_info_box.js
|   |   |   +-- ...
|   |   |
|   |   +-- libs     (C)
|   |   |   +-- fancybox.js
|   |   |   +-- formikation.js
|   |   |   +-- ...
|   |   |
|   |   +-- application.js
|   |   +-- ready.js
```

Como vemos la estructura del JS sigue la misma línea que la del CSS. **Si un bloque
de CSS tiene un javascript asociado, crearemos el fichero JS correspondiente con
el mismo nombre que el bloque y que la hoja de estilos.**

Procuraremos tener un único fichero `ready.js` para toda la aplicación donde se
inicialice todo que sea necesario tener en el `document-ready`.

Debemos **intentar mantener el `ready.js` en el mínimo posible.** Lo que añadamos
en él debe ser de caracter general a toda la aplicación

Y en el `application.js` definiremos el orden de los JSs que se minificarán:

```js
//= require jquery
//= require_tree ./libs
//= require_tree ./modules
//= require_tree ./blocks
//= require ready
```
