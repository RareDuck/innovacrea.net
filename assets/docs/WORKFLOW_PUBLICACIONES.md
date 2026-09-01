# Workflow de Publicaciones

## Estructura

Cada proyecto usa dos archivos:

- `assets/projects/projects.json`: metadatos del índice, enlace opcional y biblioteca de medios.
- `assets/projects/nombre-del-proyecto/content.md`: el cuerpo completo de la ficha.

El JSON no contiene el texto largo ni `sections`. El campo `content` apunta al Markdown correspondiente. La web carga ambos archivos al iniciar y abre el contenido ya resuelto en el panel lateral.

## Añadir un proyecto

1. Crea `assets/projects/nombre-del-proyecto/media/` e incorpora los archivos multimedia.
2. Copia `assets/docs/project-template.json` como un nuevo objeto dentro de `assets/projects/projects.json` y completa los metadatos.
3. Declara cada recurso en `media` con un `id` único, su `src`, `alt`, `type`, `size` y, opcionalmente, `caption` o `poster`.
4. Copia `assets/docs/project-template.md` como `assets/projects/nombre-del-proyecto/content.md` y redacta ahí la ficha.

## Markdown y medios

El archivo Markdown admite encabezados (`##`), párrafos, listas, citas, **negrita**, *cursiva*, `monospace` y enlaces externos.

Para insertar un medio, escribe su identificador entre llaves en una línea propia:

```md
{foto1}
```

El tamaño por defecto es el que tenga ese medio en el JSON. Puedes sobrescribirlo puntualmente sin tocar la biblioteca:

```md
{foto1|small}
{video1|full}
```

Se pueden escribir varios medios contiguos para mostrarlos en el mismo grupo. Si el id no existe en `media`, las llaves se muestran como texto normal; así se evitan medios rotos inesperados.

## Comprobación

Sirve la web por HTTP, revisa que `projects.json` sea JSON válido, que cada `content` exista y que cada `{mediaid}` esté declarado dentro del `media` de ese mismo proyecto.
