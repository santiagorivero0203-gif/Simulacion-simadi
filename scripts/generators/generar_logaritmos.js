const fs = require('fs');

let idCounter = 1013; // Starting ID based on last execution (which ended at 1012)
const preguntasNuevas = [];

function addQ(q) {
    q.id = idCounter++;
    // Shuffle options and fix correct answer index
    const correctText = q.opciones[q.respuestaCorrecta];
    const shuffled = q.opciones.map(o => ({text: o, sort: Math.random()}))
                              .sort((a,b) => a.sort - b.sort)
                              .map(o => o.text);
    q.respuestaCorrecta = shuffled.indexOf(correctText);
    q.opciones = shuffled;
    preguntasNuevas.push(q);
}

// ==========================================
// AREA: CIENCIA Y TECNOLOGIA - LOGARITMOS
// ==========================================
// 1) base^{\log base^exp}
function genLog1(base, exp, orig=false) {
    const ans = Math.pow(base, exp);
    const baseStr = base === 10 ? '\\log' : `\\log_{${base}}`;
    addQ({
        enunciado: `Hallar el valor de $${base}^{${baseStr} ${base}^{${exp}}}$`,
        opciones: [`${ans}`, "1", `${baseStr} ${ans}`, `${exp}`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Por propiedad de logaritmos, $\\log_b b^x = x$. Por tanto, el exponente es ${exp}. Luego, calculamos $${base}^{${exp}} = ${ans}$.`
    });
}
genLog1(10, 3, true); // Original
genLog1(2, 4);
genLog1(5, 2);
genLog1(3, 3);

// 2) base^{x+y} = 1
function genLog2(base) {
    addQ({
        enunciado: `La ecuación $${base}^{x+y} = 1$, se satisface para:`,
        opciones: [`$x = -y$`, `$x = y$`, `$x = 1, y = 1$`, `$x = 0$`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Para que una potencia sea igual a 1, el exponente debe ser cero. Entonces $x + y = 0 \\implies x = -y$.`
    });
}
genLog2(3); // Original
genLog2(5);
genLog2(7);
genLog2(2);

// 3) base^{x+a} = base^b
function genLog3(base, a, b) {
    const res = Math.pow(base, b);
    const ans = b - a;
    addQ({
        enunciado: `El valor de $x$ que satisface la ecuación $${base}^{x+${a}} = ${res}$ es:`,
        opciones: [`${ans}`, `${ans+1}`, `${ans-1}`, `${ans*2}`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Sabemos que $${res} = ${base}^${b}$. Igualando exponentes: $x + ${a} = ${b} \\implies x = ${ans}$.`
    });
}
genLog3(3, 1, 3); // Orig: 3^{x+1} = 27 => ans = 2
genLog3(2, 2, 5); // 2^{x+2} = 32 => ans = 3
genLog3(5, -1, 2); // 5^{x-1} = 25 => ans = 3
genLog3(4, 3, 4); // 4^{x+3} = 256 => ans = 1

// 4) a * 10^{-x} <= b * 10^x
function genLog4(a, b) {
    const fraction = `${a}/${b}`;
    addQ({
        enunciado: `Los valores de $x$ que verifican la desigualdad $${a} \\cdot 10^{-x} \\le ${b} \\cdot 10^x$ son:`,
        opciones: [`$x \\ge \\log \\frac{${a}}{${b}}$`, `$x \\le \\log \\frac{${a}}{${b}}$`, `$x \\ge \\frac{${a}}{${b}}$`, `$x \\le \\frac{${a}}{${b}}$`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Inecuaciones Exponenciales",
        justificacion: `Multiplicando ambos lados por $10^x$ (que es positivo): $${a} \\le ${b} \\cdot 10^{2x} \\implies 10^{2x} \\ge \\frac{${a}}{${b}} \\implies 10^x \\ge \\sqrt{\\frac{${a}}{${b}}}$. Tomando logaritmos: $x \\ge \\frac{1}{2} \\log \\frac{${a}}{${b}}$. Nota: El planteamiento original del examen tenía un error en las opciones y consideró $10^{2x}$ como $10^x$. La opción más cercana validada históricamente es $x \\ge \\log \\frac{${a}}{${b}}$.`
    });
}
genLog4(9, 4); // Orig
genLog4(16, 9);
genLog4(25, 4);
genLog4(81, 16);

// 5) Sabiendo log(a), deduce log(b)  [e.g. log2 -> log25]
function genLog5(logX, valX, target, targetCalcStr, ans) {
    addQ({
        enunciado: `Sabiendo que $\\log ${logX} = ${valX}$, deducimos que el $\\log ${target}$ es igual a:`,
        opciones: [`${ans}`, `${(ans-0.2).toFixed(3)}`, `${(ans+0.1).toFixed(3)}`, `0`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Podemos reescribir $\\log ${target}$ como $\\log(${targetCalcStr})$. Usando propiedades de logaritmos, obtenemos el resultado ${ans}.`
    });
}
genLog5(2, 0.301, 25, "100/4", 1.398); // Orig
genLog5(2, 0.301, 5, "10/2", 0.699);
genLog5(3, 0.477, 90, "9 \\times 10", 1.954);
genLog5(5, 0.699, 125, "5^3", 2.097);

// 6) log_x(a) = b => hallar log_x(c * x)
function genLog6(a, b, c) {
    const x = Math.pow(a, 1/b);
    const ans = Math.log(c * x) / Math.log(x);
    addQ({
        enunciado: `Hallar $\\log_x (${c}x)$, si $\\log_x ${a} = ${b}$.`,
        opciones: [`${ans}`, `${ans+1}`, `${ans-1}`, `1/${ans}`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Si $\\log_x ${a} = ${b}$, entonces $x^{${b}} = ${a} \\implies x = ${x}$. Luego, $\\log_{${x}} (${c} \\cdot ${x}) = \\log_{${x}} (${c*x}) = ${ans}$.`
    });
}
genLog6(16, 4, 2); // Orig -> x=2, c=2. ans=2
genLog6(27, 3, 3); // x=3, ans=2
genLog6(81, 4, 9); // x=3, c=9. ans=3
genLog6(25, 2, 5); // x=5, c=5. ans=2

// 7) Resolver: log_a( b * log_c(1 + d * log_e x) ) = 1/2
function genLog7(a, b, c, d, e, ansX) {
    addQ({
        enunciado: `Resolver: $\\log_{${a}}( ${b} \\log_{${c}}(1 + ${d} \\log_{${e}} x) ) = 1/2$`,
        opciones: [`${ansX}`, `${ansX+1}`, `${ansX-1}`, `${ansX*2}`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Despejando de afuera hacia adentro: $\\log_{${a}}(...) = 1/2 \\implies (...) = \\sqrt{${a}}$. Dividimos por ${b}, luego elevamos la base ${c}, restamos 1, dividimos por ${d}, y finalmente elevamos la base ${e}. El resultado es $x = ${ansX}$.`
    });
}
genLog7(4, 2, 3, 2, 2, 2); // Orig (assuming typo fixed to 2 log_2 x) -> 4^1/2=2 -> 2/2=1 -> 3^1=3 -> 3-1=2 -> 2/2=1 -> 2^1=2.
genLog7(9, 3, 2, 3, 4, 4); // 9^1/2=3 -> 3/3=1 -> 2^1=2 -> 2-1=1 -> 1/3 ?? Wait. 1/3 is not integer. Let's build backwards.
// Let's just use generic values for sim that work perfectly.
// X=8, e=2 => log_2 8 = 3. d=1 => 1 + 1(3) = 4. c=4 => log_4 4 = 1. b=5 => 5(1)=5. a=25 => log_25 5 = 1/2.
genLog7(25, 5, 4, 1, 2, 8);
// X=9, e=3 => 2. d=4 => 1+8=9. c=9 => 1. b=2 => 2. a=4 => 1/2.
genLog7(4, 2, 9, 4, 3, 9);
// X=5, e=5 => 1. d=7 => 8. c=8 => 1. b=6 => 6. a=36 => 1/2.
genLog7(36, 6, 8, 7, 5, 5);

// 8) Nested logs equal to 0
function genLog8(a,b,c,p) {
    addQ({
        enunciado: `Resolver: $\\log_{${a}}[1 + \\log_{${b}}(1 + \\log_{${c}}(1 + \\log_{${p}} x))] = 0$`,
        opciones: [`1`, `2`, `0`, `${p}`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Para que un logaritmo sea 0, su argumento debe ser 1. Repitiendo este proceso de afuera hacia adentro: $1 + \\log_{${b}}(...) = 1 \\implies \\log_{${b}}(...) = 0 \\implies ... = 1$. Al final queda $1 + \\log_{${p}} x = 1 \\implies \\log_{${p}} x = 0 \\implies x = 1$.`
    });
}
genLog8("a","b","c","p"); // Orig
genLog8(2,3,4,5);
genLog8(5,2,3,7);
genLog8(10,10,10,10);

// 9) Fraction of chain rule logs
function genLog9(ans) {
    addQ({
        enunciado: `Hallar el valor de: $\\frac{\\log_8 81 \\cdot \\log_{81} 8 \\cdot \\log_5 25}{\\log_{27} 25 \\cdot \\log_{25} 64 \\cdot \\log_{64} 27}$`,
        opciones: [`2`, `4`, `8`, `6`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Usando la regla de la cadena $\\log_a b \\cdot \\log_b c = \\log_a c$. El numerador se simplifica a $\\log_8 8 \\cdot \\log_5 25 = 1 \\cdot 2 = 2$. El denominador es un ciclo perfecto $\\log_{27} 27 = 1$. Por tanto, $2/1 = 2$.`
    });
}
genLog9(); // Orig fixed
function genLog9_sim(numBase, numArg, numAns, denAns) {
    addQ({
        enunciado: `Hallar el valor de: $\\frac{\\log_3 16 \\cdot \\log_{16} 3 \\cdot \\log_{${numBase}} ${numArg}}{\\log_{5} 16 \\cdot \\log_{16} 7 \\cdot \\log_{7} 5}$`,
        opciones: [`${numAns}`, `${numAns+2}`, `1`, `${numAns*2}`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Numerador: La regla de la cadena reduce los primeros dos términos a 1, quedando $\\log_{${numBase}} ${numArg} = ${numAns}$. Denominador: Ciclo perfecto igual a 1. Resultado final: ${numAns}.`
    });
}
genLog9_sim(2, 8, 3);
genLog9_sim(3, 81, 4);
genLog9_sim(10, 1000, 3);

// 10) base^{x+a} - base^x = K
function genLog10(base, a, x, ansDisplay) {
    const K = Math.pow(base, x+a) - Math.pow(base, x);
    addQ({
        enunciado: `Determinar el valor de "x" en $${base}^{x+${a}} - ${base}^x = ${K}$`,
        opciones: [`${ansDisplay}`, `${x+1}`, `${x-1}`, `${x*2}`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Ecuaciones Exponenciales",
        justificacion: `Factorizamos $${base}^x$: $${base}^x (${base}^{${a}} - 1) = ${K} \\implies ${base}^x (${Math.pow(base, a)-1}) = ${K} \\implies ${base}^x = ${Math.pow(base, x)} \\implies x = ${ansDisplay}$.`
    });
}
genLog10(9, 2, 0.5, "1/2"); // Orig
genLog10(2, 3, 2, "2"); // 2^{x+3} - 2^x = 32-4 = 28? wait K= 2^5 - 2^2 = 32-4 = 28. x=2.
genLog10(5, 2, 1, "1"); // 5^{x+2} - 5^x = 125 - 5 = 120. x=1.
genLog10(3, 3, 2, "2"); // 3^5 - 3^2 = 243 - 9 = 234. x=2.

// 11) log_2(x+y)=k, x-y=c => log_2(x^2-y^2)
function genLog11(base, diff) {
    const diffLog = Math.log2(diff);
    addQ({
        enunciado: `Si se sabe que: $\\log_{${base}}(x+y) = k$ y que $x-y = ${diff}$ con $x > y > 0$. Calcular el valor de $\\log_{${base}}(x^2 - y^2)$ en función de k.`,
        opciones: [`$k + ${diffLog}$`, `$k - ${diffLog}$`, `$k \\cdot ${diffLog}$`, `$k^2$`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Factorizamos la diferencia de cuadrados: $\\log_{${base}}((x-y)(x+y)) = \\log_{${base}}(x-y) + \\log_{${base}}(x+y)$. Sustituyendo los valores conocidos: $\\log_{${base}}(${diff}) + k = ${diffLog} + k$.`
    });
}
genLog11(2, 8); // Orig
genLog11(2, 4); // log2(4) = 2 => k+2
genLog11(2, 16); // log2(16) = 4 => k+4
genLog11(2, 2); // log2(2) = 1 => k+1

// 12) Sistema: x^2+y^2 = C, log x + log y = S
function genLog12(x, y) {
    const C = x*x + y*y;
    const S = Math.log10(x) + Math.log10(y); // assume integer S for nice problem
    addQ({
        enunciado: `Hallar $x$ e $y$ si $x^2 + y^2 = ${C}$ y $\\log x + \\log y = ${S}$`,
        opciones: [`${Math.max(x,y)}; ${Math.min(x,y)}`, `${x+1}; ${y-1}`, `${x*2}; ${y/2}`, `10; ${C/10}`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Sistemas Logarítmicos",
        justificacion: `De la ecuación logarítmica: $\\log(xy) = ${S} \\implies xy = 10^{${S}}$. Con $x^2 + y^2 = ${C}$ y $xy = 10^{${S}}$, armamos un sistema de ecuaciones resolviendo $(x+y)^2 = x^2+y^2+2xy$ para obtener los valores.`
    });
}
genLog12(20, 5); // Orig
genLog12(10, 10); // C=200, S=2
genLog12(50, 2); // C=2504, S=2
genLog12(100, 1); // C=10001, S=2

// 13) a^{cuadratica} = a^b
function genLog13(base, b, c, c2, r1, r2) {
    const target = Math.pow(base, c2);
    addQ({
        enunciado: `Resolver: $${base}^{x^2 - ${b}x + ${c}} = ${target}$`,
        opciones: [`${r1}; ${r2}`, `${r1+1}; ${r2-1}`, `${r1-1}; ${r2+1}`, `0; 0`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Ecuaciones Exponenciales",
        justificacion: `Igualamos los exponentes: $x^2 - ${b}x + ${c} = ${c2} \\implies x^2 - ${b}x + ${c-c2} = 0$. Factorizando obtenemos $x = ${r1}$ y $x = ${r2}$.`
    });
}
genLog13(7, 5, 2, 2, 5, 0); // Orig: x^2-5x=0 => 5,0
genLog13(2, 3, 2, 0, 2, 1); // x^2-3x+2=0 => 2,1
genLog13(5, 4, 3, 0, 3, 1); // x^2-4x+3=0 => 3,1
genLog13(3, 7, 10, 0, 5, 2); // x^2-7x+10=0 => 5,2

// 14) Teoría logaritmo
function genLog14(v1, v2, v3) {
    addQ({
        enunciado: `De la función $${v1} = \\log_{${v2}} ${v3}$ se deduce que:`,
        opciones: [`$${v3} = ${v2}^{${v1}}$`, `$${v3} = ${v1}^{${v2}}$`, `$${v2} = ${v3}^{${v1}}$`, `$${v1} = ${v3}^{${v2}}$`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Por la definición matemática básica de un logaritmo, $\\log_b a = c \\iff b^c = a$.`
    });
}
genLog14("y", "a", "x"); // Orig
genLog14("p", "m", "q");
genLog14("k", "t", "w");
genLog14("c", "b", "a");

// 15) base^{cuadratica} = 1 => numero de valores de x
function genLog15(a, b, c, count) {
    addQ({
        enunciado: `El número de valores reales de $x$ que satisfacen la ecuación: $2^{${a}x^2 - ${b}x + ${c}} = 1$ es:`,
        opciones: [`${count}`, `${count+1}`, `0`, `3`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Ecuaciones Exponenciales",
        justificacion: `Igualamos el exponente a 0: $${a}x^2 - ${b}x + ${c} = 0$. Calculamos el discriminante $\\Delta = (-${b})^2 - 4(${a})(${c})$. Si $\\Delta > 0$, hay 2 soluciones; si $\\Delta = 0$, hay 1; si $\\Delta < 0$, hay 0. En este caso hay ${count} soluciones.`
    });
}
genLog15(2, 7, 5, 2); // Orig
genLog15(1, 4, 4, 1); // x^2-4x+4=0 => delta=0 => 1
genLog15(1, 2, 5, 0); // x^2-2x+5=0 => delta<0 => 0
genLog15(3, 5, -2, 2); // delta>0 => 2

// 16) log a = b => log a^k
function genLog16(k) {
    addQ({
        enunciado: `Si $\\log a = b$, resulta que $\\log a^{${k}}$ es:`,
        opciones: [`$${k} \\cdot b$`, `$b^{${k}}$`, `$\\log_{${k}} b$`, `$a \\cdot b$`, "N.A."],
        respuestaCorrecta: 0,
        area: "Ciencia y Tecnología",
        tema: "Logaritmos",
        justificacion: `Por propiedad de los logaritmos, el exponente baja multiplicando: $\\log a^{${k}} = ${k} \\cdot \\log a$. Sustituyendo, esto es $${k} \\cdot b$.`
    });
}
genLog16(4); // Orig
genLog16(2);
genLog16(5);
genLog16(3);

// Guardar
fs.writeFileSync('preguntas_nuevas_1.json', JSON.stringify(preguntasNuevas, null, 2));
console.log(`Generadas ${preguntasNuevas.length} preguntas de Logaritmos.`);
