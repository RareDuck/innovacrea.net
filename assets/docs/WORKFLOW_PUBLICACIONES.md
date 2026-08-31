# Workflow de Publicaciones

## Idea general

Los proyectos se editan desde `assets/projects/projects.json`. Cada objeto del JSON es un proyecto. El índice de la web se genera automáticamente desde ese archivo y, al clicar una fila, se abre una ficha desde el borde derecho.

## Carpetas

- `index.html`: estructura principal de la web.
- `styles.css`: composición visual, responsive y drawer lateral.
- `script.js`: carga el JSON, pinta el índice y abre las fichas.
- `assets/projects/projects.json`: lista pública de proyectos.
- `assets/projects/media/`: carpeta recomendada para imágenes, gifs y vídeos de proyectos.
- `assets/docs/project-template.json`: plantilla para copiar cuando añadas un proyecto.

## Cómo añadir un proyecto nuevo

1. Crea una carpeta para sus medios:

   `assets/projects/media/nombre-del-proyecto/`

2. Mete ahí las imágenes, gifs o vídeos que quieras usar.

3. Abre `assets/docs/project-template.json`, copia el objeto completo y pégalo al final del array de `assets/projects/projects.json`.

4. Cambia los campos principales:

   - `id`: nombre corto sin espacios, por ejemplo `casa-patio`.
   - `title`: nombre visible del proyecto.
   - `value`: posición en el eje. `0` es arquitectura pura, `100` es software puro.
   - `category`: categoría visible del proyecto, por ejemplo `Architecture`, `Software`, `Exercise` o `Generative design`.
   - `year`: año.
   - `location`: lugar, contexto o curso.
   - `text`: resumen corto.
   - `url`: PDF, enlace externo o archivo relacionado. Déjalo como `""` si no quieres botón final.

5. Edita `media`. Esta lista funciona como biblioteca del proyecto: declarar una imagen aquí no la coloca automáticamente en la ficha. Para mostrarla, tienes que llamarla desde `sections.blocks` usando su `id`. Cada medio necesita un `id` único:

   - `alt`: va primero para que al colapsar el objeto en VS Code sigas identificando la imagen.
   - `id`: nombre corto sin espacios, por ejemplo `planta1`.
   - `type`: `image`, `gif` o `video`.
   - `src`: ruta del archivo.
   - `size`: `small`, `medium`, `large`, `full` o una medida CSS como `420px`, `60%`, `45vw`.
   - `caption`: pie opcional.
   - Para vídeo puedes añadir `poster`.

6. Edita `sections` para textos largos y medios intercalados. Cada sección tiene `title` y `blocks`.

   JSON no permite poner dos veces `"body"` dentro del mismo objeto: si lo haces, el segundo pisa al primero. Para alternar texto, imágenes y más texto, usa varios objetos dentro de `blocks`:

   ```json
   {
     "title": "Concepto",
     "blocks": [
       {
         "body": "Patata"
       },
       {
         "media": ["foto1", "foto2"],
         "size": "medium"
       },
       {
         "body": "Fin"
       }
     ]
   }
   ```

   También puedes cambiar el tamaño de una imagen concreta dentro de un grupo:

   ```json
   {
     "media": [
       {
         "id": "foto1",
         "size": "small"
       },
       {
         "id": "foto2",
         "size": "large"
       }
     ]
   }
   ```

   Los textos de `body` aceptan formato mínimo: `**negrita**`, `*cursiva*`, `` `monospace` `` y enlaces `[texto](https://example.com)`.

7. Comprueba que el JSON sigue siendo válido:

   - Cada proyecto va entre `{}`.
   - Los proyectos se separan con coma.
   - El último proyecto no lleva coma después.
   - Todas las claves y textos van entre comillas dobles.

## Recomendaciones de medios

- Imágenes: `.jpg`, `.png`, `.webp`.
- Gifs: `.gif`.
- Vídeos: `.mp4` para máxima compatibilidad.
- Usa nombres sin espacios ni tildes en archivos: `planta-01.jpg`, `animacion-recorrido.gif`, `secuencia.mp4`.
- Si una imagen necesita verse completa, conviene exportarla con margen. El drawer usa una composición grande y técnica, no una miniatura.

## Ejemplo mínimo

```json
{
  "id": "casa-patio",
  "title": "Casa Patio",
  "value": 10,
  "category": "Architecture",
  "year": "2026",
  "location": "Madrid",
  "text": "Vivienda organizada mediante patios, filtros y una secuencia estructural clara.",
  "url": "",
  "media": [
    {
      "alt": "Planta principal de Casa Patio",
      "id": "planta1",
      "type": "image",
      "src": "assets/projects/media/casa-patio/planta-01.jpg",
      "size": "medium",
      "caption": "Planta y sistema de patios."
    }
  ],
  "sections": [
    {
      "title": "Concepto",
      "blocks": [
        {
          "body": "El proyecto trabaja el patio como dispositivo climático, espacial y estructural."
        },
        {
          "media": ["planta1"],
          "size": "medium"
        }
      ]
    }
  ]
}
```

## Publicar cambios

1. Añade o edita proyectos en `assets/projects/projects.json`.
2. Añade los archivos de media dentro de `assets/projects/media/...`.
3. Abre la web servida por HTTP, no solo haciendo doble clic si quieres probar la carga del JSON.
4. Revisa el proyecto en el índice y abre su drawer.
5. Sube los cambios al repositorio.
