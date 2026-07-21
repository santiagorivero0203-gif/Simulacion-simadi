const fs = require('fs');

const extractAndGenerate = [
    // ==========================================
    // PREGUNTAS EXTRAÍDAS DEL DOCUMENTO (preguntas_admision.md)
    // ==========================================
    
    // ORTOGRAFÍA
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "El genio, no comete errores sus errores; son voluntarios.",
            "El genio, no comete errores, sus errores; son voluntarios.",
            "El genio, no comete errores, sus errores son voluntarios.",
            "El genio no comete errores, sus errores son voluntarios."
        ],
        correcta: "El genio no comete errores, sus errores son voluntarios.",
        justificacion: "La coma entre sujeto y verbo ('El genio, no comete') es incorrecta. La opción D no separa el sujeto del predicado."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "El dibujo es el lenguaje mas antiguo, es un lenguaje universal.",
            "El dibujo es el lenguaje más antiguo, es un lenguage universal.",
            "El dibujo es el lenguaje más antiguo, es un lenguaje universal.",
            "El dibujo es el lenguage más antiguo, es un lenguaje universal."
        ],
        correcta: "El dibujo es el lenguaje más antiguo, es un lenguaje universal.",
        justificacion: "'Más' de cantidad lleva tilde, y 'lenguaje' se escribe con j."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "La historia mas; famosa de persistencia humana la tenemos; en Tómas Alva Edison.",
            "La história, más famosa, de persistencia humana la tenemos, en Tomás Alva Edison.",
            "La historia más famosa de persistencia humana la tenemos en Tomás Alva Edison.",
            "La historia más; famosa de persistencia humana la tenemos; en Tomas Alva Edison."
        ],
        correcta: "La historia más famosa de persistencia humana la tenemos en Tomás Alva Edison.",
        justificacion: "No se deben usar comas ni puntos y comas interrumpiendo el flujo natural de la oración aquí. 'Más' lleva tilde, y 'Tomás' también."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Hay juegos que permiten aprender más fácilmente.",
            "Hay juegos que permiten aprender más facilmente.",
            "Hay juegos qué permitén aprender más fácilmente.",
            "Hay juegos que permitén aprender más fácilmente."
        ],
        correcta: "Hay juegos que permiten aprender más fácilmente.",
        justificacion: "'fácilmente' conserva la tilde del adjetivo 'fácil'. 'Permiten' y 'que' no llevan tilde en este contexto."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Hipócrates, \"el padre de la medicina\", nacio en Cos, isla del mar Egéo, en 460 aC.",
            "Hipócrates \"el padre de la medicina\" nacio en Cos, isla del mar Egeo, en 460 aC.",
            "Hipócrates, el padre de la medicina, nació en Cos, isla del mar Egeo en 460 aC.",
            "Hipócrates, \"el padre de la medicina nació en Cos, isla del mar Egeo, en 460 aC."
        ],
        correcta: "Hipócrates, el padre de la medicina, nació en Cos, isla del mar Egeo en 460 aC.",
        justificacion: "'Nació' lleva tilde por ser aguda terminada en vocal. 'Egeo' no lleva tilde. Las aposiciones explicativas ('el padre de la medicina') van entre comas."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Su talento, dedicacion, estudio, genio y otras cualidades lo hicieron merecedor de los elogios de Platón de Aristóteles y de los hombres más brillantes de su época.",
            "Su talento, dedicación, estudio, genio y otras cualidades lo hicieron merecedor de los elogios de Platón, de Aristóteles y de los hombres más brillantes de su época.",
            "Su talento dedicación, estudio, genio y otras cualidades lo hicieron merecedor de los elogios de Platón, de Aristóteles y de los hombres mas brillantes de su época.",
            "Su talento, dedicación, estudio, genio y otras cualidades lo hicieron merecedor de los elogios de Platón, de Aristoteles y de los hombres mas brillantes de su época."
        ],
        correcta: "Su talento, dedicación, estudio, genio y otras cualidades lo hicieron merecedor de los elogios de Platón, de Aristóteles y de los hombres más brillantes de su época.",
        justificacion: "'Dedicación', 'Platón', 'Aristóteles', 'más', y 'época' llevan tilde obligatoriamente. Además, la enumeración debe estar separada por comas."
    },

    // SINÓNIMOS EN CONTEXTO
    {
        area: "Razonamiento Verbal",
        tema: "Sinónimos en Contexto",
        tipo: "opcion_multiple",
        pregunta: "En la selva amazónica existe una gran variedad de pájaros EXÓTICOS muy cotizados en los mercados europeos.",
        opciones: ["esotéricos", "extravagantes", "raros", "canoros"],
        correcta: "raros",
        justificacion: "En este contexto, 'exótico' hace referencia a algo inusual o raro."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Sinónimos en Contexto",
        tipo: "opcion_multiple",
        pregunta: "Montesquieu, sociólogo francés, hizo una HONDA crítica del régimen absolutista, intentó ELUCIDAR el origen del Estado y la naturaleza de las leyes.",
        opciones: ["ferviente - explicar", "profunda - dilucidar", "ardiente - probar", "severa - soslayar"],
        correcta: "profunda - dilucidar",
        justificacion: "'Honda' es sinónimo de profunda, y 'elucidar' es sinónimo de dilucidar (aclarar, explicar)."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Sinónimos en Contexto",
        tipo: "opcion_multiple",
        pregunta: "El déspota que RETIENE el poder en contra de la voluntad del pueblo debe ENFRENTAR un final incierto.",
        opciones: ["ostenta - esperar", "conquista - anhelar", "detenta - afrontar", "ejerce - abaldonar"],
        correcta: "detenta - afrontar",
        justificacion: "Retener el poder de forma ilegítima es 'detentar'. Enfrentar se relaciona con 'afrontar'."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Sinónimos en Contexto",
        tipo: "opcion_multiple",
        pregunta: "Cuando una ideología se convierte en un DOGMA, pierde su capacidad de evolucionar.",
        opciones: ["Axioma", "Argumento", "Apostasía", "Entramado"],
        correcta: "Axioma",
        justificacion: "Un dogma o axioma es un principio o verdad innegable o incuestionable."
    },

    // ORACIONES INCOMPLETAS / CONECTORES
    {
        area: "Razonamiento Verbal",
        tema: "Completación de Oraciones",
        tipo: "opcion_multiple",
        pregunta: "Todo diagnóstico debe ir _____ por _____.",
        opciones: ["reforzado - un consejo", "garantizado - una medicina", "acompañado - una curación", "seguido - un tratamiento"],
        correcta: "seguido - un tratamiento",
        justificacion: "Lógicamente, tras el diagnóstico (identificación del problema médico) sigue el tratamiento."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Completación de Oraciones",
        tipo: "opcion_multiple",
        pregunta: "El verdadero matrimonio no es la unión _____ de conflictos, sino la unión de cónyuges que, a pesar de esos conflictos que existen siempre e invariablemente, saben _____.",
        opciones: ["libre - pelear", "exenta - reconciliarse", "llena - evitarlos", "ausente - soportarse"],
        correcta: "exenta - reconciliarse",
        justificacion: "El texto hace contraste. Si los conflictos 'existen siempre', entonces no puede ser una unión 'exenta' (libre) de ellos de manera absoluta, pero sí deben saber 'reconciliarse'."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Completación de Oraciones",
        tipo: "opcion_multiple",
        pregunta: "El reaccionario es un tipo de hombre enemigo absoluto del _____ que respeta escrupulosamente la rutina cotidiana.",
        opciones: ["trabajo", "gobierno", "cambio", "estado"],
        correcta: "cambio",
        justificacion: "Si es 'reaccionario' (opuesto a la innovación) y 'respeta la rutina', es enemigo del 'cambio'."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Completación de Oraciones",
        tipo: "opcion_multiple",
        pregunta: "El siglo XX ha sido el gran siglo de los divorcios, el paso de la familia nuclear a un variado surtido de modelos. _____ podría pensarse que fue el amor libre el que descerrajó la conyugalidad, fue, sobre todo, el mercado libre.",
        opciones: ["A pesar de que", "Porque", "Pese a", "Aunque"],
        correcta: "Aunque",
        justificacion: "El conector 'Aunque' introduce una idea concesiva/adversativa adecuada: 'Aunque podría pensarse que fue X, en realidad fue Y'."
    },
    
    // ANALOGÍAS
    {
        area: "Razonamiento Verbal",
        tema: "Analogías y Relaciones Semánticas",
        tipo: "opcion_multiple",
        pregunta: "ACTOR : GUIÓN",
        opciones: ["juez : sentencia", "ciudadano : voto", "cantante : pentagrama", "bailarín : música"],
        correcta: "cantante : pentagrama",
        justificacion: "El actor sigue un guión para actuar, así como el cantante lee el pentagrama para cantar (ambas son artes escénicas/musicales basadas en una guía escrita)."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Analogías y Relaciones Semánticas",
        tipo: "opcion_multiple",
        pregunta: "DIESTRA : SINIESTRA",
        opciones: ["delante : atrás", "experto : torpe", "babor : estribor", "estribor : babor"],
        correcta: "estribor : babor",
        justificacion: "Relación de antonimia espacial lateral. Diestra es derecha, Siniestra es izquierda. Estribor es derecha (barco), Babor es izquierda."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Analogías y Relaciones Semánticas",
        tipo: "opcion_multiple",
        pregunta: "ABEJA : MIEL",
        opciones: ["remolacha : azúcar", "maíz : aceite", "gusano : seda", "vaca : carne"],
        correcta: "gusano : seda",
        justificacion: "Relación animal - producto de su secreción/elaboración biológica directa."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Analogías y Relaciones Semánticas",
        tipo: "opcion_multiple",
        pregunta: "DIARIO : IMPRENTA",
        opciones: ["libro : librería", "barco : astillero", "guerra : arsenal", "arena : mar"],
        correcta: "barco : astillero",
        justificacion: "Relación objeto - lugar de fabricación/construcción."
    },

    // COMPRENSIÓN LECTORA
    {
        area: "Razonamiento Verbal",
        tema: "Comprensión Lectora",
        tipo: "opcion_multiple",
        contexto: "Cada profesional tiende a ver un solo aspecto de la sociedad descuidando a los demás. Así, por ejemplo, el médico no verá acaso más que enfermos (actuales o en potencia), hospitales y farmacias; el economista, productores, comerciantes y consumidores; el político, votantes y soldados. Por ello, cuando se habla de desarrollo, cada cual piensa en la expansión del aspecto que más le interesa. De esta lamentable y evitable especialización profesional resulta un mosaico caótico de concepciones de la sociedad y de su desarrollo, formado por visiones parciales, ninguna de las cuales permite comprender el problema global.",
        pregunta: "La idea fundamental planteada en el texto es:",
        opciones: [
            "Existe un mosaico de concepciones respecto a la sociedad y a su desarrollo.",
            "Cada profesional tiende a ver un solo aspecto de la sociedad descuidando los demás.",
            "El aspecto económico es el pilar fundamental para todo el desarrollo.",
            "Cada profesional debe desarrollarse en el área de su competencia."
        ],
        correcta: "Cada profesional tiende a ver un solo aspecto de la sociedad descuidando los demás.",
        justificacion: "Es la tesis principal del autor, introducida en la primera oración y sustentada en todo el texto."
    },

    // MATEMÁTICA / RAZONAMIENTO LÓGICO
    {
        area: "Razonamiento Lógico",
        tema: "Resolución de Problemas",
        tipo: "opcion_multiple",
        pregunta: "La suma del minuendo, sustraendo y la resta de una sustracción es 19.456 y el minuendo es el cuádruplo del sustraendo. Hallar el sustraendo.",
        opciones: ["6.296", "7.296", "2.432", "1.216"],
        correcta: "2.432",
        justificacion: "Propiedad: Minuendo + Sustraendo + Diferencia = 2*Minuendo. Entonces 2M = 19456 -> M = 9728. Como M = 4*S, entonces S = 9728 / 4 = 2432."
    },
    {
        area: "Razonamiento Lógico",
        tema: "Resolución de Problemas",
        tipo: "opcion_multiple",
        pregunta: "Si dos números x y y, están en relación de 5:9 y además x - y = 48. (Suponiendo que hablan de |x-y|). ¿Cuál es el mayor?",
        opciones: ["108", "60", "120", "216"],
        correcta: "108",
        justificacion: "Sean 5k y 9k los números. La diferencia es 4k = 48 -> k = 12. El mayor es 9k = 9*12 = 108."
    },
    {
        area: "Razonamiento Lógico",
        tema: "Resolución de Problemas",
        tipo: "opcion_multiple",
        pregunta: "Entre José, Eduardo y Rafael tienen 240 bolívares. Se sabe que la cantidad de dinero que cada uno tiene guarda entre sí la misma relación que hay entre los números 2, 3 y 5. ¿Cuál es la mayor cantidad de dinero que hay entre los tres?",
        opciones: ["120", "46", "48", "84"],
        correcta: "120",
        justificacion: "2k + 3k + 5k = 10k = 240 -> k = 24. El que más tiene es 5k = 5 * 24 = 120."
    },

    // ==========================================
    // PREGUNTAS NUEVAS GENERADAS
    // ==========================================
    
    // ORTOGRAFÍA (Nuevas)
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "A mí me parece que él no está diciendo la verdad.",
            "A mi me parece que el no está diciendo la verdad.",
            "A mí me parece que el no está diciendo la verdad.",
            "A mi me parece que él no está diciendo la verdad."
        ],
        correcta: "A mí me parece que él no está diciendo la verdad.",
        justificacion: "'mí' (pronombre personal) y 'él' (pronombre personal) llevan tilde diacrítica para diferenciarse de 'mi' (posesivo) y 'el' (artículo)."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Después del accidente, el joven fué llevado de inmédiato al hospital.",
            "Después del accidente, el joven fue llevado de inmediato al hospital.",
            "Despues del accidente, el joven fue llevado de inmediato al hospital.",
            "Después del accidente, el joven fue llevado de inmedíato al hospital."
        ],
        correcta: "Después del accidente, el joven fue llevado de inmediato al hospital.",
        justificacion: "'Después' lleva tilde por ser aguda terminada en s. 'Fue' es monosílabo y no lleva tilde. 'Inmediato' es grave terminada en vocal, sin tilde."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Los estudiantes que estudiaron mucho, aprobaron el exámen.",
            "Los estudiantes, que estudiaron mucho aprobaron el examen.",
            "Los estudiantes que estudiaron mucho aprobaron el examen.",
            "Los estudiantes que estudiaron mucho, aprobaron el examen."
        ],
        correcta: "Los estudiantes que estudiaron mucho aprobaron el examen.",
        justificacion: "No se debe separar el sujeto ('Los estudiantes que estudiaron mucho') del verbo ('aprobaron') con una coma. 'Examen' es grave terminada en n, no lleva tilde (su plural 'exámenes' sí)."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Es por eso, que debemos actuar ahora mismo.",
            "Es por eso que debemos actuar ahora mísmo.",
            "Es, por eso, que debemos actuar ahora mismo.",
            "Es por eso que debemos actuar ahora mismo."
        ],
        correcta: "Es por eso que debemos actuar ahora mismo.",
        justificacion: "La coma entre 'eso' y 'que' es incorrecta (separa elementos inseparables de la perífrasis). 'Mismo' es grave y no lleva tilde."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Iremos al concierto; sin embargo, no tenemos las entradas todavía.",
            "Iremos al concierto, sin embargo no tenemos las entradas todavía.",
            "Iremos al concierto; sin embargo no tenemos las entradas todavia.",
            "Iremos al concierto sin embargo, no tenemos las entradas todavía."
        ],
        correcta: "Iremos al concierto; sin embargo, no tenemos las entradas todavía.",
        justificacion: "El conector 'sin embargo' entre dos cláusulas se precede de punto y coma (o coma) y va seguido obligatoriamente de coma. 'Todavía' lleva tilde por hiato."
    },

    // SINÓNIMOS EN CONTEXTO (Nuevas)
    {
        area: "Razonamiento Verbal",
        tema: "Sinónimos en Contexto",
        tipo: "opcion_multiple",
        pregunta: "El orador mostró una actitud PUGNAZ durante todo el debate, atacando las ideas de su oponente.",
        opciones: ["conciliadora", "belicosa", "pasiva", "elocuente"],
        correcta: "belicosa",
        justificacion: "Pugnaz significa inclinado a la lucha o al enfrentamiento, su sinónimo directo es belicoso."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Sinónimos en Contexto",
        tipo: "opcion_multiple",
        pregunta: "El proyecto fracasó debido a la INDOLENCIA de los trabajadores encargados.",
        opciones: ["incompetencia", "pereza", "corrupción", "ausencia"],
        correcta: "pereza",
        justificacion: "La indolencia es la falta de voluntad, la apatía o pereza frente a las obligaciones."
    },

    // COMPLETACIÓN DE ORACIONES (Nuevas)
    {
        area: "Razonamiento Verbal",
        tema: "Completación de Oraciones",
        tipo: "opcion_multiple",
        pregunta: "El avance de la tecnología médica ha sido tan _____ que enfermedades antes incurables hoy tienen un tratamiento _____.",
        opciones: ["lento - costoso", "vertiginoso - eficaz", "limitado - paliativo", "impredecible - dudoso"],
        correcta: "vertiginoso - eficaz",
        justificacion: "Si enfermedades antes incurables hoy se tratan, el avance debe ser 'vertiginoso' o rápido, y el tratamiento 'eficaz'."
    },

    // ANALOGÍAS (Nuevas)
    {
        area: "Razonamiento Verbal",
        tema: "Analogías y Relaciones Semánticas",
        tipo: "opcion_multiple",
        pregunta: "ASTRÓNOMO : TELESCOPIO",
        opciones: ["biólogo : probeta", "médico : fonendoscopio", "arquitecto : edificio", "filósofo : libro"],
        correcta: "médico : fonendoscopio",
        justificacion: "Relación sujeto : instrumento principal de observación/diagnóstico."
    },

    // MATEMÁTICA / RAZONAMIENTO (Nuevas)
    {
        area: "Razonamiento Lógico",
        tema: "Resolución de Problemas",
        tipo: "opcion_multiple",
        pregunta: "Tres socios, A, B y C, invierten en un negocio en la proporción de 3, 5 y 7. Si el negocio generó una ganancia total de 45.000 bolívares, ¿cuánto le corresponde al socio B?",
        opciones: ["9.000", "15.000", "21.000", "18.000"],
        correcta: "15.000",
        justificacion: "3k + 5k + 7k = 15k = 45000 -> k = 3000. Al socio B (5) le tocan 5 * 3000 = 15.000."
    }
];

const dbPath = 'preguntas.json';
let preguntas = [];
if (fs.existsSync(dbPath)) {
    preguntas = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

const maxId = preguntas.length > 0 ? Math.max(...preguntas.map(p => p.id || 0)) : 0;

extractAndGenerate.forEach((p, i) => {
    p.id = maxId + i + 1;
    // Si NO es comparación ortográfica, mezclamos las opciones para la UI (como hace el generador base)
    // Pero como la base guarda el array `opciones` directo, simplemente lo guardamos tal cual
});

preguntas.push(...extractAndGenerate);

fs.writeFileSync(dbPath, JSON.stringify(preguntas, null, 2), 'utf8');

console.log(`✅ ${extractAndGenerate.length} preguntas añadidas (mezcla de las del archivo y generadas nuevas).`);
console.log(`📊 Total del banco: ${preguntas.length} preguntas.`);
