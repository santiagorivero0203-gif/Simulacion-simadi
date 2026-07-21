/**
 * Script de reparación de preguntas.json
 * =======================================
 * Problema: 178 preguntas usan el formato viejo del generador:
 *   - "enunciado" en vez de "pregunta"
 *   - "respuestaCorrecta" como índice numérico en vez de "correcta" como string
 *   - 5 opciones (incluyendo "N.A.") en vez de 4
 *
 * Solución: Normalizar TODAS las preguntas al formato que espera app.js:
 *   { id, area, tema, pregunta, opciones (4), correcta (string), justificacion }
 */

const fs = require('fs');

const preguntas = JSON.parse(fs.readFileSync('preguntas.json', 'utf8'));

let reparadas = 0;
let yaCorrectas = 0;

const preguntasCorregidas = preguntas.map(q => {
    // --- Caso 1: Formato viejo (enunciado + respuestaCorrecta index) ---
    if (q.enunciado && !q.pregunta) {
        reparadas++;

        // Extraer la respuesta correcta usando el índice ANTES de filtrar opciones
        const correctaTexto = q.opciones[q.respuestaCorrecta];

        // Filtrar "N.A." de las opciones y quedarnos con 4
        let opcionesFiltradas = q.opciones.filter(opt => opt !== "N.A.");
        
        // Si al filtrar N.A. nos quedamos con menos de 4, rellenamos
        // Si nos quedamos con más de 4, cortamos a 4 (asegurando que la correcta esté)
        if (!opcionesFiltradas.includes(correctaTexto)) {
            // La respuesta correcta ERA "N.A.", esto es un caso especial
            // Dejamos las 4 primeras opciones y marcamos la primera como correcta
            // (esto no debería pasar, pero por seguridad)
            opcionesFiltradas = q.opciones.slice(0, 4);
        }

        if (opcionesFiltradas.length > 4) {
            // Mantener la correcta y tomar 3 distractores
            const distractores = opcionesFiltradas.filter(o => o !== correctaTexto).slice(0, 3);
            opcionesFiltradas = [correctaTexto, ...distractores];
        }

        return {
            id: q.id,
            area: q.area,
            tema: q.tema || "General",
            pregunta: q.enunciado,
            opciones: opcionesFiltradas,
            correcta: correctaTexto,
            justificacion: q.justificacion || ""
        };
    }
    
    // --- Caso 2: Ya tiene "pregunta" pero podría tener "respuestaCorrecta" como índice ---
    if (q.pregunta && typeof q.respuestaCorrecta === 'number' && !q.correcta) {
        reparadas++;
        const correctaTexto = q.opciones[q.respuestaCorrecta];
        let opcionesFiltradas = q.opciones.filter(opt => opt !== "N.A.");
        
        if (opcionesFiltradas.length > 4) {
            const distractores = opcionesFiltradas.filter(o => o !== correctaTexto).slice(0, 3);
            opcionesFiltradas = [correctaTexto, ...distractores];
        }

        return {
            id: q.id,
            area: q.area,
            tema: q.tema || "General",
            pregunta: q.pregunta,
            opciones: opcionesFiltradas,
            correcta: correctaTexto,
            justificacion: q.justificacion || ""
        };
    }

    // --- Caso 3: Formato correcto, no tocar ---
    yaCorrectas++;
    return {
        id: q.id,
        area: q.area,
        tema: q.tema || "General",
        pregunta: q.pregunta,
        opciones: q.opciones,
        correcta: q.correcta,
        justificacion: q.justificacion || ""
    };
});

// Guardar el archivo reparado
fs.writeFileSync('preguntas.json', JSON.stringify(preguntasCorregidas, null, 2), 'utf8');

console.log('=== REPARACIÓN COMPLETADA ===');
console.log(`Total de preguntas: ${preguntasCorregidas.length}`);
console.log(`Reparadas (formato viejo → nuevo): ${reparadas}`);
console.log(`Ya estaban correctas: ${yaCorrectas}`);

// Validación final
const errores = [];
preguntasCorregidas.forEach((q, i) => {
    if (!q.pregunta) errores.push(`ID ${q.id}: falta campo "pregunta"`);
    if (!q.correcta) errores.push(`ID ${q.id}: falta campo "correcta"`);
    if (!q.opciones || q.opciones.length < 4) errores.push(`ID ${q.id}: tiene ${q.opciones?.length || 0} opciones (necesita 4)`);
    if (q.opciones && !q.opciones.includes(q.correcta)) errores.push(`ID ${q.id}: la correcta "${q.correcta}" NO está en las opciones`);
});

if (errores.length > 0) {
    console.log(`\n⚠️  Se encontraron ${errores.length} problemas residuales:`);
    errores.forEach(e => console.log(`  - ${e}`));
} else {
    console.log('\n✅ Todas las preguntas pasaron la validación.');
}
