const fs = require('fs');

const nuevasPreguntas = [];

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// 1. M.C.M Múltiples naves/vehículos
function genMCM() {
    for (let i = 0; i < 20; i++) {
        // Generar 3 o 4 tiempos
        const t1 = Math.floor(Math.random() * 5) + 2;
        const t2 = Math.floor(Math.random() * 5) + 4;
        const t3 = Math.floor(Math.random() * 5) + 6;
        const t4 = Math.floor(Math.random() * 10) + 10;
        
        const ans = lcm(lcm(lcm(t1, t2), t3), t4);
        // Evitar números idénticos
        if (t1 === t2 || t2 === t3 || ans > 1000) continue;

        let distractors = [ans + t1, ans - t2, ans * 2, ans + Math.floor(ans/2)];
        distractors = distractors.filter(d => d !== ans);
        
        let opciones = [ans.toString(), distractors[0].toString(), distractors[1].toString(), distractors[2].toString()];
        opciones = shuffle(opciones);
        
        nuevasPreguntas.push({
            "id": 0,
            "area": "Razonamiento Lógico Numérico",
            "tema": "Teoría de Números (MCM/MCD)",
            "pregunta": `Cuatro naves espaciales giran alrededor de un planeta. Tardan ${t1}, ${t2}, ${t3} y ${t4} días respectivamente en dar una vuelta completa. Si inician simultáneamente, ¿Cuántos días transcurrirán hasta que se vuelvan a encontrar alineados por primera vez?`,
            "opciones": opciones,
            "correcta": ans.toString(),
            "justificacion": `**Concepto Fundamental:** Mínimo Común Múltiplo (M.C.M.). Se utiliza para calcular coincidencias en el tiempo de eventos periódicos simultáneos.\n\n**Resolución:** Debemos calcular el M.C.M. de los tiempos. Los tiempos son ${t1}, ${t2}, ${t3} y ${t4}. Al descomponer en factores primos y tomar comunes y no comunes con mayor exponente, el M.C.M. es ${ans}. Por lo tanto, coincidirán en ${ans} días.`
        });
    }
}

// 2. Regla de Tres Compuesta
function genReglaTres() {
    // Para hacer Om de obra, H hombres trabajaron D días, Hr horas/día.
    // ¿Cuántos días (x) de h2 horas necesitan H2 obreros para O2 metros?
    // x = (H * D * Hr * O2) / (H2 * h2 * O)
    for (let i = 0; i < 20; i++) {
        let H = Math.floor(Math.random() * 20) + 10;
        let D = Math.floor(Math.random() * 10) + 5;
        let Hr = Math.floor(Math.random() * 4) + 6;
        let O = Math.floor(Math.random() * 5) * 100 + 300;

        let H2 = Math.floor(Math.random() * 20) + 15;
        let h2 = Math.floor(Math.random() * 4) + 5;
        let O2 = Math.floor(Math.random() * 5) * 100 + 400;

        let x = (H * D * Hr * O2) / (H2 * h2 * O);
        
        // Solo guardar si x es entero
        if (Number.isInteger(x) && x > 0 && x < 200) {
            let distractors = [x + 2, Math.abs(x - 3) || 1, x + 5, x * 2];
            let opciones = [x.toString(), distractors[0].toString(), distractors[1].toString(), distractors[2].toString()];
            opciones = shuffle(opciones);

            nuevasPreguntas.push({
                "id": 0,
                "area": "Razonamiento Lógico Numérico",
                "tema": "Regla de Tres y Proporciones",
                "pregunta": `Para hacer ${O}m de una obra, ${H} obreros trabajaron ${D} días a razón de ${Hr} h/día. ¿Cuántos días de ${h2} h/día necesitarán ${H2} obreros para realizar ${O2}m de la misma obra?`,
                "opciones": opciones,
                "correcta": x.toString(),
                "justificacion": `**Concepto Fundamental:** Regla de Tres Compuesta. Relacionamos la incógnita (Días) con el resto: Hombres (Inversa, a más hombres menos días), Horas/día (Inversa), Obra (Directa, a más obra más días).\n\n**Resolución:** Usando el método de los signos (+ arriba y - abajo para la incógnita; para inversa: + menor, - mayor; para directa: - menor, + mayor). Al plantear y despejar obtenemos: x = (${H} * ${D} * ${Hr} * ${O2}) / (${H2} * ${h2} * ${O}) = ${x} días.`
            });
        }
    }
}

// 3. Progresiones Geométricas
function genProgresionGeometrica() {
    for (let i = 0; i < 20; i++) {
        let a1 = Math.floor(Math.random() * 4) + 2;
        let r = Math.floor(Math.random() * 3) + 2; // Razón 2 o 3 o 4
        let n = Math.floor(Math.random() * 4) + 6; // 6to a 9no término
        
        let ans = a1 * Math.pow(r, n - 1);
        let a2 = a1 * r;
        let a3 = a2 * r;
        let a4 = a3 * r;

        let distractors = [ans * r, a1 * Math.pow(r, n), ans / r, ans + a1];
        let opciones = [ans.toString(), distractors[0].toString(), distractors[1].toString(), distractors[2].toString()];
        opciones = shuffle(opciones);

        nuevasPreguntas.push({
            "id": 0,
            "area": "Razonamiento Lógico Numérico",
            "tema": "Sucesiones",
            "pregunta": `Hallar el ${n}° término de la sucesión geométrica: ${a1}, ${a2}, ${a3}, ${a4}...`,
            "opciones": opciones,
            "correcta": ans.toString(),
            "justificacion": `**Concepto Fundamental:** Progresión Geométrica. El término general se calcula como a_n = a_1 * r^(n-1).\n\n**Resolución:** Observamos que la sucesión multiplica cada término por una razón r = ${r}. El primer término es a_1 = ${a1}. Aplicando la fórmula para n = ${n}: a_${n} = ${a1} * ${r}^(${n}-1) = ${a1} * ${Math.pow(r, n-1)} = ${ans}.`
        });
    }
}

// 4. Inecuaciones y Edades
function genInecuacionesEdades() {
    for (let i = 0; i < 20; i++) {
        let n = Math.floor(Math.random() * 5) + 3; // "n años menos"
        let sumaMinima = Math.floor(Math.random() * 10) + 25; // "suman más de X"
        
        // Maria tiene N años menos que el doble de Julia (2x - N)
        // x + 2x - N > sumaMinima => 3x > sumaMinima + N
        
        let opciones = [
            `x > ${(sumaMinima + n)}/3`,
            `x < ${(sumaMinima + n)}/3`,
            `x > ${(sumaMinima - n)}/3`,
            `x < ${(sumaMinima - n)}/3`
        ];
        
        let correctStr = `x > ${(sumaMinima + n)}/3`;
        if ((sumaMinima + n) % 3 === 0) {
            correctStr = `x > ${(sumaMinima + n)/3}`;
            opciones = [
                `x > ${(sumaMinima + n)/3}`,
                `x < ${(sumaMinima + n)/3}`,
                `x > ${(sumaMinima - n)/3}`,
                `x < ${(sumaMinima - n)/3}`
            ];
        }

        opciones = shuffle([...new Set(opciones)]);
        if (opciones.length < 4) {
            opciones.push(`x = ${(sumaMinima + n)/3}`);
        }

        nuevasPreguntas.push({
            "id": 0,
            "area": "Razonamiento Lógico Numérico",
            "tema": "Modelaje Algebraico e Inecuaciones",
            "pregunta": `María tiene ${n} años menos que el doble de la edad de Julia. Se sabe que ambas edades suman estrictamente más de ${sumaMinima} años. Si 'x' es la edad de Julia, ¿cómo se expresa el dominio de edad de Julia matemáticamente?`,
            "opciones": opciones.slice(0,4),
            "correcta": correctStr,
            "justificacion": `**Concepto Fundamental:** Modelaje de Inecuaciones. A diferencia de las ecuaciones, las inecuaciones requieren respetar el sentido de la desigualdad (mayor, menor, mayor o igual).\n\n**Resolución:** Sea la edad de Julia = x. La edad de María = 2x - ${n}. La suma es (x) + (2x - ${n}) > ${sumaMinima}. Resolviendo: 3x - ${n} > ${sumaMinima} => 3x > ${sumaMinima + n} => ${correctStr}.`
        });
    }
}

while(nuevasPreguntas.length < 80) {
    genMCM();
    genReglaTres();
    genProgresionGeometrica();
    genInecuacionesEdades();
}

const finalQuestions = nuevasPreguntas.slice(0, 100);
fs.writeFileSync('preguntas_nuevas_avanzado.json', JSON.stringify(finalQuestions, null, 2), 'utf8');
console.log(`Generadas ${finalQuestions.length} preguntas matemáticas avanzadas en preguntas_nuevas_avanzado.json.`);
