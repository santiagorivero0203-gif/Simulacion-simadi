const fs = require('fs');

const fileData = fs.readFileSync('preguntas.json', 'utf8');
const preguntas = JSON.parse(fileData);

const certifiedQuestions = [
  {
    "id": 901,
    "area": "Razonamiento Lógico Numérico",
    "pregunta": "[Certificado Cap I/II - Ej. 4] Trabajando 10 horas diarias durante 15 días, 5 hornos consumen 50 toneladas de carbón. ¿Cuántas toneladas serían necesarias para mantener trabajando 9 horas diarias durante 85 días, 3 hornos más?",
    "opciones": ["255 T/C", "409 T/C", "458 T/C", "N.A."],
    "correcta": "N.A.",
    "justificacion": "Regla de tres compuesta. Comparamos con Toneladas (Directa). Más horas = más carbón (Directa). Más días = más carbón (Directa). Más hornos = más carbón (Directa). X = 50 × (9/10) × (85/15) × (8/5). Nota que son 8 hornos porque dice '3 hornos más'. Resolviendo: X = 50 × (6120 / 750) = 408 Toneladas. Como 408 no está en las opciones, la correcta es N.A. (Ninguna de las Anteriores)."
  },
  {
    "id": 902,
    "area": "Razonamiento Lógico Numérico",
    "pregunta": "[Certificado Cap I/II - Ej. 5] Una guarnición de 400 soldados sitiados tienen víveres para 180 días y consumen 900 gramos diarios por hombre. Si recibe un refuerzo de 100 soldados, pero no recibirá víveres antes de los 240 días. ¿Cuál deberá ser la ración diaria por hombre para que los víveres alcancen?",
    "opciones": ["540 grs", "720 grs", "450 grs", "420 grs"],
    "correcta": "540 grs",
    "justificacion": "Regla de tres compuesta. Relación contra la ración (Gramos). A más soldados, menos gramos por día (Inversa). A más días que deben durar, menos gramos por día (Inversa). Soldados totales = 400 + 100 = 500. X = 900 × (400 / 500) × (180 / 240) = 900 × 0.8 × 0.75 = 540 gramos."
  },
  {
    "id": 903,
    "area": "Razonamiento Lógico Numérico",
    "pregunta": "[Certificado Cap I/II - Ej. 11] Al vender un lápiz se ha hecho un descuento del 20% del precio de lista. Con esta venta, se ha ganado el 20% del precio de costo. Hallar el precio de costo sabiendo que el precio de lista es de Bs. 15.",
    "opciones": ["10 Bs.", "15 Bs.", "12 Bs.", "N.A."],
    "correcta": "10 Bs.",
    "justificacion": "Precio de Lista (PL) = 15. Descuento = 20% de PL = 3. Precio de Venta (PV) = PL - Descuento = 15 - 3 = 12. Sabemos que PV = Precio de Costo (PC) + Ganancia. Ganancia = 20% de PC = 0.2PC. Entonces: 12 = PC + 0.2PC => 12 = 1.2PC. Despejando: PC = 12 / 1.2 = 10 Bs."
  }
];

preguntas.push(...certifiedQuestions);

fs.writeFileSync('preguntas.json', JSON.stringify(preguntas, null, 2));
console.log('Added certified questions');
