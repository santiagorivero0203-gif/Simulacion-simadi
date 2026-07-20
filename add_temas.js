const fs = require('fs');

const fileData = fs.readFileSync('preguntas.json', 'utf8');
const preguntas = JSON.parse(fileData);

preguntas.forEach(q => {
    const text = (q.pregunta + " " + q.justificacion).toLowerCase();
    
    if (text.includes("m.c.m") || text.includes("m.c.d") || text.includes("mínimo común") || text.includes("máximo común")) {
        q.tema = "Teoría de Números (MCM/MCD)";
    } else if (text.includes("regla de tres") || text.includes("proporcionalidad") || text.includes("proporción")) {
        q.tema = "Regla de Tres y Proporciones";
    } else if (text.includes("descuento") || text.includes("porcentaje") || text.includes("%")) {
        q.tema = "Porcentajes";
    } else if (text.includes("progresión")) {
        q.tema = "Progresiones";
    } else if (text.includes("consecutivos") || text.includes("ecuación") || text.includes("inecuación") || text.includes("estrictamente mayor")) {
        q.tema = "Ecuaciones e Inecuaciones";
    } else {
        q.tema = "Mixto";
    }

    if (q.pregunta.includes("Certificado")) {
        q.tema = "Problemas Oficiales Certificados";
    }
});

fs.writeFileSync('preguntas.json', JSON.stringify(preguntas, null, 2));
console.log("Añadido el campo 'tema' a todas las preguntas.");
