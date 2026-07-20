const fs = require('fs');

const preguntas = [
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Números Pares y Ecuaciones",
    "pregunta": "Si la suma de dos números pares consecutivos es 110, entonces el número menor es:",
    "opciones": ["46", "48", "52", "54"],
    "correcta": "54",
    "justificacion": "Sean los números pares consecutivos 2x y 2x+2. Su suma es 4x + 2 = 110. Restamos 2: 4x = 108. Dividimos entre 4: x = 27. El número menor es 2x = 2(27) = 54. El mayor sería 56. Comprobación: 54 + 56 = 110."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Secuencias y Progresiones",
    "pregunta": "Una noticia se difunde en una red social. Inicialmente, 3 personas comparten la noticia. Durante la siguiente hora, cada una de esas 3 personas comparte la noticia con otros 3 contactos nuevos. Si este proceso se repite de manera similar cada hora, ¿cuántas personas habrán recibido la noticia después de 3 horas?",
    "opciones": ["120", "81", "78", "150"],
    "correcta": "120",
    "justificacion": "Inicialmente (hora 0) son 3 personas. En la hora 1, se suman 3x3=9 (total=12). En la hora 2, se suman 9x3=27 (total=39). En la hora 3, se suman 27x3=81. Total acumulado = 39 + 81 = 120 personas."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Mínimo Común Múltiplo (MCM/MCD)",
    "pregunta": "En una estación de autobuses, el autobús de la ruta A sale cada 15 minutos, y el autobús de la ruta B sale cada 20 minutos. Si a las 7:00 AM ambos autobuses salieron al mismo tiempo, ¿a qué hora volverán a salir juntos por primera vez?",
    "opciones": ["8:00am", "7:30am", "8:30am", "9:00am"],
    "correcta": "8:00am",
    "justificacion": "Para encontrar la próxima coincidencia, calculamos el MCM de 15 y 20. MCM(15, 20) = 60 minutos. Sumando 60 minutos (1 hora) a las 7:00 AM, coinciden de nuevo a las 8:00 AM."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Aritmética Básica",
    "pregunta": "Un estudiante recibe 50 puntos al inicio de un concurso. Por cada respuesta correcta que dé, se le suman 5 puntos, y por cada respuesta incorrecta, se le restan 2 puntos. Si al final del concurso respondió 15 preguntas de las cuales 10 fueron correctas, ¿cuántos puntos obtuvo en total?",
    "opciones": ["90", "40", "70", "60"],
    "correcta": "90",
    "justificacion": "Puntos iniciales: 50. Puntos por 10 respuestas correctas: 10 * 5 = +50. Si respondió 15 en total y 10 son correctas, entonces 5 son incorrectas. Puntos por 5 incorrectas: 5 * (-2) = -10. Puntuación final = 50 + 50 - 10 = 90 puntos."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Interpretación de Gráficos",
    "pregunta": "El siguiente gráfico de barras muestra el número de visitantes que recibió un museo durante los primeros cuatro meses del año: Enero (200), Febrero (500), Marzo (400), Abril (300). ¿Cuál fue el promedio de visitantes por mes durante este período?",
    "opciones": ["400", "350", "250", "300"],
    "correcta": "350",
    "justificacion": "El promedio se calcula sumando los valores y dividiendo entre la cantidad de meses: (200 + 500 + 400 + 300) / 4 = 1400 / 4 = 350 visitantes por mes."
  },
  {
    "area": "Razonamiento Espacial",
    "tema": "Orientación",
    "pregunta": "Una persona camina inicialmente hacia el sur. En la primera esquina, gira a la derecha. En la siguiente esquina, vuelve a girar a la derecha. Finalmente, en la tercera esquina, gira a la izquierda. ¿En qué dirección se encuentra caminando ahora?",
    "opciones": ["Norte", "Sur", "Este", "Oeste"],
    "correcta": "Oeste",
    "justificacion": "Inicia hacia el Sur. Girar a la derecha mirando al Sur te orienta hacia el Oeste. Girar a la derecha mirando al Oeste te orienta hacia el Norte. Girar a la izquierda mirando al Norte te orienta hacia el Oeste."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Sistemas de Ecuaciones",
    "pregunta": "En una reunión hay personas de tres profesiones: abogados, ingenieros y médicos. Sin contar a los abogados, hay 35 personas. Sin contar a los ingenieros, hay 40 personas. Sin contar a los médicos, hay 25 personas. ¿Cuántos ingenieros hay en la reunión?",
    "opciones": ["10", "15", "20", "25"],
    "correcta": "10",
    "justificacion": "Ecuaciones: I + M = 35; A + M = 40; A + I = 25. Sumando las 3: 2(A + I + M) = 100 -> Total de personas (A+I+M) = 50. Como A+M=40, los ingenieros son Total - (A+M) = 50 - 40 = 10."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Planteamiento de Ecuaciones",
    "pregunta": "Si a un número se le suma uno y el resultado se eleva al cuadrado, se obtiene cero. ¿Cuál es ese número?",
    "opciones": ["1", "-1", "2", "-2"],
    "correcta": "-1",
    "justificacion": "Sea x el número. (x + 1)^2 = 0. Sacando raíz a ambos lados: x + 1 = 0, por lo tanto x = -1."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Fracciones",
    "pregunta": "Los niños sirvieron chicha y limonada para una reunión en diferentes bandejas. Alex tiene 3 de chicha y 2 de limonada. Bea tiene 2 de chicha y 3 de limonada. Ciro tiene 1 de chicha y 2 de limonada. Dora tiene 4 de chicha y ninguna limonada. ¿Quiénes sirvieron 1/3 de los vasos con chicha en su bandeja?",
    "opciones": ["Ciro", "Bea", "Alex y Ciro", "Bea y Ciro"],
    "correcta": "Ciro",
    "justificacion": "La bandeja de Ciro tiene 1 chicha y 2 limonadas, un total de 3 vasos. La proporción de chicha es 1/3. Bea tiene 2/5, Alex 3/5 y Dora 4/4=1."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Porcentajes y Aleaciones",
    "pregunta": "Un joyero tiene una aleación de 200 gramos que contiene 30% de oro y el resto de plata. Si desea tener una aleación con igual porcentaje de oro y plata, manteniendo los mismos 200 gramos de aleación, ¿qué debería hacer el joyero?",
    "opciones": ["Añadir 30 gramos de oro y retirar 30 gramos de plata.", "Añadir 40 gramos de oro y retirar 40 gramos de plata.", "Retirar 30 gramos de oro y añadir 30 gramos de plata.", "Retirar 40 gramos de oro y añadir 40 gramos de plata."],
    "correcta": "Añadir 40 gramos de oro y retirar 40 gramos de plata.",
    "justificacion": "Inicialmente hay 60g de oro (30% de 200) y 140g de plata. Desea igual cantidad (50% y 50%), es decir 100g de oro y 100g de plata. Por tanto, debe añadir 40g de oro (60+40=100) y retirar 40g de plata (140-40=100)."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Aritmética de Tiempos y Producción",
    "pregunta": "Una máquina A produce 5 artículos por minuto, mientras que una máquina B produce 3 artículos por minuto. La máquina A comienza a funcionar 2 minutos después de que la máquina B empieza. ¿Cuántos artículos habrán producido en total después de 10 minutos desde que la máquina B comenzó a funcionar?",
    "opciones": ["80", "70", "60", "50"],
    "correcta": "70",
    "justificacion": "La máquina B trabaja durante 10 minutos completos: 10 * 3 = 30 artículos. La máquina A empezó 2 minutos más tarde, por lo que trabaja solo 8 minutos: 8 * 5 = 40 artículos. Total = 30 + 40 = 70 artículos."
  }
];

const nuevas = [
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Números Impares y Ecuaciones",
    "pregunta": "Si la suma de dos números impares consecutivos es 144, entonces el número mayor es:",
    "opciones": ["71", "73", "75", "69"],
    "correcta": "73",
    "justificacion": "Sean los impares consecutivos 2x+1 y 2x+3. Su suma es 4x + 4 = 144. Restando 4: 4x = 140. Dividiendo entre 4: x = 35. El número mayor es 2(35) + 3 = 70 + 3 = 73. El menor es 71."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Secuencias y Progresiones",
    "pregunta": "Un rumor se esparce en un pueblo. A las 12:00 PM lo conocen 2 personas. Cada hora, cada persona que conoce el rumor se lo cuenta a 4 personas nuevas. ¿Cuántas personas en total conocerán el rumor a las 3:00 PM?",
    "opciones": ["120", "250", "258", "312"],
    "correcta": "250",
    "justificacion": "12:00 PM: 2 personas. A la 1:00 PM: 2 + (2*4) = 10 personas. A las 2:00 PM: 10 + (10*4) = 50 personas. A las 3:00 PM: 50 + (50*4) = 250 personas."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Mínimo Común Múltiplo (MCM/MCD)",
    "pregunta": "Dos campanas suenan en intervalos regulares. La primera suena cada 18 minutos y la segunda cada 24 minutos. Si acaban de sonar juntas a las 10:00 AM, ¿a qué hora volverán a sonar al mismo tiempo?",
    "opciones": ["11:12 AM", "11:00 AM", "11:30 AM", "11:24 AM"],
    "correcta": "11:12 AM",
    "justificacion": "Calculamos el MCM de 18 y 24. MCM(18, 24) = 72 minutos. Sumando 72 minutos (1 hora y 12 minutos) a las 10:00 AM, obtenemos las 11:12 AM."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Aritmética Básica",
    "pregunta": "En un videojuego, un jugador inicia con 100 vidas. Gana 10 vidas por cada nivel superado sin recibir daño y pierde 5 vidas por cada nivel donde recibe daño. Si jugó 20 niveles y en 12 de ellos no recibió daño, ¿con cuántas vidas finalizó?",
    "opciones": ["140", "180", "220", "160"],
    "correcta": "180",
    "justificacion": "Vidas iniciales: 100. Niveles sin daño (12): 12 * +10 = +120. Niveles con daño (20 - 12 = 8): 8 * -5 = -40. Vidas finales = 100 + 120 - 40 = 180 vidas."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Interpretación de Gráficos",
    "pregunta": "Una frutería registra las siguientes ventas en kg de manzanas durante 4 semanas: Semana 1 (150 kg), Semana 2 (250 kg), Semana 3 (200 kg), Semana 4 (120 kg). ¿Cuál fue el promedio de venta semanal?",
    "opciones": ["180 kg", "160 kg", "200 kg", "190 kg"],
    "correcta": "180 kg",
    "justificacion": "Promedio = (150 + 250 + 200 + 120) / 4 = 720 / 4 = 180 kg."
  },
  {
    "area": "Razonamiento Espacial",
    "tema": "Orientación",
    "pregunta": "Estás manejando tu auto hacia el este. Llegas a una intersección y giras a la izquierda. Avanzas una cuadra y giras a la derecha. Luego, haces un giro de 180 grados en U. ¿Hacia dónde te diriges ahora?",
    "opciones": ["Norte", "Sur", "Este", "Oeste"],
    "correcta": "Oeste",
    "justificacion": "Inicias hacia el Este. Al girar a la izquierda, te diriges al Norte. Al girar a la derecha desde el Norte, te diriges al Este. Al hacer un giro en U (180 grados), pasas del Este al Oeste."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Sistemas de Ecuaciones",
    "pregunta": "En un zoológico hay leones, tigres y pumas. Sin contar a los leones, hay 28 animales. Sin contar a los tigres, hay 32 animales. Sin contar a los pumas, hay 20 animales. ¿Cuántos leones hay en el zoológico?",
    "opciones": ["8", "12", "16", "20"],
    "correcta": "12",
    "justificacion": "T + P = 28; L + P = 32; L + T = 20. Sumando: 2(L + T + P) = 80, por lo que L + T + P = 40. Para hallar los leones (L), restamos (T+P) del total: L = 40 - 28 = 12 leones."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Planteamiento de Ecuaciones",
    "pregunta": "Si al doble de un número se le resta tres y el resultado se eleva al cubo, se obtiene -8. ¿Cuál es el número?",
    "opciones": ["1/2", "1", "0", "-1/2"],
    "correcta": "1/2",
    "justificacion": "(2x - 3)^3 = -8. La raíz cúbica de -8 es -2. Entonces, 2x - 3 = -2. Sumando 3: 2x = 1. Por lo tanto, x = 1/2."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Fracciones",
    "pregunta": "En una pizzería ofrecen porciones de pizza de distintos tamaños. Ana pide una que es 1/4 de la pizza entera. Beto pide una de 2/8. Carlos pide una de 3/10. Diana pide 1/5. ¿Quién pidió una porción diferente a 1/4 de la pizza?",
    "opciones": ["Ana", "Beto", "Carlos", "Diana y Carlos"],
    "correcta": "Diana y Carlos",
    "justificacion": "Ana = 1/4. Beto = 2/8, que simplificado es 1/4. Carlos = 3/10 (no es equivalente a 1/4, ya que 1/4 = 2.5/10). Diana = 1/5 = 2/10 (no es 1/4). Por lo tanto, Diana y Carlos pidieron porciones diferentes a 1/4."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Porcentajes y Mezclas",
    "pregunta": "Un chef preparó 500 ml de una bebida que contiene 20% de jugo de naranja puro. Si desea que la concentración aumente al 50% de jugo de naranja sin cambiar el volumen final de 500 ml, ¿qué debe hacer?",
    "opciones": ["Añadir 150 ml de jugo y quitar 150 ml de agua.", "Añadir 300 ml de jugo y quitar 300 ml de agua.", "Añadir 100 ml de jugo y quitar 100 ml de agua.", "Es imposible sin aumentar el volumen."],
    "correcta": "Añadir 150 ml de jugo y quitar 150 ml de agua.",
    "justificacion": "Inicialmente hay 100 ml de jugo (20% de 500). El objetivo es tener 250 ml de jugo (50% de 500). Necesita 150 ml adicionales de jugo. Debe añadir 150 ml de jugo y retirar 150 ml de la mezcla base de agua para mantener los 500 ml."
  },
  {
    "area": "Razonamiento Lógico Numérico",
    "tema": "Aritmética de Tiempos y Producción",
    "pregunta": "Un pintor experimentado pinta 4 paredes por hora y su aprendiz pinta 2 paredes por hora. El aprendiz comienza a trabajar a las 9:00 AM, y el experimentado se une a las 11:00 AM. ¿Cuántas paredes en total habrán pintado juntos para la 1:00 PM?",
    "opciones": ["16", "20", "24", "12"],
    "correcta": "16",
    "justificacion": "El aprendiz trabaja de 9:00 a 1:00 (4 horas), pintando 4 * 2 = 8 paredes. El pintor experimentado trabaja de 11:00 a 1:00 (2 horas), pintando 2 * 4 = 8 paredes. En total, pintaron 8 + 8 = 16 paredes."
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
