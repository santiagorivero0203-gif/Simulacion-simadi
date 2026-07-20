const fs = require('fs');

const guides = {
    verbal: [
        {
            id: "verbal-comprension",
            title: "Comprensión de Lectura",
            content: "Identificar ideas principales, inferencias y detalles explícitos del texto. Es fundamental leer el texto con atención y basarse estrictamente en lo que está escrito o se infiere lógicamente.",
            youtubeId: "",
            references: [
                { guideName: "CAP I RAZ VERBAL GRIS.pdf", pages: "Páginas por definir" }
            ],
            theory: `
                <p>La comprensión de lectura evalúa tu capacidad para entender, analizar e interpretar textos escritos. No se trata solo de decodificar palabras, sino de extraer el mensaje profundo, captar el tono del autor y distinguir entre hechos y opiniones.</p>
                <p>Al enfrentarte a un texto en el examen, no debes usar tus propios conocimientos previos si estos contradicen lo que el texto afirma. Las respuestas correctas <em>siempre</em> se basan en lo escrito explícitamente o inferido lógicamente a partir del material dado.</p>
                
                <h4>Estrategias Clave</h4>
                <ul class="step-list">
                    <li><strong>Lee activamente:</strong> Subraya mentalmente las ideas principales de cada párrafo. Pregúntate: "¿De qué me está hablando este párrafo en específico?".</li>
                    <li><strong>Identifica el tono:</strong> ¿El autor está informando objetivamente, criticando una postura, persuadiendo al lector o siendo irónico?</li>
                    <li><strong>Diferencia entre lo literal y lo inferencial:</strong> Lo literal está escrito tal cual; lo inferencial es una conclusión lógica que se desprende de lo escrito (ej. si dice "el suelo estaba mojado y el cielo gris", infieres que llovió).</li>
                </ul>

                <div class="guide-example-box" style="margin-top: 2rem;">
                    <div class="example-title">Ejemplo de Comprensión</div>
                    <p><em>Texto:</em> "En 1775, convivieron en Venezuela una curandería desbordante y libre con una curandería selecta aprobada por las autoridades coloniales, lo que generaba constantes roces en la incipiente sociedad médica."</p>
                    <p><strong>Pregunta:</strong> ¿Qué se puede afirmar sobre el ejercicio médico en Venezuela en 1775?</p>
                    <p><strong>Análisis:</strong> El texto habla de dos tipos de curanderos: unos libres (sin control) y otros aprobados. Esto significa que convivían personas autorizadas con personas sin control oficial, creando conflictos. La respuesta debe reflejar exactamente esta dualidad sin agregar información externa sobre la historia médica de Venezuela.</p>
                </div>
            `,
            pastExams: [
                {
                    pregunta: "Del texto sobre la curandería en Venezuela colonial (1775), se infiere que los estudios universitarios de medicina:",
                    opciones: ["Eran reservados a los blancos.", "Eran accesibles para todos.", "No existían en esa época.", "Eran impartidos por los indígenas."],
                    correcta: "Eran reservados a los blancos.",
                    resolucion: "El texto (Don Lorenzo Campins) se queja de que la medicina había decaído en manos de 'Mulatos o Negros' ya que pocos cursaban la profesión. Esto denota el contexto colonial donde los pardos/mestizos no tenían fácil acceso a la universidad."
                }
            ],
            practiceTopics: ["Comprensión Lectora"]
        },
        {
            id: "verbal-ordenacion",
            title: "Ordenación Lógica de Párrafos",
            content: "Reconstruir el orden original de un texto desordenado. Busca conectores lógicos, la introducción del tema, el desarrollo y la conclusión.",
            youtubeId: "",
            references: [
                { guideName: "CAP II RAZ VERBAL GRIS.pdf", pages: "Páginas por definir" }
            ],
            theory: `
                <p>Este tipo de pregunta requiere que organices una serie de oraciones (generalmente numeradas) para formar un párrafo coherente y con sentido lógico. Evalúa tu comprensión de la estructura de un texto (introducción, nudo/desarrollo y desenlace/conclusión).</p>
                
                <h4>Pasos para resolver</h4>
                <ul class="step-list">
                    <li>Busca la <strong>oración introductoria</strong>: Suele presentar el tema de forma general o dar un concepto amplio. <em>Nunca</em> comienza con pronombres referenciales como "Estos", "Por lo tanto", o "Sin embargo".</li>
                    <li>Encuentra <strong>conectores lógicos</strong>: Palabras como "Además", "En conclusión", "Por otro lado", "Primero", "Segundo" te indican el orden forzado de dos oraciones.</li>
                    <li>Establece <strong>secuencias temporales o lógicas</strong>: Busca relaciones de causa-efecto o cronología (del pasado al presente, del problema a la solución).</li>
                </ul>

                <div class="guide-example-box" style="margin-top: 2rem;">
                    <div class="example-title">Ejemplo de Ordenación</div>
                    <p>Ordena cronológicamente y por lógica deductiva:<br>
                    (1) Por lo tanto, el ejercicio regular es vital para mantener un corazón sano.<br>
                    (2) El sedentarismo causa problemas cardiovasculares a largo plazo.<br>
                    (3) Muchas personas hoy en día trabajan sentadas y no hacen actividad física.</p>
                    <p><strong>Resolución paso a paso:</strong></p>
                    <ul style="margin-left: 1rem; margin-bottom: 1rem;">
                        <li>La oración (3) introduce el contexto actual (el problema general).</li>
                        <li>La oración (2) explica las consecuencias médicas de esa situación (causa-efecto).</li>
                        <li>La oración (1) ofrece una conclusión a partir de lo planteado ("Por lo tanto").</li>
                    </ul>
                    <p><strong>Orden Correcto:</strong> (3) -> (2) -> (1)</p>
                </div>
            `,
            pastExams: [
                {
                    pregunta: "Ordena: (1) Sin embargo, requiere práctica. (2) El ajedrez es un deporte mental. (3) Desarrolla habilidades. (4) Mejora el rendimiento académico.",
                    opciones: ["(2)(3)(1)(4)", "(1)(2)(3)(4)", "(3)(2)(4)(1)", "(4)(3)(2)(1)"],
                    correcta: "(2)(3)(1)(4)",
                    resolucion: "Se presenta el tema (2), se enumeran beneficios (3), se introduce un contraste (1), se concluye con evidencia (4)."
                }
            ],
            practiceTopics: ["Ordenación Lógica de Párrafos"]
        },
        {
            id: "verbal-completacion",
            title: "Completación de Oraciones y Conectores",
            content: "Rellenar blancos con concordancia gramatical y semántica, utilizando los conectores adecuados.",
            youtubeId: "",
            references: [
                { guideName: "conectores textuales benjamin final.pdf", pages: "Páginas por definir" }
            ],
            theory: `
                <p>Debes seleccionar la pareja de palabras o el conector que al insertarse en los espacios en blanco le den a la oración un sentido lógico, coherente y gramaticalmente correcto.</p>
                
                <h4>Estrategias</h4>
                <ul class="step-list">
                    <li><strong>Concordancia gramatical:</strong> Verifica siempre el género (masculino/femenino), número (singular/plural) y el tiempo verbal. Muchas opciones se descartan solo porque no concuerdan.</li>
                    <li><strong>Predicción por Contexto:</strong> Lee la oración completa tapando las opciones e intenta adivinar qué palabra encajaría. Luego, busca en las opciones la que más se parezca a tu predicción.</li>
                    <li><strong>Relación Lógica (Conectores):</strong> Identifica si la oración expresa:
                        <ul>
                            <li><em>Causa-efecto:</em> por lo tanto, en consecuencia, así que.</li>
                            <li><em>Oposición/Contraste:</em> sin embargo, no obstante, por el contrario.</li>
                            <li><em>Adición:</em> además, también, asimismo.</li>
                        </ul>
                    </li>
                </ul>

                <div class="guide-example-box" style="margin-top: 2rem;">
                    <div class="example-title">Ejemplo de Completación</div>
                    <p><em>El equipo jugó extraordinariamente bien durante todo el campeonato; _________, perdió el partido decisivo.</em></p>
                    <p><strong>Opciones:</strong> a) por lo tanto, b) además, c) sin embargo, d) en efecto.</p>
                    <p><strong>Análisis:</strong> Existe una relación de contraste. Si jugaron bien, se esperaría que ganaran. El hecho de que perdieran rompe esa expectativa. El conector adecuado para expresar una contrariedad u oposición es "sin embargo" o "no obstante".</p>
                    <p><strong>Respuesta:</strong> c) sin embargo.</p>
                </div>
            `,
            pastExams: [
                {
                    pregunta: "El equipo jugó bien; _________, perdió el partido.",
                    opciones: ["no obstante", "por lo tanto", "además", "en efecto"],
                    correcta: "no obstante",
                    resolucion: "Existe una relación de oposición o contraste. Se esperaba que ganara por jugar bien, pero perdió. 'No obstante' marca esa contrariedad."
                }
            ],
            practiceTopics: ["Completación de Oraciones", "Conectores Textuales"]
        },
        {
            id: "verbal-sinonimos",
            title: "Sinónimos y Analogías",
            content: "Identificar palabras con significado equivalente o relaciones lógicas entre pares de palabras.",
            youtubeId: "",
            references: [
                { guideName: "CAP I RAZ VERBAL GRIS.pdf", pages: "Páginas por definir" }
            ],
            theory: `
                <p>Esta sección evalúa la amplitud de tu léxico y tu capacidad de establecer relaciones lógicas. Es crucial tomar en cuenta el <strong>contexto</strong> en que se utiliza la palabra, ya que un mismo término puede significar cosas muy distintas dependiendo de la oración.</p>
                
                <h4>Analogías Comunes</h4>
                <p>Las analogías establecen relaciones de semejanza entre dos pares de conceptos. Para resolverlas, descubre la relación exacta entre el primer par (la premisa) y busca la misma relación en las opciones.</p>
                <ul class="step-list">
                    <li><strong>Objeto a función:</strong> Telescopio - Observar / Cuchillo - Cortar.</li>
                    <li><strong>Parte a todo:</strong> Página - Libro / Hoja - Árbol.</li>
                    <li><strong>Causa a efecto:</strong> Fuego - Calor / Virus - Enfermedad.</li>
                    <li><strong>Antonimia:</strong> Luz - Oscuridad / Alegría - Tristeza.</li>
                </ul>

                <div class="guide-example-box" style="margin-top: 2rem;">
                    <div class="example-title">Ejemplo de Sinónimo en Contexto</div>
                    <p><em>En medio del acalorado debate, el político decidió <strong>zanjar</strong> la discusión aceptando las críticas de sus opositores.</em></p>
                    <p><strong>Opciones:</strong> a) cavar, b) ignorar, c) concluir, d) fomentar.</p>
                    <p><strong>Análisis:</strong> Aunque "zanjar" literalmente significa abrir zanjas (cavar), en este contexto figurado significa "resolver" o "terminar" un asunto. Por lo tanto, el sinónimo correcto en este contexto es "concluir".</p>
                </div>
            `,
            pastExams: [
                {
                    pregunta: "TELESCOPIO es a OBSERVAR lo que MICROSCOPIO es a:",
                    opciones: ["amplificar", "reducir", "iluminar", "comprimir"],
                    correcta: "amplificar",
                    resolucion: "Ambos son instrumentos ópticos. El telescopio observa lo lejano, el microscopio amplifica lo diminuto. La relación es instrumento-función."
                }
            ],
            practiceTopics: ["Sinónimos en Contexto", "Analogías y Relaciones Semánticas"]
        }
    ],
    logico: [
        {
            id: "logico-cuadraticas",
            title: "Ecuaciones Cuadráticas",
            content: "Resolución de ecuaciones de la forma ax² + bx + c = 0 mediante factorización o usando la fórmula general.",
            youtubeId: "",
            references: [
                { guideName: "Cap. V MATEMÁTICA.pdf", pages: "Páginas por definir" }
            ],
            theory: `
                <p>Una ecuación cuadrática tiene la forma general <strong>ax² + bx + c = 0</strong>, donde <em>x</em> es la incógnita y su mayor exponente es 2. Una ecuación cuadrática siempre tendrá hasta dos soluciones o raíces posibles.</p>
                
                <h4>Métodos de Resolución</h4>
                <ul class="step-list">
                    <li><strong>Factorización (Trinomios):</strong> Si a=1, busca dos números que sumados den <em>b</em> y multiplicados den <em>c</em>. Ej: Para x² + 5x + 6 = 0, los números son 2 y 3. Queda (x+2)(x+3)=0.</li>
                    <li><strong>Factor Común / Diferencia de Cuadrados:</strong> Si falta el término c (ej. x² - 4x = 0), saca factor común x(x - 4) = 0. Si falta b (ej. x² - 9 = 0), despeja directamente o factoriza como (x-3)(x+3)=0.</li>
                    <li><strong>Fórmula General:</strong> La "vieja confiable". Funciona para cualquier cuadrática, incluso si no parece factorizable.</li>
                </ul>
                <div class="formula-box">
                    x = [ -b ± √(b² - 4ac) ] / 2a
                </div>

                <div class="guide-example-box" style="margin-top: 2rem;">
                    <div class="example-title">Ejemplo de Resolución Rápida</div>
                    <p><strong>Resolver:</strong> x² - 5x + 6 = 0</p>
                    <p><strong>Método:</strong> Factorización simple.</p>
                    <p><strong>Análisis:</strong> El coeficiente de x² es 1. Buscamos dos números que multiplicados den +6 y que sumados den -5.</p>
                    <p>Probamos factores de 6: (1 y 6), (-1 y -6), (2 y 3), (-2 y -3).</p>
                    <p>El par (-2, -3) cumple: (-2) × (-3) = +6 y (-2) + (-3) = -5.</p>
                    <p>Escribimos la ecuación factorizada: (x - 2)(x - 3) = 0.</p>
                    <p>Para que la multiplicación sea cero, x debe ser igual a 2 o x debe ser igual a 3.</p>
                </div>
            `,
            pastExams: [
                {
                    pregunta: "Resolver: x² - 5x + 6 = 0",
                    opciones: ["x = 3 y x = 2", "x = -3 y x = -2", "x = 6 y x = -1", "x = 1 y x = 5"],
                    correcta: "x = 3 y x = 2",
                    resolucion: "Buscamos dos números que sumen -5 y multipliquen +6. Estos son -3 y -2. La ecuación se factoriza como (x - 3)(x - 2) = 0. Las soluciones son x = 3 y x = 2."
                }
            ],
            practiceTopics: ["Ecuaciones Cuadráticas"]
        },
        {
            id: "logico-fracciones",
            title: "Fracciones, Proporciones y Regla de Tres",
            content: "Operaciones con fracciones y aplicación de la regla de tres en problemas de la vida real.",
            youtubeId: "",
            references: [
                { guideName: "Cap I y II MATEMÁTICA-1.pdf", pages: "Páginas por definir" }
            ],
            theory: `
                <p>Las fracciones miden proporciones respecto a un todo. Operar con soltura es vital para la mayoría de los problemas de matemáticas. La regla de tres es una aplicación práctica directa de estas proporciones.</p>
                
                <h4>Conceptos Clave</h4>
                <ul class="step-list">
                    <li><strong>Multiplicación y División:</strong> La multiplicación es lineal (numerador con numerador). La división se hace multiplicando en cruz o usando la "doble C" (extremos por extremos, medios por medios).</li>
                    <li><strong>Regla de Tres Directa:</strong> Las variables crecen juntas. Si aumentan los kilos de manzanas, aumenta el precio. (Multiplica cruzado, divide por el sobrante).</li>
                    <li><strong>Regla de Tres Inversa:</strong> Una variable crece y la otra disminuye. Si aumentan los obreros, disminuyen los días para terminar una obra. (Multiplica en línea recta, divide por el sobrante).</li>
                </ul>

                <div class="guide-example-box" style="margin-top: 2rem;">
                    <div class="example-title">Ejemplo de Fracciones Aplicadas</div>
                    <p><strong>Problema:</strong> Un tanque de agua está lleno hasta sus 3/4 partes. Si se le extraen 15 litros, el tanque queda a la mitad de su capacidad total. ¿Cuál es la capacidad total del tanque?</p>
                    <p><strong>Planteamiento:</strong> Sea X la capacidad total.<br>
                    3/4 X - 15 = 1/2 X</p>
                    <p><strong>Resolución:</strong><br>
                    1. Pasamos (1/2 X) a la izquierda y el 15 a la derecha:<br>
                    3/4 X - 1/2 X = 15<br>
                    2. Homogeneizamos denominadores: 1/2 = 2/4.<br>
                    3/4 X - 2/4 X = 15<br>
                    1/4 X = 15<br>
                    3. Despejamos X multiplicando por 4:<br>
                    X = 15 × 4 = <strong>60 litros.</strong></p>
                </div>
            `,
            pastExams: [
                {
                    pregunta: "Con 3/4 de litros de vino se llenan 5 copas. ¿Cuál es la capacidad de cada copa?",
                    opciones: ["3/20 litros", "15/4 litros", "4/15 litros", "1/5 litros"],
                    correcta: "3/20 litros",
                    resolucion: "Hay que dividir la cantidad total (3/4) entre 5. (3/4) ÷ 5 = (3/4) × (1/5) = 3/20 litros."
                }
            ],
            practiceTopics: ["Fracciones", "Regla de Tres y Proporciones", "Porcentajes"]
        },
        {
            id: "logico-probabilidades",
            title: "Probabilidades",
            content: "Cálculo de la probabilidad clásica: casos favorables entre casos posibles.",
            youtubeId: "",
            references: [
                { guideName: "Guía de Probabilidades", pages: "Páginas por definir" }
            ],
            theory: `
                <p>La probabilidad es una rama de las matemáticas que mide el grado de certeza de que ocurra un evento aleatorio. Se expresa matemáticamente como un valor entre 0 (imposible) y 1 (evento seguro), pudiendo representarse en fracciones, decimales o porcentajes (0% a 100%).</p>
                
                <h4>Ley de Laplace</h4>
                <p>En situaciones donde todos los resultados son igualmente probables (como tirar un dado legal o lanzar una moneda equilibrada), se utiliza la Ley de Laplace:</p>
                <div class="formula-box">
                    P(A) = Número de Casos Favorables / Número Total de Casos Posibles
                </div>
                
                <h4>Reglas Importantes</h4>
                <ul class="step-list">
                    <li><strong>Probabilidad de eventos independientes (Regla del "Y"):</strong> Si lanzas dos dados y quieres que salga 6 en el primero Y 6 en el segundo, se MULTIPLICAN sus probabilidades (1/6 × 1/6 = 1/36).</li>
                    <li><strong>Probabilidad de eventos mutuamente excluyentes (Regla del "O"):</strong> Si quieres sacar un 2 O un 5 en un solo dado, se SUMAN sus probabilidades (1/6 + 1/6 = 2/6 = 1/3).</li>
                </ul>

                <div class="guide-example-box" style="margin-top: 2rem;">
                    <div class="example-title">Ejemplo Básico de Urnas</div>
                    <p><strong>Problema:</strong> En una bolsa hay 4 bolas rojas, 3 azules y 5 verdes. Se extrae una bola al azar. ¿Cuál es la probabilidad de que NO sea roja?</p>
                    <p><strong>Análisis:</strong><br>
                    - Casos Totales = 4 (rojas) + 3 (azules) + 5 (verdes) = 12 bolas en total.<br>
                    - Casos Favorables = Bolas que NO son rojas = 3 (azules) + 5 (verdes) = 8 bolas.<br>
                    - Aplicando Laplace: P = 8 / 12.<br>
                    - Simplificando la fracción (dividiendo entre 4 arriba y abajo): P = <strong>2/3</strong>.</p>
                </div>
            `,
            pastExams: [
                {
                    pregunta: "Se lanza un dado justo. ¿Cuál es la probabilidad de obtener un número par?",
                    opciones: ["1/2", "1/3", "1/6", "2/3"],
                    correcta: "1/2",
                    resolucion: "Números pares en un dado: {2, 4, 6} = 3 casos favorables. Total de caras: 6. P = 3/6 = 1/2."
                }
            ],
            practiceTopics: ["Probabilidades"]
        },
        {
            id: "logico-mcm",
            title: "Teoría de Números (MCM y MCD)",
            content: "Cálculo del Mínimo Común Múltiplo y Máximo Común Divisor aplicados a problemas de sincronización y reparto.",
            youtubeId: "",
            references: [
                { guideName: "Cap I y II MATEMÁTICA-1.pdf", pages: "Páginas por definir" }
            ],
            theory: `
                <p>La descomposición en factores primos es la herramienta básica para hallar el Mínimo Común Múltiplo (MCM) y el Máximo Común Divisor (MCD). Dominar cuándo usar cada uno es vital para la resolución de problemas lógicos.</p>
                
                <h4>¿Cuándo usar cuál?</h4>
                <ul class="step-list">
                    <li><strong>Mínimo Común Múltiplo (MCM):</strong> Se utiliza para problemas de "coincidencia" o "sincronización" en el futuro. (Ej: semáforos que cambian a distintos tiempos, personas corriendo en una pista, tomar pastillas cada X horas).<br>
                    <em>Regla matemática:</em> Factores comunes y NO comunes con su MAYOR exponente.</li>
                    
                    <li><strong>Máximo Común Divisor (MCD):</strong> Se utiliza para problemas de "reparto", "división" o "corte equitativo" buscando el tamaño máximo. (Ej: cortar listones de madera del mayor tamaño posible sin que sobre nada, armar paquetes idénticos).<br>
                    <em>Regla matemática:</em> ÚNICAMENTE factores comunes con su MENOR exponente.</li>
                </ul>

                <div class="guide-example-box" style="margin-top: 2rem;">
                    <div class="example-title">Ejemplo Comparativo</div>
                    <p><strong>Situación A (Sincronización):</strong> Dos campanas suenan, una cada 15 min y otra cada 25 min. ¿Cuándo volverán a coincidir?</p>
                    <p>-> Requiere <strong>MCM</strong>. Descomponemos: 15 = 3×5. 25 = 5². MCM = 3 × 5² = 3 × 25 = 75. Coincidirán en 75 minutos.</p>
                    <br>
                    <p><strong>Situación B (Reparto):</strong> Tienes dos cuerdas, una de 15m y otra de 25m. Quieres cortarlas en trozos iguales lo más largos posibles, sin que sobre nada.</p>
                    <p>-> Requiere <strong>MCD</strong>. Descomponemos igual. Factores comunes con menor exponente: Solo el 5¹. Los trozos deben ser de 5 metros cada uno.</p>
                </div>
            `,
            pastExams: [
                {
                    pregunta: "Tres autobuses salen juntos. El primero tarda 10 min en dar la vuelta, el segundo 15 min y el tercero 20 min. ¿En cuántos minutos volverán a coincidir?",
                    opciones: ["60 min", "30 min", "120 min", "45 min"],
                    correcta: "60 min",
                    resolucion: "Se calcula el MCM de 10, 15 y 20. 10=2x5, 15=3x5, 20=2²x5. MCM = 2² x 3 x 5 = 4 x 15 = 60 minutos."
                }
            ],
            practiceTopics: ["Teoría de Números (MCM/MCD)", "Mínimo Común Múltiplo (MCM/MCD)"]
        }
    ],
    ciencia: [
        {
            id: "ciencia-logaritmos",
            title: "Logaritmos y Ecuaciones Exponenciales",
            content: "Aplicación de las propiedades de los logaritmos, resolución de ecuaciones logarítmicas y uso de la fórmula de cambio de base.",
            youtubeId: "",
            references: [
                { guideName: "LOGARITMO y EXPONENCIALES UCV.pdf", pages: "Páginas por definir" }
            ],
            theory: `
                <p>Un logaritmo responde a la pregunta inversa de la potenciación: ¿A qué exponente debo elevar una base para obtener cierto número? Ej: log₂(8) = 3 porque 2³ = 8. Los logaritmos son muy útiles para "despejar" incógnitas que se encuentran en los exponentes.</p>
                
                <h4>Propiedades Fundamentales</h4>
                <p>Estas propiedades te permiten simplificar expresiones complejas:</p>
                <div class="formula-box" style="text-align: left; padding: 1.5rem; display: inline-block;">
                    <strong>1. Suma a Producto:</strong> log(A × B) = log(A) + log(B)<br>
                    <strong>2. Resta a Cociente:</strong> log(A / B) = log(A) - log(B)<br>
                    <strong>3. Baja el exponente:</strong> log(Aⁿ) = n × log(A)<br>
                    <strong>4. Identidades clave:</strong> logₐ(a) = 1 ; log(1) = 0<br>
                    <strong>5. Cambio de base:</strong> log_b(A) = log_c(A) / log_c(b)
                </div>

                <div class="guide-example-box" style="margin-top: 2rem;">
                    <div class="example-title">Ejemplo: Uso de Propiedades</div>
                    <p><strong>Problema:</strong> Simplificar la expresión E = log(50) + log(2)</p>
                    <p><strong>Resolución:</strong><br>
                    En vez de intentar buscar el valor decimal de cada logaritmo (asumiendo base 10 implícita), usamos la propiedad #1 (Suma a Producto).<br>
                    E = log(50 × 2)<br>
                    E = log(100)<br>
                    Ahora nos preguntamos: ¿A qué exponente elevo la base (10) para obtener 100?<br>
                    10² = 100. Por lo tanto, E = <strong>2</strong>.</p>
                </div>
            `,
            pastExams: [
                {
                    pregunta: "Resolver log₃(x) + log₃(2) = 1",
                    opciones: ["x = 3/2", "x = 2/3", "x = 6", "x = 1.5"],
                    correcta: "x = 3/2",
                    resolucion: "1. Aplicar propiedad de suma (multiplicación): log₃(2x) = 1. 2. Convertir a exponencial: 3¹ = 2x. 3. Despejar x: x = 3/2."
                }
            ],
            practiceTopics: ["Logaritmos", "Ecuaciones Exponenciales", "Sistemas Logarítmicos"]
        },
        {
            id: "ciencia-geometria",
            title: "Geometría (Áreas y Volúmenes)",
            content: "Cálculo de áreas, perímetros, volúmenes y aplicación del Teorema de Pitágoras.",
            youtubeId: "",
            references: [
                { guideName: "GOMETRIA UCV 2024-2025.pdf", pages: "Páginas por definir" }
            ],
            graphics: `
            <svg viewBox="0 0 200 100" width="100%" height="150" xmlns="http://www.w3.org/2000/svg">
                <!-- Triángulo rectángulo -->
                <polygon points="50,80 150,80 50,20" fill="#E2E8F0" stroke="#3B82F6" stroke-width="2"/>
                <!-- Ángulo recto -->
                <polyline points="50,70 60,70 60,80" fill="none" stroke="#3B82F6" stroke-width="2"/>
                <!-- Etiquetas -->
                <text x="95" y="95" font-family="monospace" font-size="12">b (cateto)</text>
                <text x="15" y="55" font-family="monospace" font-size="12">a (cateto)</text>
                <text x="110" y="45" font-family="monospace" font-size="12" transform="rotate(30 110,45)">c (hipotenusa)</text>
            </svg>
            `,
            theory: `
                <p>La geometría plana estudia figuras bidimensionales (cálculo de áreas y perímetros) y la geometría espacial estudia figuras tridimensionales (cálculo de volúmenes).</p>
                
                <h4>Fórmulas Básicas Fundamentales</h4>
                <ul class="step-list">
                    <li><strong>Triángulo:</strong> Área = (base × altura) / 2</li>
                    <li><strong>Rectángulo:</strong> Área = base × altura | Perímetro = suma de sus 4 lados.</li>
                    <li><strong>Círculo:</strong> Área = π × r² | Perímetro (Circunferencia) = 2 × π × r</li>
                    <li><strong>Teorema de Pitágoras:</strong> c² = a² + b² (siendo 'c' la hipotenusa, válida única y exclusivamente para triángulos rectángulos).</li>
                    <li><strong>Volumen de Prisma/Cilindro:</strong> Volumen = (Área de la base) × altura.</li>
                </ul>

                <div class="guide-example-box" style="margin-top: 2rem;">
                    <div class="example-title">Ejemplo de Áreas Combinadas</div>
                    <p><strong>Problema:</strong> Tienes un rectángulo de 10m de largo por 6m de ancho. Se le recorta en su interior un círculo de radio 2m. ¿Cuál es el área sobrante?</p>
                    <p><strong>Resolución:</strong><br>
                    1. Calculamos el área total del rectángulo: A_rect = 10 × 6 = 60 m².<br>
                    2. Calculamos el área del círculo: A_circ = π × 2² = 4π (aprox. 12.56 m²).<br>
                    3. Restamos el área recortada: Área Sobrante = <strong>60 - 4π m²</strong>.</p>
                </div>
            `,
            pastExams: [
                {
                    pregunta: "En un triángulo rectángulo, los catetos miden 3 cm y 4 cm. ¿Cuánto mide la hipotenusa?",
                    opciones: ["5 cm", "6 cm", "7 cm", "8 cm"],
                    correcta: "5 cm",
                    resolucion: "Usando Pitágoras: h² = 3² + 4² = 9 + 16 = 25. h = √25 = 5 cm."
                }
            ],
            practiceTopics: ["Geometría", "Volumen"]
        },
        {
            id: "ciencia-fisica",
            title: "Física (Cinemática y Unidades)",
            content: "Conversión de unidades del SI y resolución de problemas de MRU, MRUV y Caída Libre.",
            youtubeId: "",
            references: [
                { guideName: "2. cinematica.pdf", pages: "Páginas por definir" }
            ],
            theory: `
                <p>La cinemática es la rama de la física que estudia el movimiento de los cuerpos geométricamente, sin tomar en cuenta las fuerzas que lo producen. Es crucial dominar el Sistema Internacional de unidades (SI) y la conversión entre ellas (ej. km/h a m/s).</p>
                
                <h4>Tipos de Movimiento y Fórmulas</h4>
                <ul class="step-list">
                    <li><strong>MRU (Movimiento Rectilíneo Uniforme):</strong> La velocidad es constante (no hay aceleración).<br>
                    <em>Fórmula:</em> d = v × t (Distancia = Velocidad × Tiempo)</li>
                    
                    <li><strong>MRUV (Movimiento Rectilíneo Uniformemente Variado):</strong> Existe una aceleración constante, lo que hace que la velocidad cambie en el tiempo.<br>
                    <em>Fórmula de velocidad:</em> v_f = v_i + a × t<br>
                    <em>Fórmula de distancia:</em> d = v_i × t + (a × t²) / 2</li>
                    
                    <li><strong>Caída Libre:</strong> Es un MRUV vertical donde la aceleración (a) es la gravedad (g ≈ 9.8 o 10 m/s²).</li>
                </ul>
                
                <div class="formula-box">
                    <strong>Conversión rápida:</strong><br>
                    Para pasar de km/h a m/s, multiplica por 5/18.<br>
                    Para pasar de m/s a km/h, multiplica por 18/5.
                </div>

                <div class="guide-example-box" style="margin-top: 2rem;">
                    <div class="example-title">Ejemplo de Encuentros (MRU)</div>
                    <p><strong>Problema:</strong> Dos trenes parten simultáneamente de dos ciudades A y B separadas por 300 km. Van uno al encuentro del otro. El tren A viaja a 40 km/h y el B a 60 km/h. ¿En cuánto tiempo se encontrarán?</p>
                    <p><strong>Resolución:</strong><br>
                    Cuando dos cuerpos van al encuentro, sus velocidades se "suman" para acortar la distancia total. <br>
                    Velocidad de acercamiento = 40 + 60 = 100 km/h.<br>
                    Tiempo = Distancia / Velocidad de acercamiento<br>
                    Tiempo = 300 km / 100 km/h = <strong>3 horas</strong>.</p>
                </div>
            `,
            pastExams: [
                {
                    pregunta: "Un automóvil viaja a velocidad constante de 72 km/h. ¿Cuántos metros recorre en 5 segundos?",
                    opciones: ["100 m", "72 m", "360 m", "50 m"],
                    correcta: "100 m",
                    resolucion: "1. Convertimos la velocidad: 72 km/h × (5/18) = 20 m/s. 2. Calculamos distancia (MRU): d = v × t = 20 m/s × 5 s = 100 m."
                }
            ],
            practiceTopics: ["Física (Cinemática y Unidades)"]
        }
    ]
};

fs.writeFileSync('guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('guides.json generado exitosamente con la teoría extendida.');
