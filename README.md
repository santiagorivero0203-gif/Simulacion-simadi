# Simulador TDI - Test Diagnóstico Integral

Aplicación web interactiva para la preparación de los estudiantes que presentan la prueba diagnóstica integral de la UCV. Permite a los usuarios realizar simulacros de examen cronometrados en diferentes áreas de conocimiento.

## Estructura del Proyecto

- `index.html`, `app.js`, `styles.css`: Código fuente de la aplicación principal (frontend estático).
- `preguntas.json`: Base de datos de preguntas consolidada que alimenta el simulador.
- `guides.json`: Base de datos del material de apoyo/guías de estudio.
- `scripts/`: Scripts y utilidades (Node.js/Python) utilizados para parsear, formatear y generar las preguntas desde distintos orígenes (desarrollo interno).
- `docs/`: Análisis y documentación sobre los requerimientos de la prueba.
- `resources/`: Material original de donde se extraen las preguntas (PDFs y exámenes en imágenes).
- `data/`: Archivos temporales o bases de datos intermedias antes de fusionarlas en `preguntas.json`.

## Despliegue

La aplicación está configurada para desplegarse estáticamente (por ejemplo, en Vercel). El archivo `.vercelignore` asegura que los scripts de desarrollo y recursos pesados no formen parte de la compilación de producción.
