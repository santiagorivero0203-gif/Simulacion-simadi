const fs = require('fs');

const preguntas = [
  {
    "area": "Razonamiento Lógico",
    "tema": "Orden de información",
    "pregunta": "Se sabe que Sofía es más alta que Carlos; Pedro es más bajo que Lucía; Carlos es más alto que Ana y Lucía; Mateo es más bajo que Carlos. Entonces podemos afirmar que:",
    "opciones": ["Mateo es el más bajo de todos", "Ana no es menor que Mateo", "Sofía es la más alta de todos", "Carlos es el más bajo"],
    "correcta": "Sofía es la más alta de todos",
    "justificacion": "Relaciones: Sofía > Carlos, Pedro < Lucía, Carlos > Ana, Carlos > Lucía, Mateo < Carlos. Como Sofía es mayor que Carlos y Carlos es mayor que todos los demás (Ana, Lucía, Mateo, Pedro), Sofía es indiscutiblemente la más alta. No podemos afirmar nada con certeza sobre quién es el más bajo entre Ana, Mateo o Pedro."
  },
  {
    "area": "Razonamiento Lógico",
    "tema": "Criptoaritmética",
    "pregunta": "En una escuela, se utiliza un código secreto para asignar números a las frutas. Las consonantes no tienen valor, y cada vocal tiene un valor numérico distinto. Si sabemos que UVA = 10 y que PERA = 12, ¿cuál es el valor numérico de la palabra CAMBUR?",
    "opciones": ["12", "10", "15", "8"],
    "correcta": "10",
    "justificacion": "UVA = U + A = 10. PERA = E + A = 12. CAMBUR = A + U (ya que las consonantes no tienen valor). Como A + U = U + A, el valor de CAMBUR es 10."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Porcentajes",
    "pregunta": "En una panadería se hornean 150 panes dulces y 220 panes salados cada día. El lunes se vendieron el 80% de los panes dulces y el 65% de los panes salados. El martes se hornearon las mismas cantidades y se vendió el 90% de los panes dulces y el 70% de los panes salados. ¿Cuántos panes salados quedaron sin vender al final del martes?",
    "opciones": ["75", "66", "60", "54"],
    "correcta": "66",
    "justificacion": "Nos preguntan por los panes salados que quedaron sin vender el martes. Se hornearon 220 panes salados y se vendió el 70%. Por lo tanto, quedó el 30% sin vender. Calculamos el 30% de 220: (30/100) * 220 = 66 panes salados."
  },
  {
    "area": "Razonamiento Lógico",
    "tema": "Conjuntos",
    "pregunta": "En una escuela de artes, hay estudiantes que se especializan en pintura, escultura, música y danza. Se sabe que todo estudiante de música toca algún instrumento (lo consideramos parte de la música) y que todo estudiante de escultura crea figuras tridimensionales, pero no pinta. Se deduce que la intersección del conjunto de los estudiantes de escultura con el conjunto de los estudiantes que crean figuras tridimensionales es:",
    "opciones": ["el conjunto de escultura", "el conjunto de pintura", "el conjunto de música", "el conjunto vacío"],
    "correcta": "el conjunto de escultura",
    "justificacion": "Si 'todo estudiante de escultura crea figuras tridimensionales', entonces el conjunto de estudiantes de escultura es un subconjunto del conjunto de estudiantes que crean figuras tridimensionales. La intersección de un conjunto con uno de sus superconjuntos es el mismo conjunto original, en este caso, el conjunto de escultura."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Planteamiento de Ecuaciones",
    "pregunta": "Un ciclista recorrió una distancia. Luego recorrió la tercera parte de esa distancia inicial y, finalmente, la quinta parte de la distancia inicial. Si el total recorrido fue de 46 kilómetros, ¿cuál de las siguientes ecuaciones se debe plantear para resolver el problema?",
    "opciones": ["7D/6 = 46", "23D/15 = 46", "11D/6 = 35", "15D/6 = 35"],
    "correcta": "23D/15 = 46",
    "justificacion": "La distancia inicial es D. Luego recorre D/3, y luego D/5. Total = D + D/3 + D/5. Buscamos el denominador común que es 15. D = 15D/15. D/3 = 5D/15. D/5 = 3D/15. Sumando: (15+5+3)D/15 = 23D/15. La ecuación es 23D/15 = 46."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Edades",
    "pregunta": "La suma de las edades de María y Luis es 35 años. Al llegar Sofía, María comenta: 'cuando tú naciste, yo tenía 5 años, pero cuando Luis nació, tú tenías 2 años'. ¿Cuál es la edad actual de María, en años?",
    "opciones": ["26", "20", "21", "22"],
    "correcta": "21",
    "justificacion": "Sea M la edad de María, L la de Luis y S la de Sofía. M + L = 35. Según María, ella le lleva 5 años a Sofía (M = S + 5) y Sofía le lleva 2 años a Luis (S = L + 2). Por tanto, María le lleva 7 años a Luis (M = L + 7). Sustituyendo en la suma: L + 7 + L = 35 -> 2L = 28 -> L = 14. Así, la edad de María es M = 14 + 7 = 21 años."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Promedios",
    "pregunta": "Las ventas mensuales de una pequeña librería durante los primeros cinco meses del año fueron: 120 libros, 150 libros, 110 libros, 140 libros y 130 libros. Calcula el promedio de ventas mensuales de la librería durante este período.",
    "opciones": ["200", "130", "180", "190"],
    "correcta": "130",
    "justificacion": "El promedio se calcula sumando todos los valores y dividiendo entre la cantidad de meses. Suma: 120 + 150 + 110 + 140 + 130 = 650. Promedio: 650 / 5 = 130 libros por mes."
  },
  {
    "area": "Razonamiento Espacial",
    "tema": "Coordenadas",
    "pregunta": "Un robot se mueve primero 4 metros hacia el este y 2 metros hacia el sur. Luego, se mueve 1 metro hacia el oeste y 5 metros hacia el norte. ¿Cuáles son las coordenadas resultantes del movimiento total del robot con respecto a su punto de partida?",
    "opciones": ["(3, 3)", "(-2, 2)", "(-3, 3)", "(-2,-1)"],
    "correcta": "(3, 3)",
    "justificacion": "Asignamos el este al eje x positivo y el norte al eje y positivo. Movimiento inicial: (4, -2). Segundo movimiento: (-1, +5). Sumando las componentes: x = 4 - 1 = 3; y = -2 + 5 = 3. Las coordenadas finales son (3, 3)."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Fracciones",
    "pregunta": "En una asamblea de vecinos de un edificio que consta de 45 apartamentos, se requiere que, para aprobar una nueva norma, los tres quintos más dos de los propietarios estén a favor. ¿Cuántos votos favorables son necesarios para aprobar la norma?",
    "opciones": ["29", "27", "26", "21"],
    "correcta": "29",
    "justificacion": "Se calcula primero los tres quintos de los 45 apartamentos: (3/5) * 45 = 27. Luego, se suman los 2 votos adicionales requeridos: 27 + 2 = 29 votos."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Mínimo Común Múltiplo (MCM/MCD)",
    "pregunta": "Tres amigos van al gimnasio con diferentes frecuencias. Juan va cada 2 días, María va cada 5 días y Pedro va cada 10 días. Si hoy se encontraron en el gimnasio, ¿en cuántos días volverán a coincidir los tres amigos en el gimnasio?",
    "opciones": ["10", "15", "12", "11"],
    "correcta": "10",
    "justificacion": "Se calcula el Mínimo Común Múltiplo (M.C.M.) de las frecuencias. Los factores primos de 2, 5 y 10 dan como M.C.M(2, 5, 10) = 10. Por lo tanto, coincidirán nuevamente dentro de 10 días."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Planteamiento de Ecuaciones",
    "pregunta": "Ana sube una escalera dando saltos de 2 en 2 escalones y la baja dando saltos de 5 en 5 escalones. Si en total da 35 saltos entre subir y bajar, ¿cuántos escalones tiene la escalera?",
    "opciones": ["50", "36", "40", "48"],
    "correcta": "50",
    "justificacion": "Sea N el número de escalones. Ana da N/2 saltos al subir y N/5 saltos al bajar. La suma de saltos es N/2 + N/5 = 35. Multiplicamos por 10 (mínimo común múltiplo): 5N + 2N = 350 -> 7N = 350 -> N = 50 escalones."
  }
];

const nuevas = [
  {
    "area": "Razonamiento Lógico",
    "tema": "Orden de información",
    "pregunta": "Se sabe que un coche Azul es más rápido que un coche Verde; un coche Rojo es más lento que un coche Amarillo; el coche Verde es más rápido que el coche Blanco y el Amarillo; un coche Negro es más lento que el coche Verde. Entonces podemos afirmar que:",
    "opciones": ["El coche Negro es el más lento", "El coche Amarillo es más lento que el Negro", "El coche Azul es el más rápido de todos", "El coche Verde es el más rápido"],
    "correcta": "El coche Azul es el más rápido de todos",
    "justificacion": "Azul > Verde. Verde > Blanco y Verde > Amarillo. Rojo < Amarillo. Negro < Verde. Como el Azul es más rápido que el Verde, y el Verde es más rápido que todos los demás mencionados, el Azul es indiscutiblemente el más rápido."
  },
  {
    "area": "Razonamiento Lógico",
    "tema": "Criptoaritmética",
    "pregunta": "En un sistema de encriptación, las consonantes se ignoran y cada vocal tiene un valor específico. Si sabemos que MESA = 12 y que PISO = 15, ¿cuál es el valor numérico de la palabra POESIA?",
    "opciones": ["20", "27", "22", "30"],
    "correcta": "27",
    "justificacion": "MESA = E + A = 12. PISO = I + O = 15. POESIA = O + E + I + A. Reordenando, esto es igual a (E + A) + (I + O). Por lo tanto, 12 + 15 = 27."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Porcentajes",
    "pregunta": "En una tienda de electrónicos hay 300 laptops y 150 tablets en el inventario. El miércoles se vendió el 60% de las laptops y el 80% de las tablets. ¿Cuántas laptops quedaron sin vender al final del miércoles?",
    "opciones": ["120", "180", "140", "100"],
    "correcta": "120",
    "justificacion": "Si se vendió el 60% de las laptops, entonces quedó el 40% sin vender. El 40% de 300 laptops es: (40/100) * 300 = 120 laptops."
  },
  {
    "area": "Razonamiento Lógico",
    "tema": "Conjuntos",
    "pregunta": "En una empresa de software, todo desarrollador backend sabe manejar bases de datos, y todo administrador de bases de datos domina el lenguaje SQL. Si alguien no domina el lenguaje SQL, podemos deducir que:",
    "opciones": ["Es desarrollador backend", "No maneja bases de datos", "No es administrador de bases de datos", "Es programador frontend"],
    "correcta": "No es administrador de bases de datos",
    "justificacion": "Si todo administrador de bases de datos domina SQL, entonces dominar SQL es una condición necesaria para ser administrador. Si alguien no domina SQL, por modus tollens, no puede ser administrador de bases de datos."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Planteamiento de Ecuaciones",
    "pregunta": "Un estudiante leyó un libro en tres días. El primer día leyó una fracción de las páginas. El segundo día leyó la mitad de lo que leyó el primer día, y el tercer día la cuarta parte de lo que leyó el primer día. Si en total leyó 140 páginas, ¿cuál de las siguientes ecuaciones representa el problema si P son las páginas del primer día?",
    "opciones": ["7P/4 = 140", "3P/2 = 140", "5P/4 = 140", "P/4 = 140"],
    "correcta": "7P/4 = 140",
    "justificacion": "El primer día lee P. El segundo P/2. El tercer P/4. La suma es P + P/2 + P/4. Convirtiendo a cuartos: 4P/4 + 2P/4 + 1P/4 = 7P/4. La ecuación correcta es 7P/4 = 140."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Edades",
    "pregunta": "La suma de las edades de Juan y Alberto es 35 años. Cuando Pedro nació, Alberto tenía 5 años, y Juan le lleva 6 años a Pedro. ¿Cuál es la edad actual de Alberto?",
    "opciones": ["15", "17", "18", "20"],
    "correcta": "17",
    "justificacion": "A = P + 5, J = P + 6. J + A = 35. (P + 6) + (P + 5) = 35 -> 2P + 11 = 35 -> 2P = 24 -> P = 12. La edad de Alberto es A = 12 + 5 = 17."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Promedios",
    "pregunta": "Un estudiante obtuvo las siguientes calificaciones en sus primeros 4 exámenes: 15, 18, 12 y 16. ¿Qué calificación debe obtener en el quinto examen para que su promedio final sea de 16 puntos?",
    "opciones": ["18", "19", "16", "20"],
    "correcta": "19",
    "justificacion": "Para que el promedio de 5 exámenes sea 16, la suma total de puntos debe ser 5 * 16 = 80. La suma de los 4 exámenes es 15 + 18 + 12 + 16 = 61. Por lo tanto, le faltan 80 - 61 = 19 puntos."
  },
  {
    "area": "Razonamiento Espacial",
    "tema": "Coordenadas",
    "pregunta": "Un dron despega y vuela 5 km al norte y 3 km al este. Luego cambia de dirección y vuela 2 km al sur y 4 km al oeste. ¿A qué distancia y en qué posición se encuentra respecto a su origen?",
    "opciones": ["(-1, 3)", "(1, -3)", "(3, 1)", "(-3, 1)"],
    "correcta": "(-1, 3)",
    "justificacion": "Asignando (0,0) al origen, este es +x, norte es +y. Primer movimiento: (3, 5). Segundo movimiento: (-4, -2). Posición final = (3 - 4, 5 - 2) = (-1, 3)."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Fracciones",
    "pregunta": "En una caja de 60 bombones, dos tercios son de chocolate oscuro y el resto de chocolate blanco. Si de los blancos, la mitad tienen nueces, ¿cuántos bombones de chocolate blanco sin nueces hay?",
    "opciones": ["20", "15", "10", "5"],
    "correcta": "10",
    "justificacion": "Dos tercios de 60 son de chocolate oscuro: (2/3) * 60 = 40. Quedan 20 bombones de chocolate blanco. La mitad tienen nueces, es decir, 10. Por lo tanto, quedan 10 bombones de chocolate blanco sin nueces."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Mínimo Común Múltiplo (MCM/MCD)",
    "pregunta": "Tres autobuses salen de una terminal. El primero sale cada 12 minutos, el segundo cada 15 minutos y el tercero cada 20 minutos. Si todos salen juntos a las 8:00 AM, ¿cuánto tiempo pasará para que vuelvan a coincidir en la salida?",
    "opciones": ["60 minutos", "45 minutos", "30 minutos", "120 minutos"],
    "correcta": "60 minutos",
    "justificacion": "Calculamos el M.C.M. de 12, 15 y 20. Descomposición: 12=2^2*3, 15=3*5, 20=2^2*5. M.C.M = 2^2 * 3 * 5 = 60. Coincidirán de nuevo en 60 minutos."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Planteamiento de Ecuaciones",
    "pregunta": "Un niño tiene monedas de 5 y 10 centavos. Si en total tiene 20 monedas que suman $1.50 (150 centavos), ¿cuántas monedas de 5 centavos tiene?",
    "opciones": ["10", "12", "15", "8"],
    "correcta": "10",
    "justificacion": "Sea x las monedas de 5 e y las de 10. x + y = 20. 5x + 10y = 150. Multiplicamos la primera por 10: 10x + 10y = 200. Restamos la segunda: 5x = 50 -> x = 10. Tiene 10 monedas de 5 centavos."
  }
];

const todas = [...preguntas, ...nuevas];

const filePath = 'preguntas.json';

try {
  let rawdata = fs.readFileSync(filePath);
  let db = JSON.parse(rawdata);
  
  let ultimo_id = db.length > 0 ? Math.max(...db.map(p => p.id || 0)) : 0;
  
  todas.forEach((p, index) => {
    p.id = ultimo_id + index + 1;
    db.push(p);
  });
  
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Se agregaron ' + todas.length + ' preguntas. Total: ' + db.length);
} catch (err) {
  console.error('Error procesando:', err);
}
