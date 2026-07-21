/**
 * Generador de preguntas de tipo "Comparación Ortográfica" para el SIMADI.
 * En este tipo de ejercicio, se presentan 4 versiones casi idénticas de una oración
 * donde cambia una tilde, una coma, una letra, una mayúscula o una palabra.
 * El estudiante debe identificar cuál versión está CORRECTAMENTE escrita.
 *
 * Categorías cubiertas:
 *  - Acentuación (tildes en pronombres, verbos, adverbios)
 *  - Uso de comas (explicativas, enumerativas, vocativo)
 *  - Homófonos y parónimos (haber/a ver, echo/hecho, hay/ahí/ay)
 *  - Confusión b/v, g/j, ll/y
 *  - Mayúsculas y minúsculas
 */

const fs = require('fs');

const nuevasPreguntas = [
    // ==================== ACENTUACIÓN ====================
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Tu eres el mejor estudiante de la clase.",
            "Tú eres el mejor estudiante de la clase.",
            "Tu érés el mejor estudiante de la clase.",
            "Tú eréS el mejor estudiante de la clase."
        ],
        correcta: "Tú eres el mejor estudiante de la clase.",
        justificacion: "'Tú' es el pronombre personal de segunda persona y siempre lleva tilde para diferenciarse del posesivo 'tu' (tu libro)."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "El se quedó en casa mientras yo salía.",
            "Él se quedó en casa mientras yo salía.",
            "Él se quedó en casa mientras yo salia.",
            "El se quedó en casa mientras yo salia."
        ],
        correcta: "Él se quedó en casa mientras yo salía.",
        justificacion: "'Él' (pronombre personal) lleva tilde para diferenciarse del artículo 'el' (el gato). 'Salía' también lleva tilde por ser un esdrújulo verbal en pretérito imperfecto."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "No sé si podrás venir mas tarde.",
            "No se si podrás venir más tarde.",
            "No sé si podrás venir más tarde.",
            "No se si podras venir más tarde."
        ],
        correcta: "No sé si podrás venir más tarde.",
        justificacion: "'Sé' (del verbo saber) lleva tilde para diferenciarse del pronombre reflexivo 'se'. 'Más' (adverbio de cantidad) lleva tilde para diferenciarse de la conjunción adversativa 'mas' (pero)."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Aún no ha llegado el tren, aunque llamó hace rato.",
            "Aun no ha llegado el tren, aunque llamó hace rato.",
            "Aún no ha llegado el tren, aunque llamo hace rato.",
            "Aun no ha llegado el tren, aunque llamo hace rato."
        ],
        correcta: "Aún no ha llegado el tren, aunque llamó hace rato.",
        justificacion: "'Aún' (con tilde) equivale a 'todavía' y es un adverbio de tiempo. 'Llamó' lleva tilde en la ó porque es una forma verbal en pretérito indefinido."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Dé ese libro al niño para que lo lea.",
            "De ese libro al niño para que lo lea.",
            "Dé ese libro al niño para que lo léa.",
            "De ese libro al nino para que lo lea."
        ],
        correcta: "Dé ese libro al niño para que lo lea.",
        justificacion: "'Dé' es el modo imperativo del verbo 'dar' y lleva tilde para diferenciarse de la preposición 'de'. 'Niño' lleva la tilde en la ñ que forma parte del grafema, no es error ortográfico."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Esta mañana vi que ésta silla estaba rota.",
            "Esta mañana vi que esta silla estaba rota.",
            "Ésta mañana vi que esta silla estaba rota.",
            "Esta mañana ví que esta silla estaba rota."
        ],
        correcta: "Esta mañana vi que esta silla estaba rota.",
        justificacion: "Según la RAE (desde 2010), los demostrativos 'este, esta, esto...' NO llevan tilde aunque sean pronombres. 'Vi' tampoco lleva tilde por ser monosílabo."
    },

    // ==================== USO DE COMAS ====================
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Mi hermana que vive en Caracas, nos visitará mañana.",
            "Mi hermana, que vive en Caracas nos visitará mañana.",
            "Mi hermana, que vive en Caracas, nos visitará mañana.",
            "Mi hermana que vive en Caracas nos visitará mañana."
        ],
        correcta: "Mi hermana, que vive en Caracas, nos visitará mañana.",
        justificacion: "La oración subordinada adjetiva explicativa 'que vive en Caracas' debe ir entre comas porque da información adicional (no restrictiva) sobre 'mi hermana'."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Carlos, trae el cuaderno por favor.",
            "Carlos trae el cuaderno, por favor.",
            "Carlos, trae el cuaderno, por favor.",
            "Carlos trae el cuaderno por favor."
        ],
        correcta: "Carlos, trae el cuaderno, por favor.",
        justificacion: "Cuando se llama a alguien por su nombre (vocativo), se separa con coma del resto de la oración. 'Por favor' al final también se aísla con coma cuando va pospuesto."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Compré manzanas, peras naranjas y uvas.",
            "Compré manzanas peras, naranjas y uvas.",
            "Compré manzanas, peras, naranjas y uvas.",
            "Compré manzanas, peras, naranjas, y uvas."
        ],
        correcta: "Compré manzanas, peras, naranjas y uvas.",
        justificacion: "En enumeraciones, se coloca coma entre todos los elementos excepto antes de la última conjunción 'y' (salvo que esta 'y' tenga valor adversativo, lo cual no aplica aquí)."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Sin embargo la situación no mejoró.",
            "Sin embargo, la situación no mejoró.",
            "Sin, embargo la situación no mejoró.",
            "Sin embargo la situacion, no mejoró."
        ],
        correcta: "Sin embargo, la situación no mejoró.",
        justificacion: "Los conectores discursivos como 'sin embargo', 'no obstante', 'por tanto', 'es decir', cuando van al inicio de la oración, siempre se separan del resto con una coma."
    },

    // ==================== HOMÓFONOS ====================
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Voy a ver si haber algo en el refrigerador.",
            "Voy a haber si a ver algo en el refrigerador.",
            "Voy a ver si hay algo en el refrigerador.",
            "Voy haber si ay algo en el refrigerador."
        ],
        correcta: "Voy a ver si hay algo en el refrigerador.",
        justificacion: "'A ver' (preposición + infinitivo) expresa finalidad o intención. 'Hay' es la forma impersonal del verbo haber (existir). 'Haber' es el infinitivo del verbo auxiliar/impersonal, no se usa en este contexto."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Echo de menos a mi familia cuando viajo.",
            "Hecho de menos a mi familia cuando viajo.",
            "Eso que echo de menos, ya lo hecho.",
            "Hecho de menos a mi familia, pero ya lo he echo."
        ],
        correcta: "Echo de menos a mi familia cuando viajo.",
        justificacion: "'Echo' (1ª persona del presente de indicativo del verbo 'echar') es la forma correcta para 'echar de menos' (extrañar). 'Hecho' es el participio del verbo 'hacer'."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "¡Ay! Me duele la rodilla, está allí en el suelo.",
            "¡Ay! Me duele la rodilla, esta ahí en el suelo.",
            "¡Ay! Me duele la rodilla, está ahí en el suelo.",
            "¡Hay! Me duele la rodilla, esta ahí en el suelo."
        ],
        correcta: "¡Ay! Me duele la rodilla, está ahí en el suelo.",
        justificacion: "'¡Ay!' es una interjección de dolor. 'Está' (verbo estar) lleva tilde para diferenciarse de 'esta' (demostrativo). 'Ahí' (adverbio de lugar) indica proximidad al oyente y lleva tilde por ser aguda terminada en vocal."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "El barco tubo una avería grave en alta mar.",
            "El barco tuvo una avería grave en alta mar.",
            "El barco tubó una avería grave en alta mar.",
            "El barco tuvo una abería grave en alta mar."
        ],
        correcta: "El barco tuvo una avería grave en alta mar.",
        justificacion: "'Tuvo' (pretérito indefinido del verbo 'tener') se escribe con 'v' de vida. 'Avería' también se escribe con 'v'. 'Tubo' es un sustantivo (objeto cilíndrico hueco), no el verbo tener."
    },

    // ==================== B/V ====================
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "La baca de la vaca produce leche.",
            "La vaca de la vaca produce leche.",
            "La vaca produce leche de buena calidad.",
            "La baca produce leche de buena calidad."
        ],
        correcta: "La vaca produce leche de buena calidad.",
        justificacion: "'Vaca' (el animal) se escribe con 'v'. 'Baca' (portaequipajes del coche) es un sustantivo diferente. Las otras opciones mezclan incorrectamente las dos palabras."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Havía mucha gente en la plaza cuando llegamos.",
            "Había mucha gente en la plaza cuando llegamos.",
            "Habia mucha gente en la plaza cuando llegamos.",
            "Havía mucha jente en la plaza cuando llegamos."
        ],
        correcta: "Había mucha gente en la plaza cuando llegamos.",
        justificacion: "'Había' (pretérito imperfecto de indicativo del verbo 'haber') se escribe con 'b'. Regla: los imperfectos de los verbos terminados en -er/-ir se escriben con 'b' (-ía, -ías, -ía, -íamos, -íais, -ían)."
    },

    // ==================== G/J ====================
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "El gerente gestionó la queja con eficiencia.",
            "El jerente gestionó la queja con eficiencia.",
            "El gerente jestionó la queja con eficiencia.",
            "El jerente jestionó la queja con eficiencia."
        ],
        correcta: "El gerente gestionó la queja con eficiencia.",
        justificacion: "'Gerente' y 'gestión/gestionó' se escriben con 'g'. Regla: el prefijo 'gest-' (del latín gestus) siempre usa 'g'. 'Queja' sí se escribe con 'j'."
    },

    // ==================== LL/Y ====================
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Ella se cayó porque el piso estaba mojado.",
            "Ella se cayó porque el piso estaba mojado.",
            "Ella se yayó porque el piso estaba mojado.",
            "Eya se cayó porque el piso estaba mojado."
        ],
        correcta: "Ella se cayó porque el piso estaba mojado.",
        justificacion: "'Ella' (pronombre) se escribe con 'll'. 'Cayó' (pretérito indefinido de 'caer') se escribe con 'y' porque los verbos cuya raíz termina en vocal forman el gerundio y el pretérito con 'y' (caer → cayó, creer → creyó)."
    },

    // ==================== MAYÚSCULAS ====================
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "El presidente de Venezuela visitó París.",
            "El Presidente de Venezuela visitó París.",
            "El presidente de Venezuela visitó paris.",
            "El presidente de venezuela visitó París."
        ],
        correcta: "El presidente de Venezuela visitó París.",
        justificacion: "Los títulos como 'presidente' se escriben en minúscula a menos que acompañen al nombre propio (Presidente Maduro). Los nombres de países (Venezuela) y ciudades (París) siempre van con mayúscula inicial."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Estudié Medicina en la Universidad central de Venezuela.",
            "Estudié medicina en la Universidad Central de Venezuela.",
            "Estudié medicina en la universidad central de venezuela.",
            "Estudié Medicina en la Universidad Central de Venezuela."
        ],
        correcta: "Estudié medicina en la Universidad Central de Venezuela.",
        justificacion: "Los nombres propios de instituciones llevan mayúscula en cada palabra sustantiva (Universidad Central de Venezuela). El nombre de la carrera o disciplina ('medicina') va en minúscula salvo que sea acrónimo."
    },

    // ==================== PALABRAS JUNTAS/SEPARADAS ====================
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "A ver si puedo terminar el trabajo a tiempo.",
            "Aver si puedo terminar el trabajo a tiempo.",
            "A ver si puedo terminar el trabajo atiempo.",
            "Aver si puedo terminar el trabajo atiempo."
        ],
        correcta: "A ver si puedo terminar el trabajo a tiempo.",
        justificacion: "'A ver' (preposición + infinitivo, aquí con valor de 'veamos') se escribe siempre separado. 'A tiempo' (locución adverbial) también se escribe separado."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Por qué no viniste a la reunión de ayer?",
            "¿Porque no viniste a la reunión de ayer?",
            "¿Por qué no viniste a la reunión de ayer?",
            "¿Porqué no viniste a la reunión de ayer?"
        ],
        correcta: "¿Por qué no viniste a la reunión de ayer?",
        justificacion: "'Por qué' en oraciones interrogativas directas e indirectas se escribe en dos palabras y con tilde. 'Porque' (junto, sin tilde) es la conjunción causal. 'Porqué' (junto, con tilde) es el sustantivo (el porqué de algo)."
    },

    // ==================== PUNTUACIÓN COMPLEJA ====================
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "El examen fue difícil; sin embargo todos aprobaron.",
            "El examen fue difícil, sin embargo todos aprobaron.",
            "El examen fue difícil; sin embargo, todos aprobaron.",
            "El examen fue difícil sin embargo, todos aprobaron."
        ],
        correcta: "El examen fue difícil; sin embargo, todos aprobaron.",
        justificacion: "Cuando 'sin embargo' conecta dos oraciones independientes, se usa punto y coma (;) antes y coma (,) después. La coma sola antes de 'sin embargo' es aceptable pero la opción con punto y coma es más correcta formalmente."
    },
    {
        area: "Razonamiento Verbal",
        tema: "Corrección Ortográfica",
        tipo: "comparacion_ortografica",
        pregunta: "¿Cuál de las siguientes oraciones está correctamente escrita?",
        opciones: [
            "Querida mamá: te escribo para contarte mis aventuras.",
            "Querida mamá, te escribo para contarte mis aventuras.",
            "Querida mamá; te escribo para contarte mis aventuras.",
            "Querida mamá te escribo, para contarte mis aventuras."
        ],
        correcta: "Querida mamá: te escribo para contarte mis aventuras.",
        justificacion: "En cartas y escritos formales, el saludo (vocativo) se separa del cuerpo del texto mediante dos puntos (:), no coma. Esta es una convención epistolar del español."
    }
];

// Cargar el banco actual
const preguntas = JSON.parse(fs.readFileSync('preguntas.json', 'utf8'));
const maxId = Math.max(...preguntas.map(p => p.id || 0));

// Asignar IDs y mezclar las opciones
nuevasPreguntas.forEach((p, i) => {
    p.id = maxId + i + 1;
    // Guardar las opciones en orden original (no mezclar para este tipo, ya que el orden importa)
});

const total = preguntas.length + nuevasPreguntas.length;
preguntas.push(...nuevasPreguntas);

fs.writeFileSync('preguntas.json', JSON.stringify(preguntas, null, 2), 'utf8');
console.log(`✅ ${nuevasPreguntas.length} preguntas de Corrección Ortográfica añadidas.`);
console.log(`📊 Total del banco: ${total} preguntas.`);
console.log(`🆔 IDs del ${maxId + 1} al ${maxId + nuevasPreguntas.length}`);
