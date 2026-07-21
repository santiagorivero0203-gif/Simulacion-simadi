const fs = require('fs');

const preguntas = JSON.parse(fs.readFileSync('preguntas.json', 'utf8'));

const texto1 = `Colón va hundiéndose en un mar de confusiones. Su juventud está terminada. Acaba por negar su propia ciencia, cumpliéndose lo esencial de su teoría —que navegando hacia el occidente puede llegarse al oriente—. La presencia del Nuevo Mundo se anuncia en los aires, en las aguas, en las nubes. La secuencia de aquellos días fue: el 7, “La Niña” que va delante – claro: grita: ¡Albricias! Lunes 8: se ven muchos pajaritos de campo. Martes 9: toda la noche oímos pasar pájaros. Miércoles 10: la gente ya no lo puede sufrir. Jueves 11: una caña, un palo, yerba que nace en la tierra. Esa misma noche, los ojos de Colón se esfuerzan en taladrar un horizonte de tiniebla. Le parece ver una lucecilla.`;

const texto2 = `Un entierro no era acontecimiento inusitado en Ortiz, pero este era diferente. Se trataba de Sebastián, cuya presencia fue un brioso pregón de vida en aquella aldea de muertos. Al frente del cortejo marchaba Nicanor, el monaguillo, sosteniendo el crucifijo en alto, entre dos muchachos más pequeños y armados de elevados candelabros. Le seguía el padre Pernía, ataviado con la sotana menos zurcida que tenía, la que conservaba sin tanto tejido remendado. Tras la urna, no quedaba a los otros habitantes de Ortiz sino la resignada espera del acabamiento.`;

const texto3 = `Nadie en sus cabales puede pretender convencer a todos, y aún menos forzarlos a que encajen a la perfección en el diseño que ha modelado en su cabeza según sus principios, sus ideas, necesidades y fines. Es un síntoma de madurez y respeto a los demás no pretender controlar al otro. La regla básica señala 'No hagas a otro lo que no quieres que te hagan a ti', lo cual sugiere permitir trazar un proyecto de vida según su propia escala de valores. Todo el que enfrenta a un controlador está condenado a sufrir la anulación de su individualidad. Esto conduce inevitablemente, con el tiempo y la mayoría de las veces, al enfrentamiento y la emancipación en búsqueda de la libertad.`;

let modificadas = 0;

preguntas.forEach(q => {
    if (q.id >= 969 && q.id <= 973) {
        q.contexto = texto1;
        modificadas++;
    } else if (q.id >= 974 && q.id <= 978) {
        q.contexto = texto2;
        modificadas++;
    } else if (q.id >= 979 && q.id <= 983) {
        q.contexto = texto3;
        modificadas++;
    }
});

fs.writeFileSync('preguntas.json', JSON.stringify(preguntas, null, 2), 'utf8');

console.log(`Se ha añadido el contexto a ${modificadas} preguntas (IDs 969-983).`);
