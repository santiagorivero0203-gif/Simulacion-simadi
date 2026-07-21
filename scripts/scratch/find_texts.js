const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const pdfs = [
    'resources/Prueba de diagnostico UCV 2026-2027.pdf',
    'resources/UCV 2026-2027 - Ciencias y Tecnologia (Simulacro Integral).pdf',
    'resources/verbal/material/CAP I RAZ VERBAL GRIS (1).pdf',
    'resources/verbal/material/CAP II RAZ VERBAL GRIS (1).pdf',
    'resources/verbal/material/CAP III RAZ VERBAL GRIS.pdf',
    'resources/verbal/material/CAP IV y V RAZ VERBAL GRIS (1).pdf'
];

async function search() {
    for (let file of pdfs) {
        if (!fs.existsSync(file)) continue;
        let dataBuffer = fs.readFileSync(file);
        try {
            let data = await pdf(dataBuffer);
            let text = data.text;
            if (text.includes('Ricardo Archila') || text.includes('Campins y Ballester') || text.includes('Herencia de la Tribu')) {
                console.log(`\n\n=== ENCONTRADO EN ${file} ===\n\n`);
                // Find index
                let idx = text.indexOf('Ricardo Archila');
                if (idx !== -1) {
                    console.log(text.substring(Math.max(0, idx - 500), idx + 2000));
                }
                let idx2 = text.indexOf('Herencia de la Tribu');
                if (idx2 !== -1) {
                    console.log(text.substring(Math.max(0, idx2 - 500), idx2 + 2000));
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}
search();
