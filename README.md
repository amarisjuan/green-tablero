# Tablero comercial · versión de demostración (Netlify)

Página estática con las respuestas del backend ya calculadas a partir de los **datos de prueba** del reto
(corte 31/10/2026). No necesita Java ni base de datos. No guarda cambios ni envía correos.

- `datos/` : respuestas de la API guardadas en JSON (y la vista previa de los correos en `datos/correo/`).
- `app.js` : el mismo del backend, con `api()` cambiado para leer `datos/`.

Para regenerarla: arranque el backend con los datos cargados y vuelva a guardar las respuestas de `/api/*` en `datos/`.
Para publicarla: arrastre esta carpeta (o `netlify_demo.zip`) a https://app.netlify.com/drop
