const fs = require('fs');

const fileData = fs.readFileSync('preguntas.json', 'utf8');
const preguntas = JSON.parse(fileData);

const variedQuestions = [
  {
    "id": 904,
    "area": "Razonamiento Lógico Numérico",
    "tema": "Operaciones Básicas y Lógica Numérica",
    "pregunta": "[Certificado Cap I/II - Ej. 1] La suma del minuendo, sustraendo y resta de una sustracción es 19456 y el minuendo es el cuádruplo del sustraendo. Hallar el sustraendo.",
    "opciones": ["2432", "1216", "3648", "608"],
    "correcta": "2432",
    "justificacion": "**Concepto Fundamental:** Partes de una sustracción (Minuendo - Sustraendo = Resta). De aquí se deduce que Minuendo = Sustraendo + Resta. \n\n**Resolución:** Si sumamos los tres términos (M + S + R = 19456), podemos sustituir (S + R) por M. Obtenemos M + M = 19456 => 2M = 19456 => M = 9728. El problema dice que M = 4S, por tanto 9728 = 4S => S = 9728 / 4 = 2432."
  },
  {
    "id": 905,
    "area": "Razonamiento Lógico Numérico",
    "tema": "Propiedades de los Números",
    "pregunta": "[Certificado Cap I/II - Ej. 4] Si p y q son racionales, no enteros, y p > 0 y q < 0, entonces el producto (p × q) representa necesariamente:",
    "opciones": ["Un racional negativo", "Un racional no entero", "Un racional positivo", "Un entero negativo"],
    "correcta": "Un racional negativo",
    "justificacion": "**Concepto Fundamental:** Ley de los signos y propiedades de clausura de los números racionales (Q). \n\n**Resolución:** Un positivo por un negativo da como resultado un número negativo. Al multiplicar dos números racionales, el resultado siempre pertenece al conjunto de los racionales (Clausura). No se puede garantizar que 'no sea entero' (ej. p=3/2, q=-4/3 => p×q=-2, que es entero). Por lo tanto, lo único absolutamente seguro es que es 'Un racional negativo'."
  },
  {
    "id": 906,
    "area": "Razonamiento Lógico Numérico",
    "tema": "Regla de Tres y Proporciones",
    "pregunta": "[Certificado Cap I/II - Ej. 9] La diferencia entre dos números es 48 y están a razón de 5:9. ¿Cuál es el menor de ellos?",
    "opciones": ["208", "60", "48", "96"],
    "correcta": "60",
    "justificacion": "**Concepto Fundamental:** Proporcionalidad Directa y Constante de Proporcionalidad (k). Una razón a:b indica que los valores son a×k y b×k. \n\n**Resolución:** Sean los números 9k (el mayor) y 5k (el menor). Su diferencia es 9k - 5k = 48 => 4k = 48 => k = 12. El número menor es 5k = 5 × 12 = 60."
  },
  {
    "id": 907,
    "area": "Razonamiento Lógico Numérico",
    "tema": "Regla de Tres y Proporciones",
    "pregunta": "[Certificado Cap I/II - Ej. 12] En una granja hay patos y gallinas a razón de 9:10. Si en una fiesta se sacrifican 19 gallinas, la razón se invierte (10:9). ¿Cuántas gallinas había inicialmente?",
    "opciones": ["180", "90", "100", "110"],
    "correcta": "100",
    "justificacion": "**Concepto Fundamental:** Ecuaciones lineales con razones y proporciones. \n\n**Resolución:** Inicialmente Patos(P) = 9k, Gallinas(G) = 10k. Si mueren 19 gallinas, la nueva razón P / (G - 19) es 10/9. Sustituyendo: 9k / (10k - 19) = 10/9. Multiplicamos en cruz: 81k = 100k - 190. Restando: 19k = 190 => k = 10. Las gallinas iniciales eran 10k = 10 × 10 = 100."
  },
  {
    "id": 908,
    "area": "Razonamiento Lógico Numérico",
    "tema": "Operaciones Básicas y Lógica Numérica",
    "pregunta": "[Certificado Cap I/II - Ej. 13] ¿Cuál es la fracción generatriz que representa al número decimal puro 0,1515...?",
    "opciones": ["15/100", "15/99", "5/33", "1/15"],
    "correcta": "5/33",
    "justificacion": "**Concepto Fundamental:** Fracción Generatriz de decimales periódicos puros. Se coloca el periodo completo en el numerador y tantos '9' en el denominador como cifras tenga el periodo. \n\n**Resolución:** El periodo es '15' (2 cifras). Por tanto, la fracción generatriz bruta es 15/99. Al simplificar (dividiendo numerador y denominador entre 3), obtenemos 5/33."
  },
  {
    "id": 909,
    "area": "Razonamiento Lógico Numérico",
    "tema": "Operaciones Básicas y Lógica Numérica",
    "pregunta": "[Certificado Cap I/II - Ej. 14] Si de una soga de 40 metros de longitud se cortan 3 partes iguales de 5 2/3 metros. ¿Cuánto falta a lo que queda para tener 31 5/8 metros de soga?",
    "opciones": ["7 3/5", "8 5/8", "7 6/3", "70/8"],
    "correcta": "8 5/8",
    "justificacion": "**Concepto Fundamental:** Conversión de fracciones mixtas a impropias y operaciones básicas (suma, resta y multiplicación de fracciones). \n\n**Resolución:** 1) Convertimos la fracción mixta cortada: 5 2/3 = (5×3+2)/3 = 17/3. 2) Son 3 partes: 3 × (17/3) = 17 metros. 3) Sobran: 40 - 17 = 23 metros. 4) Falta para llegar a 31 5/8: (31 + 5/8) - 23 = 8 + 5/8 = 8 5/8 metros."
  }
];

preguntas.push(...variedQuestions);

fs.writeFileSync('preguntas.json', JSON.stringify(preguntas, null, 2));
console.log('Nuevas preguntas variadas añadidas exitosamente.');
