---
layout: default
title: GIT
slug: git
---

# GIT

## Configuración

Antes de ponernos a trabajar con ningún repositorio, debemos de configurar las opciones generales de Git para nuestro flujo de trabajo.

* Configura nombre y correo asociados a los commits:

  ```bash
  $ git config --global user.name ‘Nombre’
  $ git config --global user.email ‘usuario@dominio.com’
  ```

* Configuramos las opciones por defecto para pull y merge.

  ```bash
  $ git config --global merge.ff false
  $ git config --global branch.autosetuprebase always
  ```

Con **_merge.ff false_**, hacemos que todos los _merges_ sean --no-ff, es decir que siempre se genere un nuevo commit al hacer un merge. Por defecto los commits en Git son fast-forward, es decir, que si no tienen la necesidad crear un nuevo commit dejarán las cabezas de las dos ramas a mergear en el mismo punto, dejando la rama mas limpia, pero la historia menos descriptiva. Nosotros preferimos optar por tener toda la información posible en la historia, así podremos ver de que rama estaba viniendo un commit.

Con **_branch.autosetuprebase always_** forzamos que el comando **git pull** haga siempre un **rebase** para actualizar las ramas remotas con las locales. Al tener el merge como no-ff, siempre nos dejaría un commit al hacer pull, y en este caso no aporta nada a la historia global del repositorio.

**NOTA:** mucho ojo si ya has empezado a trabajar con Git y activas el autorebase posteriormente. Esta opción añade la opción cundo se crea una rama, por lo que las ramas ya creadas anteriormente no la tendrán. Para añadirla, edita el fichero **.git/config** del proyecto en cuestion y añade **rebase = true** en las ramas que no lo tengan. Por ejemplo:

  ```bash
  [branch "master"]
  	remote = origin
  	merge = refs/heads/master
  	rebase = true
  ```

## Ramas

* Escribe los nombre en inglés y sólo con letras y números, nada de acentos, ñ's, # o caracteres que puedan dar problemas.

* Usa **guiones** para separar palabras.

* Usa nombres **cortos** y **descriptivos**:

  ```bash
  # bien
  $ git checkout -b oauth-migration

  # poco preciso
  $ git checkout -b login_fix
  ```

* Siempre que sea posible, añade el número de ticket:

  ```bash
  # Ticket #36500
  $ git checkout -b feature/oauth-migration-36500
  ```

* Agrupa las ramas en función del tipo de trabajo, para eso, nombra la rama empezando con el tipo y /, por ejemplo **feature/** para nuevas funcionalidades y **fix/** para correcciones:

  ```bash
  $ git checkout -b feature/oauth-migration
  $ git checkout -b fix/text-error
  ```

* Para grandes funcionalidades en las que van a trabajar varias personas, crear una rama específica y crear subcarpetas para las distintas tareas:

  ```bash
  # Rama común
  $ git checkout -b feature-redesign/master
  # Trabajo de back
  $ git checkout -b feature-redesign/back
  # Trabajo de front
  $ git checkout -b feature-redesign/front
  ```

* Cuidado con crear múltiples anidaciones ya que puede bloquear ramas. Si existe la rama **feature/oauth-migration** y se crea la rama **feature/oauth-migration/front**, la primera será un directorio para Git y no se podrá hacer checkout a ella.

* Borra tus ramas personales en local y del repositorio remoto cuando acabes de trabajar en una tarea y ya esté mergeada a master, a no ser que exista alguna razón para mantenerla. Mantengamos los repositorios limpios, ¿acaso no borras tus ramas en casa?

  Consejo: Borra siempre las ramas locales desde master con -d, en el caso de no estar mergeadas no te dejará.

  ```bash
  # Borrar la rama local
  $ git branch -d feature/oauth-migration
  # Borrar la rama remota
  $ git push origin :feature/oauth-migration
  ```

  Puedes listar las ramas mergeadas en master con:

  ```bash
  $ git branch --merged master | grep -v "\* master"`
  ```

  Puedes limpiar las ramas remotas que han sido borradas en el repositiorio con:

  ```bash
  $ git remote prune origin
  ```

## Commits

* Cada commit debe englobar el menor cambio "lógico" posible en vez de juntar múltiples cambios en un solo commit grande.

* Haz commits con lógica cada poco tiempo. Con commits pequeños y atómicos será más fácil entender la historia y revertir cambios si se producen problemas.

* Si has acumulado varios commits, al hacerlo procura mantener el orden lógico, es decir si un cambio en un commit depende de otro, el dependiente deberá de hacerse después. Y describe la dependencia en los comentarios.

### Mensajes

* Escribir mensajes descriptivos y consistentes:
  * Una primera línea con una descripción concisa de menos de 50 caracteres, para una correcta visualización tanto en clientes como en la consola. Primera palabra en mayúsculas, no acabar en punto la frase (es el asunto del commit) y usar el imperativo de la segunda persona del singular. Por ejemplo, en vez de escribir "He añadido comprobaciones para" o "Añadiendo comprobaciones para", utilizar la frase "Añade comprobaciones para"
  * Dejar una línea en blanco y escribir una descripción más detallada (por qué, cómo, número de ticket, enlaces...), máximo 72 caracteres por línea. Dependiendo del cliente lo detectará y lo mostrara como información colapsada junto a la descripción general.

  ```bash
  Asunto de menos de 50 carcteres

  Explicación detallada de lo acontecido en el ticket
  sin pasar de los 72 caracteres. La línea de separación
  hará que algunos clientes traten la primera línea como
  el asunto y esto como el cuerpo.

  Separar más párrafos con saltos de línea.

    - También está bien usar bullets.

  Información sacada de http://git-scm.com/book/es/v1/Git-en-entornos-distribuidos-Contribuyendo-a-un-proyecto
  ```
* Por esto, es más recomendable usar un editor para escribir los commits que los commits en línea (-m)

## Flujo

Por lo general los proyectos tendrán como mínimo dos ramas, **master** y **staging**. La rama _master_ es la que usan los servidores de producción para los despliegues, mientras que _staging_ es la de los servidores de prueba.

Consideraciones generales:

* Las ramas nuevas siempre saldrán de _master_, salvo casos especiales como una funcionalidad particular de una rama en desarrollo.
* No hacer commits directos sobre master.
* Salvo casos particulares, las ramas deberían de mergearse primero a _staging_ y tras asegurarnos de que todo funciona, a _master_.
* Antes de mergear una rama, actualizar la rama sobre la que vamos a mergear.
* Comprobar que una rama funciona correctamente antes de pushear.
* No pushear cambios en _master_ que no se puedan desplegar.
* Para actualizar las ramas podemos usar _git pull_ pero tambíen es recomendable hacer por separado _git fetch_ y _git rebase_. De esta forma veremos mas claramente que ha cambiado en el repositorio y haremos el rebase con más cuidado.
* Usa [tags](http://git-scm.com/book/es/v2/Fundamentos-de-Git-Etiquetado) para marcar puntos importates del repositorio.
* **Nunca reescribir la historia ya publicada.** Ciertos comandos como el rebase pueden reescribir la historia de los commits. Si esos commits ya estaban publicados, nunca debemos de vovler a publicarlos ya que afectaremos al resto de compañeros que los tengan en su repositorio local.
* En algunos casos como usar un rebase interactivo (git rebase -i) para dejar la historia más limpia, hacerlo siempre con ramas personales que no estén publicadas.


Ejemplo de flujo de trabajo con una nueva funcionalidad:

  ```bash
  # Nos vamos a master y creamos la rama
  $ git checkout master
  $ git checkout -b feature/oauth-migration

  # Trabajamos, y cuando esté listo lo llevamos a staging y comprobamos
  $ git checkout staging
  $ git fetch
  $ git rebase
  $ git merge feature/oauth-migration
  $ git push

  # Cuando tengamos que desplegar
  $ git checkout master
  $ git fetch
  $ git rebase
  $ git merge feature/oauth-migration
  $ git push

  # Si hemos acabado con la funcionalidad
  $ git branch -d feature/oauth-migration
  # Y si hemos pusheado nuestra rama
  $ git push origin :feature/oauth-migration
  ```

En caso de no poder pushear una rama porque nos olvidamos de actualizar antes de mergear, nos aseguramos de que no perdemos nada en esa rama, actualizamos con fetch y hacemos un **reset --hard** al remoto para volver a mergear con la rama actualizada:

  ```bash
  $ git checkout master
  $ git merge feature/oauth-migration
  $ git push
  # ERROR
  $ git fetch
  $ git reset --hard origin/master
  $ git merge feature/oauth-migration
  $ git push
  ```

Manten el repositorio (local y remoto) limpo, ejecuta comandos de mantenimiento cada cierto tiempo::

* [`git-gc(1)`](http://git-scm.com/docs/git-gc)
* [`git-prune(1)`](http://git-scm.com/docs/git-prune)
* [`git-fsck(1)`](http://git-scm.com/docs/git-fsck)


### La policía de git no tendrá piedad con:

  * Crear una rama desde _staging_.
  * Mergear _staging_ sobre otra rama.
  * Hacer rebase en una rama ya publicada.
  * Forzar un push (-f).

  <iframe src="https://player.vimeo.com/video/82408340" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/82408340">LA HE LIADO PARDA, versi&oacute;n PIWEEK de Kaleidos</a> from <a href="https://vimeo.com/user10956949">kaleidos</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

# Créditos

Esta guía está basada en nuestro propio uso de Git, las recomendaciones de [Git](http://git-scm.com/book/es/v2) y [esta guía](https://github.com/agis-/git-style-guide).
