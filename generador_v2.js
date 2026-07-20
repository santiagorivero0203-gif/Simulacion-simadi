const fs = require('fs');

const fileData = fs.readFileSync('preguntas.json', 'utf8');
const oldPreguntas = JSON.parse(fileData);
const certifiedQuestions = oldPreguntas.filter(q => q.pregunta.includes('Certificado'));

const bank = [];
let idCounter = 1;

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const mcd = (a, b) => b === 0 ? a : mcd(b, a % b);
const mcm = (a, b) => (a * b) / mcd(a, b);
const mcmArray = (arr) => arr.reduce((acc, val) => mcm(acc, val), 1);
const mcdArray = (arr) => arr.reduce((acc, val) => mcd(acc, val));

function addQuestion(tema, pregunta, opciones, correcta, justificacion) {
    bank.push({
        id: idCounter++,
        area: "Razonamiento Lógico Numérico",
        tema,
        pregunta,
        opciones,
        correcta: correcta.toString(),
        justificacion
    });
}

// 1. M.C.M (Coincidencias en el tiempo)
const mcmContexts = [
    { sub: "Tres naves espaciales", action: "orbitan un planeta", verb: "dar una vuelta" },
    { sub: "Tres relojes de arena", action: "miden el tiempo cíclicamente", verb: "vaciarse por completo" },
    { sub: "Tres atletas", action: "corren en una pista circular", verb: "completar una vuelta" },
    { sub: "Tres faros costeros", action: "emiten destellos", verb: "completar su ciclo de iluminación" }
];
function generarMCM() {
    for (let i = 0; i < 35; i++) {
        let t1 = randomInt(2, 8);
        let t2 = randomInt(4, 12);
        let t3 = randomInt(5, 15);
        if (t1 === t2 || t2 === t3 || t1 === t3) t2 += 1;
        
        let res = mcmArray([t1, t2, t3]);
        while (res > 500) { 
            t1 = randomInt(2, 5); t2 = randomInt(3, 7); t3 = randomInt(4, 8);
            res = mcmArray([t1, t2, t3]);
        }
        const ctx = mcmContexts[i % mcmContexts.length];
        const opciones = [res, res + randomInt(2, 10), Math.abs(res - randomInt(1, 10)) || 1, res * 2].map(String);
        const pregunta = `${ctx.sub} ${ctx.action}. Tardan ${t1}, ${t2} y ${t3} minutos respectivamente en ${ctx.verb}. Si inician simultáneamente, ¿cuántos minutos transcurrirán hasta que vuelvan a coincidir por primera vez?`;
        const just = `**Concepto Fundamental:** Mínimo Común Múltiplo (M.C.M.). Se utiliza cuando buscamos la coincidencia en el tiempo de eventos periódicos. Consiste en encontrar el menor múltiplo común a todos los periodos.\n\n**Resolución:** Descomponemos en factores primos los tiempos: ${t1}, ${t2}, y ${t3}. Al calcular el M.C.M. tomando los factores comunes y no comunes con su mayor exponente obtenemos: M.C.M(${t1}, ${t2}, ${t3}) = ${res} minutos.`;
        addQuestion("Teoría de Números (MCM/MCD)", pregunta, opciones, res, just);
    }
}

// 2. M.C.D (Cortar/Repartir mayor tamaño posible)
const mcdContexts = [
    { sub: "Un carpintero tiene tres tablas de madera", unit: "cm", action: "cortarlas en trozos" },
    { sub: "Un sastre tiene tres rollos de tela", unit: "metros", action: "cortarlos en retazos" },
    { sub: "Un electricista tiene tres cables de cobre", unit: "metros", action: "dividirlos en segmentos" },
    { sub: "Una repostera tiene tres listones decorativos", unit: "cm", action: "cortarlos en cintas" }
];
function generarMCD() {
    for (let i = 0; i < 35; i++) {
        let factor = randomInt(5, 20);
        let c1 = randomInt(2, 6) * factor;
        let c2 = randomInt(3, 8) * factor;
        let c3 = randomInt(4, 10) * factor;
        if (c1 === c2) c2 += factor;
        
        let res = mcdArray([c1, c2, c3]);
        const ctx = mcdContexts[i % mcdContexts.length];
        const opciones = [res, res + 5, Math.abs(res - 2) || 1, res * 2].map(String);
        const pregunta = `${ctx.sub} de ${c1} ${ctx.unit}, ${c2} ${ctx.unit} y ${c3} ${ctx.unit}. Desea ${ctx.action} del mayor tamaño posible sin que sobre material, y todos de la misma longitud. ¿Cuánto debe medir cada fragmento?`;
        const just = `**Concepto Fundamental:** Máximo Común Divisor (M.C.D.). Se utiliza para problemas de repartición, división o corte equitativo buscando el mayor tamaño posible sin desperdicio.\n\n**Resolución:** Extraemos los divisores comunes de las cantidades ${c1}, ${c2}, y ${c3}. El mayor de estos divisores es el M.C.D(${c1}, ${c2}, ${c3}) = ${res} ${ctx.unit}.`;
        addQuestion("Teoría de Números (MCM/MCD)", pregunta, opciones, res, just);
    }
}

// 3. Regla de Tres Compuesta
const r3Contexts = [
    { p1: "obreros", p2: "días", p3: "horas diarias", action: "pavimentar una calle" },
    { p1: "programadores", p2: "días", p3: "horas diarias", action: "desarrollar un sistema" },
    { p1: "impresoras", p2: "horas", p3: "minutos de descanso", action: "imprimir una tirada" },
    { p1: "máquinas", p2: "días", p3: "horas", action: "ensamblar los lotes" }
];
function generarReglaTres() {
    for (let i = 0; i < 35; i++) {
        const ctx = r3Contexts[i % r3Contexts.length];
        let o1 = randomInt(10, 30);
        let d1 = randomInt(10, 20);
        let h1 = randomInt(6, 10);
        
        let d2 = randomInt(5, 15);
        let h2 = randomInt(5, 12);
        
        let total = o1 * d1 * h1;
        let o2 = Math.floor(total / (d2 * h2));
        
        let intentos = 0;
        while (total % (d2 * h2) !== 0 && intentos < 50) {
            d2 = randomInt(5, 15);
            h2 = randomInt(5, 12);
            o2 = Math.floor(total / (d2 * h2));
            intentos++;
        }
        
        if (intentos >= 50) {
            i--; // Retry completely
            continue;
        }

        const opciones = [o2, o2 + 2, Math.abs(o2 - 4) || 1, o2 * 2].map(String);
        const pregunta = `Para ${ctx.action}, ${o1} ${ctx.p1} tardan ${d1} ${ctx.p2} trabajando ${h1} ${ctx.p3}. Si se desea terminar el trabajo en ${d2} ${ctx.p2} con un ritmo de ${h2} ${ctx.p3}, ¿cuántos ${ctx.p1} se necesitarán?`;
        const just = `**Concepto Fundamental:** Regla de Tres Compuesta. Permite resolver problemas con más de dos magnitudes proporcionales analizando si la relación es Directa (a más X, más Y) o Inversa (a más X, menos Y).\n\n**Resolución:** Analizamos la incógnita (${ctx.p1}) contra las demás. ${ctx.p1} vs ${ctx.p2} es Inversa. ${ctx.p1} vs ${ctx.p3} es Inversa. Aplicando el despeje: X = (${o1} × ${d1} × ${h1}) / (${d2} × ${h2}) = ${total} / ${d2*h2} = ${o2} ${ctx.p1}.`;
        addQuestion("Regla de Tres y Proporciones", pregunta, opciones, o2, just);
    }
}

// 4. Porcentajes
const pctContexts = [
    { item: "un artículo de lujo", type: "descuento" },
    { item: "un paquete tecnológico", type: "descuento" },
    { item: "una suscripción anual", type: "descuento" }
];
function generarPorcentajes() {
    for (let i = 0; i < 35; i++) {
        let precio = randomInt(2, 20) * 100;
        let d1 = randomInt(1, 4) * 10; 
        let d2 = randomInt(1, 3) * 10; 
        
        let precio1 = precio * (1 - d1/100);
        let final = precio1 * (1 - d2/100);
        
        const ctx = pctContexts[i % pctContexts.length];
        const opciones = [final, final + 20, final - 10, precio * (1 - (d1+d2)/100)].map(String);
        const pregunta = `Una tienda ofrece un descuento del ${d1}% en ${ctx.item} y luego, por promoción especial, un descuento adicional del ${d2}% sobre el precio ya rebajado. Si el precio original era de $${precio}, ¿cuál es el precio final a pagar?`;
        const descUnico = d1 + d2 - (d1*d2)/100;
        const just = `**Concepto Fundamental:** Descuentos Sucesivos. El segundo porcentaje no se calcula sobre el precio original, sino sobre el subtotal resultante del primer descuento. La fórmula de descuento único es: D = D1 + D2 - (D1×D2)/100.\n\n**Resolución:** Primer descuento: ${d1}% de ${precio} nos deja un subtotal de ${precio1}. Segundo descuento: ${d2}% de ${precio1} nos deja ${final}. (Descuento único equivalente: ${descUnico}%).`;
        addQuestion("Porcentajes", pregunta, opciones, final, just);
    }
}

// 5. Ecuaciones
const ecContexts = [
    { type: "enteros consecutivos", factor: 1 },
    { type: "pares consecutivos", factor: 2 },
    { type: "impares consecutivos", factor: 2 }
];
function generarEcuaciones() {
    for (let i = 0; i < 30; i++) {
        const ctx = ecContexts[i % ecContexts.length];
        let x = randomInt(10, 50);
        
        if (ctx.type === "pares consecutivos" && x % 2 !== 0) x++;
        if (ctx.type === "impares consecutivos" && x % 2 === 0) x++;
        
        let f = ctx.factor;
        let suma = x + (x + f) + (x + 2*f);
        
        const opciones = [x + 2*f, x + 3*f, x, x + f].map(String);
        const pregunta = `La suma de tres números ${ctx.type} es ${suma}. ¿Cuál es el valor del número mayor?`;
        const just = `**Concepto Fundamental:** Modelaje Algebraico de sucesiones numéricas enteras. \n\n**Resolución:** Planteamos la ecuación: x + (x + ${f}) + (x + ${2*f}) = ${suma}. Sumando las x: 3x + ${3*f} = ${suma} => 3x = ${suma - 3*f} => x = ${x}. Nos piden el mayor, que es (x + ${2*f}) = ${x + 2*f}.`;
        addQuestion("Ecuaciones e Inecuaciones", pregunta, opciones, x + 2*f, just);
    }
}

// 6. Progresiones
const progContexts = [
    { name: "PA", txt: "aritmética", op: "Suma constante (razón aritmética)" },
    { name: "PG", txt: "geométrica estricta de términos positivos", op: "Producto constante (razón geométrica)" }
];
function generarProgresiones() {
    for (let i = 0; i < 30; i++) {
        let type = randomInt(0, 1);
        const ctx = progContexts[type];
        if (type === 0) {
            let a1 = randomInt(1, 10);
            let r = randomInt(2, 7);
            let n1 = randomInt(3, 6);
            let n2 = randomInt(7, 12);
            let an1 = a1 + (n1-1)*r;
            let an2 = a1 + (n2-1)*r;
            
            const opciones = [a1, a1+1, a1+r, a1+2].map(String);
            const pregunta = `El término posicionado en el lugar ${n1} de una progresión ${ctx.txt} es ${an1} y el término en la posición ${n2} es ${an2}. ¿Cuál es el primer término de la sucesión?`;
            const just = `**Concepto Fundamental:** Sucesión Numérica y Término General. En una PA: an = a1 + (n-1)r.\n\n**Resolución:** Tenemos el sistema:\n1) a_${n1} = a1 + ${n1-1}r = ${an1}\n2) a_${n2} = a1 + ${n2-1}r = ${an2}\nRestando la ecuación 1 de la 2: ${n2-n1}r = ${an2-an1} => r = ${r}. Sustituyendo r en la ec. 1: a1 = ${an1} - ${n1-1}(${r}) = ${a1}.`;
            addQuestion("Progresiones", pregunta, opciones, a1, just);
        } else {
            let a1 = randomInt(1, 5);
            let r = randomInt(2, 4);
            let n1 = randomInt(2, 3);
            let n2 = randomInt(4, 5);
            let an1 = a1 * Math.pow(r, n1-1);
            let an2 = a1 * Math.pow(r, n2-1);
            
            const opciones = [r, r+1, r*2, Math.abs(r-1) || 5].map(String);
            const pregunta = `En una progresión ${ctx.txt}, el término en la posición ${n1} es ${an1} y el término en la posición ${n2} es ${an2}. ¿Cuál es la razón (r) de crecimiento de esta progresión?`;
            const just = `**Concepto Fundamental:** Sucesión Numérica y Término General. En una PG: an = a1 * r^(n-1).\n\n**Resolución:** Tenemos:\n1) a_${n1} = a1*r^${n1-1} = ${an1}\n2) a_${n2} = a1*r^${n2-1} = ${an2}\nDividiendo la ec. 2 entre la 1: r^${n2-n1} = ${an2/an1} => r = ${r}.`;
            addQuestion("Progresiones", pregunta, opciones, r, just);
        }
    }
}

// Run generators
generarMCM();
generarMCD();
generarReglaTres();
generarPorcentajes();
generarEcuaciones();
generarProgresiones();

// Append certified
bank.push(...certifiedQuestions);

// Save to disk
fs.writeFileSync('preguntas.json', JSON.stringify(bank, null, 2));
console.log(`Generadas ${bank.length} preguntas variadas exitosamente.`);
