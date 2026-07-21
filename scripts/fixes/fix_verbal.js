const fs = require('fs');

const db = JSON.parse(fs.readFileSync('preguntas.json', 'utf8'));

const textoColon = `RELATO DE CRISTÓBAL EL DESVENTURADO
Hay un día en que colón es el hombre más feliz del universo. Es el día en que por primera vez sus ojos ven y tocan sus manos la tierra del Nuevo Mundo. Hasta la víspera, muchos le tenían por un loco: ahora ven que es el hombre que tenía razón. Pero él, que antes había razonado con serenidad y firmeza, pierde el juicio de alegría. Cosa singular: en la contradictoria balanza de su vida, así que va cumpliéndose lo esencial de su teoría —que navegando hacia el occidente puede llegarse al oriente—, Colón va hundiéndose en un mar de confusiones. Su juventud está terminada. Acaba por negar su propia ciencia, y en sus horas de desesperación se abraza a los potros de la fábula. No hay sino una raya de luz en su vida: el 12 de octubre de 1492.

La presencia del Nuevo Mundo se anuncia en los aires, en las aguas, en las nubes. Del 7 al 11 de octubre, la tierra no se ve, y ya se siente: se presiente. El 7 La Niña, que va adelante —claro: La Niña—, grita: «¡Albricias!», enarbola bandera en el mástil, tira lombarda. Se ha equivocado. No es tierra: es una nube. No importa: todos afinan el ojo, madrugan. El Almirante siente que hay un perfume en el aire. Olor de monte que anuncia siempre las costas antillanas. «Los aires son muy dulces, como en abril en Sevilla». Lunes 8: se ven muchos pajaritos del campo. Martes 9: toda la noche oímos pasar pájaros. Miércoles 10: la gente ya no lo puede sufrir. Jueves 11: una caña, un palo, yerba que nace en tierra, ¡una tablilla! Respiran y alégrense todos. Aún no se ve tierra.

Desde el castillo de proa, los ojos de Colón se esfuerzan en taladrar un horizonte de tiniebla. Le parece ver una lucecilla. No dice nada: no quiere hacer el iluso. Pero coge del brazo a Pedro Gutiérrez, un repostero: «¿Ves una lucecilla?». Él, Pedro cree verla. Trae a Rodrigo Sánchez, el veedor: «¿Ves la lucecilla?». El Rodrigo no ve nada. Todo sigue en silencio: muchos hablan con las estrellas. A las dos de la madrugada La Pinta da el grito. Rodrigo de Triana ha visto tierra. Nadie puede dormir ya. Amainan velas. Ahí está el Nuevo Mundo. Los noventa de la aventura ven teñirse de rosa la campaña de oriente.
German Arciniegas`;

const textoCasas = `CASAS MUERTAS: EL ENTIERRO DE SEBASTIÁN
Esa mañana enterraron a Sebastián. El padre Pernía, que tanto afecto le profesó, se había puesto la sotana menos zurcida, la de visitar al Obispo, y el manteo y el bonete de las grandes ocasiones. Un entierro no era un acontecimiento inusitado en Ortiz. Por el contrario, ya el tanto arrastrarse de las alpargatas había extinguido definitivamente la hierba del camino que conducía al cementerio y los perros seguían con rutinaria mansedumbre a quienes cargaban la urna o les precedían señalando la ruta mil veces transitada. Pero había muerto Sebastián, cuya presencia fue un brioso pregón de vida en aquella aldea de muertos, y todos comprendían que su caída significaba la rendición plenaria del pueblo entero. Si no logró escapar de la muerte Sebastián, joven como la madrugada, fuerte como el río en invierno, voluntarioso como el toro sin castrar, no quedaba a los otros habitantes de Ortiz sino la resignada espera del acabamiento.

Al frente del cortejo marchaba Nicanor, el monaguillo, sosteniendo el crucifijo en alto, entre dos muchachos más pequeños y armados de elevados candelabros. Luego el padre Pernía, sudando bajo las telas del hábito y el sol del Llano. En seguida los cuatro hombres que cargaban la urna y, finalmente, treinta o cuarenta vecinos de rostros terrosos. El ritmo pausado del entierro se adaptaba fielmente a su caminar de enfermos. Así, paso a paso, arrastrando los pies, encorvando los hombros bajo la presión de un peso inexistente, se les veía transitar a diario por las calles del pueblo, por los campos medio sembrados, por los corredores de las casas.
Miguel Otero Silva`;

const textoGobierno = `Personas y Gobiernos Controladores
Es un síntoma de madurez y respeto a los demás no pretender controlar al otro. No hagas a otro lo que no quieres que te hagan a ti es una regla básica de la convivencia civilizada que supone, necesariamente, que nadie puede controlar a los demás hasta anularlos o cosificarlos, ni aceptar que alguien más aliene su libertad. Nadie en sus cabales puede pretender convencer a todos, y aún menos forzarlos a que encajen a la perfección en el diseño que ha modelado en su cabeza según sus principios, sus ideas, necesidades y fines.

Todo el que enfrenta a un controlador está condenado a sufrir la anulación de su individualidad. No podrá mostrarse tal cual es ni trazar su propio proyecto de vida según su propia escala de valores; terminará por perder confianza en sí mismo, porque terminará dependiendo de las decisiones y mandatos del otro; se sentirá ahogado y vigilado en todo momento. Esto conduce inevitablemente, con el tiempo y la mayoría de las veces, al enfrentamiento y la emancipación en búsqueda de la libertad, para así acabar con el yugo del controlador. En muy raras ocasiones acaba en la tragedia de la resignación, sumisión, esclavitud o, en definitiva, cosificación del controlado.`;

// Diagnostic questions to fix
const diagQuestionsFixed = [
  {
    pregunta: "¿Por qué Colón “acaba de negar su propia ciencia”?",
    opciones: ["porque va hundiéndose en un mar de confusiones. Su juventud está terminada.", "porque no hay sino un rayo de luz en su vida el 12 de octubre de 1492.", "porque muchos le tenían como un loco.", "porque por primera vez sus ojos y sus manos, ven y tocan la tierra del Nuevo Mundo."],
    correcta: "porque va hundiéndose en un mar de confusiones. Su juventud está terminada.",
    justificacion: "El texto indica: 'Colón va hundiéndose en un mar de confusiones. Su juventud está terminada. Acaba por negar su propia ciencia'.",
    contexto: textoColon
  },
  {
    pregunta: "¿Cómo perciben que se aproximan a tierra?",
    opciones: ["en “La Niña” que va delante... grita ¡Albricias!", "todos afinan el ojo, madrugan.", "se anuncia en los aires, en las aguas, en las nubes.", "en el olor del monte, se ven muchos pajaritos de campo, en una caña, un palo que nace en la tierra."],
    correcta: "se anuncia en los aires, en las aguas, en las nubes.",
    justificacion: "El texto afirma literalmente: 'La presencia del Nuevo Mundo se anuncia en los aires, en las aguas, en las nubes.'",
    contexto: textoColon
  },
  {
    pregunta: "¿Quién ve por primera vez la luz en las tinieblas de la noche?",
    opciones: ["Rodrigo Sánchez", "Colón", "Rodrigo de Triana", "Pedro Gutiérrez"],
    correcta: "Colón",
    justificacion: "El texto dice: 'los ojos de Colón se esfuerzan en taladrar un horizonte de tiniebla. Le parece ver una lucecilla.'",
    contexto: textoColon
  },
  {
    pregunta: "Indique cuál es la secuencia más completa según el segundo párrafo del relato:",
    opciones: [
      "el 7, “La Niña” que va delante – claro: grita: ¡Albricias! Lunes 8: se ven muchos pajaritos de campo. Martes 9: toda la oímos pasar pájaros. Miércoles 10: la gente ya no lo puede sufrir. Jueves 11: una caña, un palo, yerba que nace en la tierra.",
      "Lunes 8: se ven muchos pajaritos de campo. Martes 9: toda la noche oímos pasar pájaros.",
      "el 7, “La Niña” grita: ¡Albricias! Lunes 8: se ven muchos pajaritos de campo. Martes 9: toda la noche oímos pasar pájaros.",
      "del 7 al 11 de octubre la tierra no se ve ya se siente. Jueves 11: una caña, un palo."
    ],
    correcta: "el 7, “La Niña” que va delante – claro: grita: ¡Albricias! Lunes 8: se ven muchos pajaritos de campo. Martes 9: toda la oímos pasar pájaros. Miércoles 10: la gente ya no lo puede sufrir. Jueves 11: una caña, un palo, yerba que nace en la tierra.",
    justificacion: "Es la cita textual de la secuencia de días descrita en el segundo párrafo.",
    contexto: textoColon
  },
  {
    pregunta: "¿Qué es lo esencial en la teoría de Colón?",
    opciones: [
      "que antes había razonado con serenidad y firmeza.",
      "que navegando hacia el occidente puede llegarse al oriente.",
      "la presencia del Nuevo Mundo que se anuncia en los aires, en las aguas, en las nubes.",
      "sus horas de desesperación que se abraza a los potros de la fábula."
    ],
    correcta: "que navegando hacia el occidente puede llegarse al oriente.",
    justificacion: "El texto menciona: 'cumpliéndose lo esencial de su teoría —que navegando hacia el occidente puede llegarse al oriente—'.",
    contexto: textoColon
  },
  // SEBASTIAN
  {
    pregunta: "La sotana menos zurcida que se había puesto el padre Pernía era:",
    opciones: ["la que tenía sin tanto sucio del tiempo.", "la más nueva.", "la que tenía sin tanto tejido remendado.", "la de color mejor conservado."],
    correcta: "la que tenía sin tanto tejido remendado.",
    justificacion: "'Zurcir' significa coser roturas en la tela. 'Menos zurcida' equivale a menos remendada.",
    contexto: textoCasas
  },
  {
    pregunta: "¿Qué significa la expresión: “un entierro no era acontecimiento inusitado en Ortiz”?",
    opciones: ["que el entierro era un acontecimiento normal en Ortiz.", "que el entierro no era un acontecimiento doloroso en Ortiz.", "que el entierro erra un acontecimiento inesperado en Ortiz.", "que el entierro era un acontecimiento excepcional en Ortiz."],
    correcta: "que el entierro era un acontecimiento normal en Ortiz.",
    justificacion: "'Inusitado' significa inusual o raro. Si no era inusitado, era algo común o normal.",
    contexto: textoCasas
  },
  {
    pregunta: "¿Cómo se caracteriza la presencia de Sebastián en Ortiz?",
    opciones: ["un hombre que se adaptaba fielmente a su caminar de enfermos.", "un brioso pregón de vida en aquella aldea de muertos.", "un joven que sembraba terror en los habitantes.", "un hombre más que llevaban del camino que conducía al cementerio."],
    correcta: "un brioso pregón de vida en aquella aldea de muertos.",
    justificacion: "El texto lo describe textualmente así: 'cuya presencia fue un brioso pregón de vida en aquella aldea de muertos'.",
    contexto: textoCasas
  },
  {
    pregunta: "¿Quiénes marchaban al frente del cortejo de Sebastián?",
    opciones: ["Nicanor, el monaguillo, entre dos muchachos más pequeños y armados de elevados candelabros.", "el padre Pernía.", "los cuatros hombres que cargaban la urna.", "el Obispo."],
    correcta: "Nicanor, el monaguillo, entre dos muchachos más pequeños y armados de elevados candelabros.",
    justificacion: "El texto indica: 'Al frente del cortejo marchaba Nicanor, el monaguillo, sosteniendo el crucifijo en alto, entre dos muchachos...'.",
    contexto: textoCasas
  },
  {
    pregunta: "¿Qué les esperaba a los habitantes de Ortiz después de la muerte de Sebastián?",
    opciones: ["arrastrarse de las alpargatas.", "la resignada espera del acabamiento.", "transitar a diario por las calles del pueblo, por los campos medios sembrados, por los corredores de las casas.", "un acontecimiento inusitado."],
    correcta: "la resignada espera del acabamiento.",
    justificacion: "El texto afirma: 'no quedaba a los otros habitantes de Ortiz sino la resignada espera del acabamiento.'",
    contexto: textoCasas
  },
  // CONTROLADORES
  {
    pregunta: "Indique la palabra que, según el texto, se relaciona con la regla básica de la convivencia civilizada:",
    opciones: ["cosificación.", "respeto.", "control.", "anulación."],
    correcta: "respeto.",
    justificacion: "El texto dice 'Es un síntoma de madurez y respeto a los demás no pretender controlar al otro' y de allí se deriva la regla básica.",
    contexto: textoGobierno
  },
  {
    pregunta: "Al señalar “No hagas a otro lo que no quieres que te hagan a ti”, el autor sugiere:",
    opciones: ["promover el enfrentamiento y la emancipación.", "sufrir la anulación de su individualidad.", "controlar a los demás hasta anularlos.", "permitir trazar un proyecto de vida según su propia escala de valores."],
    correcta: "permitir trazar un proyecto de vida según su propia escala de valores.",
    justificacion: "La regla apoya no alienar la libertad de otro, permitiendo que no sufra anulación y pueda vivir según su escala de valores.",
    contexto: textoGobierno
  },
  {
    pregunta: "Complete la siguiente frase “Nadie en sus cabales puede pretender convencer a todos”:",
    opciones: [
      "que ha modelado en su cabeza según sus principios, sus ideas, necesidades y fines.",
      "y aún menos forzarlos a que encajen a la perfección en el diseño que ha modelado en su cabeza según sus principios, sus ideas, necesidades y fines.",
      "forzarlos a que encajen a la perfección.",
      "aceptar que alguien más aliene su libertad."
    ],
    correcta: "y aún menos forzarlos a que encajen a la perfección en el diseño que ha modelado en su cabeza según sus principios, sus ideas, necesidades y fines.",
    justificacion: "Es la cita textual del primer párrafo que completa la oración.",
    contexto: textoGobierno
  },
  {
    pregunta: "De acuerdo con el texto relacione la palabra controlar con una de las siguientes frases:",
    opciones: ["anulación de su individualidad.", "trazar un proyecto de vida.", "madurez y respeto a los demás.", "regla básica de convivencia."],
    correcta: "anulación de su individualidad.",
    justificacion: "El texto señala: 'Todo el que enfrenta a un controlador está condenado a sufrir la anulación de su individualidad.'",
    contexto: textoGobierno
  },
  {
    pregunta: "El excesivo control a los demás, conduce con el tiempo y la mayoría de las veces a:",
    opciones: ["enfrentamiento y emancipación en búsqueda de la libertad.", "resignación, sumisión, esclavitud.", "perder confianza en sí mismo.", "depender de las decisiones y mandatos de otro."],
    correcta: "enfrentamiento y emancipación en búsqueda de la libertad.",
    justificacion: "El texto indica que la consecuencia más común es: 'Esto conduce inevitablemente, con el tiempo y la mayoría de las veces, al enfrentamiento y la emancipación en búsqueda de la libertad'.",
    contexto: textoGobierno
  }
];

// Reemplazar las 15 preguntas (las preguntas 16 a 30 originales del diagnóstico que tenían el prefijo [Texto ...])
// En add_diagnostico.js fueron insertadas como las últimas 15 verbales del primer bloque de verbales.
// Encontremoslas por el prefijo en su campo pregunta.

let fixIndex = 0;
for (let i = 0; i < db.length; i++) {
  const q = db[i];
  if (q.area === "Razonamiento Verbal" && q.pregunta.startsWith("[Texto")) {
    if (fixIndex < diagQuestionsFixed.length) {
       const fixedData = diagQuestionsFixed[fixIndex];
       q.pregunta = fixedData.pregunta;
       q.opciones = fixedData.opciones;
       q.correcta = fixedData.correcta;
       q.justificacion = fixedData.justificacion;
       q.contexto = fixedData.contexto;
       fixIndex++;
    }
  }
}

fs.writeFileSync('preguntas.json', JSON.stringify(db, null, 2), 'utf8');
console.log('Fixed', fixIndex, 'reading comprehension questions with text and proper options.');
