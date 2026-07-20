const fs = require('fs');

const bank = [];
let idCounter = 1;

// Utilidades
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const mcd = (a, b) => b === 0 ? a : mcd(b, a % b);
const mcm = (a, b) => (a * b) / mcd(a, b);
const mcmArray = (arr) => arr.reduce((acc, val) => mcm(acc, val), 1);
const mcdArray = (arr) => arr.reduce((acc, val) => mcd(acc, val));

function addQuestion(pregunta, opciones, correcta, justificacion) {
    // Mezclamos opciones para que la correcta no esté siempre en la misma posición visual
    // (Aunque la app también lo mezcla, es buena práctica)
    bank.push({
        id: idCounter++,
        area: "Razonamiento Lógico Numérico",
        pregunta,
        opciones,
        correcta: correcta.toString(),
        justificacion
    });
}

// 1. Generador M.C.M (Coincidencias en el tiempo)
function generarMCM() {
    for (let i = 0; i < 35; i++) {
        let t1 = randomInt(2, 8);
        let t2 = randomInt(4, 12);
        let t3 = randomInt(5, 15);
        if (t1 === t2 || t2 === t3 || t1 === t3) t2 += 1;
        
        let res = mcmArray([t1, t2, t3]);
        while (res > 500) { // Keep it reasonable
            t1 = randomInt(2, 5); t2 = randomInt(3, 7); t3 = randomInt(4, 8);
            res = mcmArray([t1, t2, t3]);
        }

        const opciones = [res, res + randomInt(2, 10), Math.abs(res - randomInt(1, 10)) || 1, res * 2].map(String);
        const obj = "naves giran alrededor de un planeta";
        const pregunta = `Tres ${obj}. Tardan ${t1}, ${t2} y ${t3} días respectivamente en dar una vuelta. ¿Cuántos días transcurrirán hasta que se vuelvan a encontrar por primera vez?`;
        const just = `Problema de coincidencia en el tiempo (M.C.M.). Descomponiendo: M.C.M(${t1}, ${t2}, ${t3}) = ${res} días.`;
        addQuestion(pregunta, opciones, res, just);
    }
}

// 2. Generador M.C.D (Cortar/Repartir mayor tamaño posible)
function generarMCD() {
    for (let i = 0; i < 35; i++) {
        let factor = randomInt(5, 20);
        let c1 = randomInt(2, 6) * factor;
        let c2 = randomInt(3, 8) * factor;
        let c3 = randomInt(4, 10) * factor;
        if (c1 === c2) c2 += factor;
        
        let res = mcdArray([c1, c2, c3]);
        const opciones = [res, res + 5, Math.abs(res - 2) || 1, res * 2].map(String);
        const pregunta = `Un carpintero tiene tres tablas de madera de ${c1} cm, ${c2} cm y ${c3} cm. Desea cortarlas en trozos del mayor tamaño posible sin que sobre madera, y todos de la misma longitud. ¿Cuánto debe medir cada trozo?`;
        const just = `Se requiere cortar en el mayor tamaño posible: M.C.D. M.C.D(${c1}, ${c2}, ${c3}) = ${res} cm.`;
        addQuestion(pregunta, opciones, res, just);
    }
}

// 3. Regla de Tres Compuesta (Inversa/Directa)
function generarReglaTres() {
    for (let i = 0; i < 35; i++) {
        // Obreros * Dias * Horas = constante (obra 1)
        let o1 = randomInt(10, 30);
        let d1 = randomInt(10, 20);
        let h1 = randomInt(6, 10);
        
        let d2 = randomInt(5, 15);
        let h2 = randomInt(5, 12);
        
        // Hacemos que la división sea exacta
        let total = o1 * d1 * h1;
        let o2 = Math.floor(total / (d2 * h2));
        
        // Si no es exacto, ajustamos para que o2 sea exacto (trampa matematica)
        while (total % (d2 * h2) !== 0) {
            d2 = randomInt(5, 15);
            h2 = randomInt(5, 12);
            o2 = Math.floor(total / (d2 * h2));
        }

        const opciones = [o2, o2 + 2, Math.abs(o2 - 4) || 1, o2 * 2].map(String);
        const pregunta = `Para realizar una obra, ${o1} obreros tardan ${d1} días trabajando ${h1} horas diarias. Si se desea terminar el trabajo en ${d2} días trabajando ${h2} horas diarias, ¿cuántos obreros se necesitarán?`;
        const just = `Regla de tres compuesta. Obreros vs Días (Inversa), Obreros vs Horas (Inversa). X = (${o1} × ${d1} × ${h1}) / (${d2} × ${h2}) = ${total} / ${d2*h2} = ${o2} obreros.`;
        addQuestion(pregunta, opciones, o2, just);
    }
}

// 4. Porcentajes (Descuentos Sucesivos)
function generarPorcentajes() {
    for (let i = 0; i < 35; i++) {
        let precio = randomInt(2, 20) * 100;
        let d1 = randomInt(1, 4) * 10; // 10, 20, 30, 40
        let d2 = randomInt(1, 3) * 10; // 10, 20, 30
        
        let precio1 = precio * (1 - d1/100);
        let final = precio1 * (1 - d2/100);
        
        const opciones = [final, final + 20, final - 10, precio * (1 - (d1+d2)/100)].map(String);
        const pregunta = `Una tienda ofrece un descuento del ${d1}% en un artículo y luego un descuento adicional del ${d2}% sobre el precio ya rebajado. Si el artículo costaba originalmente $${precio}, ¿cuál es el precio final?`;
        const descUnico = d1 + d2 - (d1*d2)/100;
        const just = `Primer descuento: ${d1}% de ${precio} queda en ${precio1}. Segundo descuento: ${d2}% de ${precio1} queda en ${final}. Descuento único equivalente: ${descUnico}%.`;
        addQuestion(pregunta, opciones, final, just);
    }
}

// 5. Ecuaciones (Suma de consecutivos)
function generarEcuaciones() {
    for (let i = 0; i < 30; i++) {
        let x = randomInt(10, 50);
        let type = randomInt(0, 1); // 0 = consecutivos, 1 = pares consecutivos
        if (type === 0) {
            let suma = x + (x+1) + (x+2);
            const opciones = [x+2, x+3, x, x+1].map(String);
            const pregunta = `La suma de tres números enteros consecutivos es ${suma}. ¿Cuál es el número mayor?`;
            const just = `x + (x+1) + (x+2) = ${suma} => 3x + 3 = ${suma} => 3x = ${suma-3} => x = ${x}. El mayor es ${x+2}.`;
            addQuestion(pregunta, opciones, x+2, just);
        } else {
            if (x % 2 !== 0) x++; // Asegurar par
            let suma = x + (x+2) + (x+4);
            const opciones = [x+4, x+6, x+2, x+8].map(String);
            const pregunta = `La suma de tres números pares consecutivos es ${suma}. ¿Cuál es el número mayor?`;
            const just = `x + (x+2) + (x+4) = ${suma} => 3x + 6 = ${suma} => 3x = ${suma-6} => x = ${x}. El mayor es ${x+4}.`;
            addQuestion(pregunta, opciones, x+4, just);
        }
    }
}

// 6. Progresiones (Aritmeticas y Geometricas)
function generarProgresiones() {
    for (let i = 0; i < 30; i++) {
        let type = randomInt(0, 1);
        if (type === 0) {
            // PA
            let a1 = randomInt(1, 10);
            let r = randomInt(2, 7);
            let n1 = randomInt(3, 6);
            let n2 = randomInt(7, 12);
            let an1 = a1 + (n1-1)*r;
            let an2 = a1 + (n2-1)*r;
            
            const opciones = [a1, a1+1, a1+r, a1+2].map(String);
            const pregunta = `El término de posición ${n1} de una progresión aritmética es ${an1} y el de posición ${n2} es ${an2}. ¿Cuál es el primer término?`;
            const just = `a_${n1} = a1 + ${n1-1}r = ${an1}. a_${n2} = a1 + ${n2-1}r = ${an2}. Restando: ${n2-n1}r = ${an2-an1} => r = ${r}. Sustituyendo: a1 = ${an1} - ${n1-1}(${r}) = ${a1}.`;
            addQuestion(pregunta, opciones, a1, just);
        } else {
            // PG
            let a1 = randomInt(1, 5);
            let r = randomInt(2, 4);
            let n1 = randomInt(2, 3);
            let n2 = randomInt(4, 5);
            let an1 = a1 * Math.pow(r, n1-1);
            let an2 = a1 * Math.pow(r, n2-1);
            
            const opciones = [r, r+1, r*2, Math.abs(r-1) || 5].map(String);
            const pregunta = `En una progresión geométrica estricta de términos positivos, el término de posición ${n1} es ${an1} y el término de posición ${n2} es ${an2}. ¿Cuál es la razón (r) de la progresión?`;
            const just = `a_${n1} = a1*r^${n1-1} = ${an1}. a_${n2} = a1*r^${n2-1} = ${an2}. Dividiendo: r^${n2-n1} = ${an2/an1} => r = ${r}.`;
            addQuestion(pregunta, opciones, r, just);
        }
    }
}

// Generar
generarMCM();
generarMCD();
generarReglaTres();
generarPorcentajes();
generarEcuaciones();
generarProgresiones();

// Desordenar todo el banco final
const shuffledBank = shuffleArray(bank);
fs.writeFileSync('preguntas.json', JSON.stringify(shuffledBank, null, 2));
console.log(`Generadas ${shuffledBank.length} preguntas exitosamente en preguntas.json`);

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
