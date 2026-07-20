const fs = require('fs');

const mainFile = 'preguntas.json';
const newFiles = ['preguntas_nuevas_avanzado.json', 'preguntas_nuevas_verbal.json'];

// 1. Cargar preguntas principales
let preguntas = [];
try {
    preguntas = JSON.parse(fs.readFileSync(mainFile, 'utf8'));
} catch (e) {
    console.error("Error leyendo preguntas.json", e);
    process.exit(1);
}

// 2. Encontrar el ID máximo
let maxId = 0;
preguntas.forEach(q => {
    if (q.id > maxId) {
        maxId = q.id;
    }
});
console.log(`El ID máximo actual es: ${maxId}`);

// 3. Procesar nuevos archivos
let agregadas = 0;
newFiles.forEach(file => {
    if (fs.existsSync(file)) {
        try {
            const nuevas = JSON.parse(fs.readFileSync(file, 'utf8'));
            nuevas.forEach(q => {
                maxId++;
                q.id = maxId;
                preguntas.push(q);
                agregadas++;
            });
            console.log(`Agregadas ${nuevas.length} preguntas de ${file}.`);
        } catch (e) {
            console.error(`Error leyendo ${file}:`, e);
        }
    } else {
        console.warn(`No se encontró el archivo ${file}`);
    }
});

// 4. Guardar archivo principal actualizado
try {
    fs.writeFileSync(mainFile, JSON.stringify(preguntas, null, 2), 'utf8');
    console.log(`\n¡Éxito! Se han agregado un total de ${agregadas} preguntas.`);
    console.log(`Total de preguntas en el banco: ${preguntas.length}`);
} catch (e) {
    console.error("Error guardando preguntas.json", e);
}
