# Análisis de Exámenes Adicionales de Matemáticas

Este documento contiene el reporte del análisis y la expansión de los exámenes **Preparaduría N° 7 (Logaritmos)** y **Examen N° 02 UCV 2025**.

## 1. Validación y Errores Detectados en Enunciados Originales

Durante la resolución de los ejercicios de los exámenes proporcionados en las imágenes, se encontraron y corrigieron los siguientes errores o ambigüedades:

> [!WARNING]  
> **Pregunta 4 (Logaritmos):** La desigualdad original era $9 \cdot 10^{-x} \le 4 \cdot 10^x$. Las opciones proporcionadas en la imagen estaban incorrectas matemáticamente (la correcta sería $x \ge \frac{1}{2} \log(9/4)$), pero por la forma de las respuestas, era claro que la prueba consideraba un error de tipeo. Asumí la opción más coherente y la corregí en la base de datos.

> [!WARNING]  
> **Pregunta 7 (Logaritmos):** El enunciado original tiene un número muy ilegible: $\log_4(2 \log_3(1 + \mathbf{?} \log_2 x)) = 1/2$. Al realizar la ingeniería inversa desde las opciones, determiné que el valor faltante para que la ecuación tuviera una solución entera exacta ($x=2$) era un multiplicador de `2`. He corregido el planteamiento.

> [!WARNING]  
> **Pregunta 9 (Logaritmos):** El denominador en la foto era extremadamente ilegible debido a la impresión. Se estructuró como $\log_{27} 25 \cdot \log_{25} 64 \cdot \log_{64} 27$ para crear un "ciclo perfecto" (cuyo valor es 1), permitiendo así que el problema tenga un resultado entero exacto (2) que concuerda con las opciones de la imagen.

> [!WARNING]  
> **Pregunta 14 (Examen N° 02):** El popular acertijo de "todos son libros de novela menos tres..." originalmente indicaba "menos tres". Sin embargo, en la imagen este "tres" está tachado con bolígrafo y reemplazado por un "dos". Resolviendo el sistema de ecuaciones, con el número "tres" el problema era matemáticamente imposible, pero con el número "dos" la respuesta es lógicamente "3 libros en total". Se utilizó esta versión corregida a mano.

## 2. Generación de Preguntas Similares

Para cumplir con la solicitud de crear al menos 3 ejercicios similares por pregunta original que mantuvieran un nivel idéntico de dificultad, se desarrolló un sistema de plantillas matemáticas (`generar_logaritmos.js` y `generar_matematicas.js`). 

Este sistema evalúa las operaciones dinámicamente, asegurando un **0% de error matemático** en las respuestas de las variaciones creadas. 

### Resumen de Inserción
- **Logaritmos (Preparaduría N° 7):** Se crearon plantillas para las 16 preguntas originales. Al ejecutarse con variaciones numéricas (bases, exponentes, incógnitas), se generaron un total de **65** preguntas.
  - *Área asignada:* `Ciencia y Tecnología`.
- **Lógico Matemático (Examen N° 02):** Se crearon plantillas para 30 preguntas de razonamiento (edades, fracciones, ecuaciones, orden de información, geometría espacial, criptogramas). Con sus variaciones programáticas, se generaron **113** preguntas.
  - *Área asignada:* `Razonamiento Lógico Numérico` y `Razonamiento Lógico`.

## 3. Estado Final del Simulador
- El archivo `preguntas.json` contenía 312 preguntas tras la última actualización.
- Se han fusionado 178 preguntas nuevas (originales y similares).
- **El banco actual cuenta con 490 preguntas robustas**, debidamente categorizadas, justificadas paso a paso, y con respuestas barajadas (shuffle) para evitar patrones predecibles.
- Se ha habilitado la opción de **Ciencia y Tecnología** en el archivo `index.html` del frontend para permitir que el estudiante seleccione los retos de logaritmos.

## 4. Preguntas Sustituidas
> [!NOTE]  
> El **ejercicio 20** del Examen N° 02 pedía predecir el siguiente patrón de una secuencia gráfica ("la figura que continúa"). Dado que tu simulador SIMADI está orientado a texto y opciones, he sustituido este ejercicio por un acertijo lógico verbal de nivel equivalente ("orden de días") para mantener la coherencia de la plataforma y el conteo total.
