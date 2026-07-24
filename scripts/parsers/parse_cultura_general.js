const fs = require('fs');
const path = require('path');

// Pools of distractors by category
const pools = {
    presidents: [
        'Luis Herrera Campins', 'Carlos Andrés Pérez', 'Jaime Lusinchi', 'Rómulo Betancourt', 
        'Rafael Caldera', 'Raúl Leoni', 'Marcos Pérez Jiménez', 'Juan Vicente Gómez', 
        'Antonio Guzmán Blanco', 'José Gregorio Monagas', 'Cipriano Castro', 
        'Eleazar López Contreras', 'José Tadeo Monagas', 'Ramón J. Velásquez', 
        'Wolfgang Larrazábal', 'Hugo Chávez', 'José Antonio Páez', 'Francisco de Miranda'
    ],
    writers: [
        'Jorge Isaacs', 'Arturo Uslar Pietri', 'Rómulo Gallegos', 'Andrés Eloy Blanco', 
        'Miguel de Cervantes', 'Dante Alighieri', 'William Shakespeare', 'Pablo Neruda', 
        'Gabriel García Márquez', 'Jorge Luis Borges', 'Julio Cortázar', 'Jacinto Benavente', 
        'Antonio Machado', 'Federico García Lorca', 'Mario Vargas Llosa'
    ],
    countries: [
        'México', 'Bolivia', 'Finlandia', 'Siria', 'Jordania', 'Estados Unidos', 
        'Colombia', 'Ecuador', 'Perú', 'Venezuela', 'España', 'Francia', 'Canadá', 
        'Brasil', 'Argentina', 'Chile'
    ],
    capitals: [
        'Helsinki', 'Ammán', 'Damasco', 'Cuzco', 'Santiago de Chile', 'Bogotá', 
        'Lima', 'Quito', 'Caracas', 'Madrid', 'París', 'Buenos Aires'
    ],
    states: [
        'Amazonas', 'Falcón', 'Sucre', 'Táchira', 'Nueva Esparta', 'Lara', 
        'Mérida', 'Zulia', 'Carabobo', 'Miranda', 'Aragua', 'Bolívar', 'Monagas', 
        'Anzoátegui', 'Yaracuy', 'Trujillo'
    ],
    organisms: [
        'ONU', 'OIT', 'FAO', 'BID', 'UNICEF', 'CARICOM', 'NAFTA (TLC)', 'PNUMA', 
        'SENIAT', 'FOGADE', 'OEA', 'FMI', 'OMS', 'SELA', 'OTAN', 'UE', 'MERCOSUR', 
        'OPEP', 'OLP', 'ANP'
    ],
    historical_events: [
        'Revolución Francesa', 'Revolución Rusa', 'Primera Guerra Mundial', 
        'Segunda Guerra Mundial', 'Guerra Fría', 'Revolución Industrial', 
        'Caída del Muro de Berlín', 'Campaña Admirable', 'La Cosiata', 'Guerra Federal'
    ],
    scientists_philosophers_artists: [
        'Jean Baptiste Lamarck', 'Charles Darwin', 'Augusto Pinochet', 'Diego Velázquez', 
        'Pedro Tchaikovski', 'Antonio Lavoisier', 'Tales de Mileto', 'Alexander Graham Bell', 
        'Copérnico', 'Sócrates', 'Adam Smith', 'Jacinto Convit', 'Benjamín Franklin', 
        'Louis Pasteur', 'Miguel Ángel', 'Galileo Galilei', 'Isaac Newton', 'Albert Einstein'
    ],
    geography_features: [
        'Isla de Aves', 'Cerro Copey', 'Cerro Autana', 'Río Orinoco', 'Lago de Valencia', 
        'Henri Pittier', 'Salto Ángel', 'Mar Caspio', 'Lago Tanganica', 'Kilimanjaro', 
        'Península de Paria', 'Río Manzanares', 'Río Caroní', 'Lago de Maracaibo'
    ],
    grammar_terms: [
        'Adjetivo distributivo', 'Adjetivo demostrativo', 'Adjetivo posesivo', 
        'Adjetivo numeral', 'Adverbio', 'Sustantivo', 'Verbo copulativo', 
        'Pronombre', 'Preposición', 'Ladino', 'Histología', 'Estadística', 
        'Hemeroteca', 'Ensayo'
    ]
};

// Custom distractors for specific cases
const customDistractors = {
    "Ofelia y Laertes": ["Romeo y Julieta", "Otelo y Desdémona", "Macbeth y Lady Macbeth"],
    "Dionisio": ["Apolo", "Zeus", "Hermes"],
    "La perra Laika": ["El mono Albert", "El chimpancé Ham", "La perra Belka"],
    "Maíz": ["Arroz", "Trigo", "Yuca"],
    "La aparición de la escritura": ["El descubrimiento del fuego", "El uso de los metales", "La domesticación de animales"],
    "En la Capilla Sixtina": ["En el Museo del Prado", "En el Palacio de Versalles", "En la Catedral de Notre Dame"],
    "El Tribunal Supremo de Justicia": ["La Fiscalía General", "La Defensoría del Pueblo", "El Congreso de la República"],
    "La Asamblea Nacional": ["El Senado", "La Cámara de Diputados", "El Tribunal Supremo"],
    "El Consejo Moral Republicano": ["El Consejo de Ministros", "El Consejo Electoral", "La Contraloría General"],
    "La Batalla de Carabobo": ["La Batalla de Boyacá", "La Batalla de Pichincha", "La Batalla de Junín"],
    "Antonio José de Sucre": ["Francisco de Miranda", "José Antonio Páez", "Santiago Mariño"],
    "Ramón J. Velásquez": ["Octavio Lepage", "Hugo Chávez", "Carlos Andrés Pérez"],
    "Xerófila": ["Selva nublada", "Sabana", "Manglar"],
    "Marea viva / c) Pleamar": ["Marea baja", "Bajamar", "Reflujo"],
    "Pleamar": ["Marea baja", "Bajamar", "Marea muerta"]
};

// Specific dates mapping
const customDates = {
    "Convento de San Francisco, el 14 de octubre de 1813": [
        "Convento de San Francisco, el 5 de julio de 1811",
        "Palacio Federal Legislativo, el 19 de abril de 1810",
        "Convento de San Francisco, el 24 de junio de 1821"
    ],
    "5 de julio de 1811": ["19 de abril de 1810", "24 de junio de 1821", "5 de julio de 1810"],
    "9 de Noviembre de 1989": ["12 de Octubre de 1992", "1 de Septiembre de 1985", "10 de Diciembre de 1991"],
    "1777": ["1810", "1767", "1789"],
    "1789": ["1776", "1804", "1815"],
    "1976": ["1958", "1983", "1969"],
    "1945": ["1939", "1950", "1948"],
    "1881": ["1870", "1895", "1905"],
    "1854": ["1848", "1864", "1830"]
};

function cleanCorrect(val) {
    // Remove option prefix like "a) ", "b) ", etc.
    return val.replace(/^[a-e]\)\s*/, '').trim();
}

function getDistractors(correctAnswer, questionText) {
    const cleanAns = cleanCorrect(correctAnswer);

    // 1. Check custom distractors
    if (customDistractors[cleanAns]) {
        return customDistractors[cleanAns];
    }
    if (customDates[cleanAns]) {
        return customDates[cleanAns];
    }

    // 2. Check predefined pools
    for (const [catName, pool] of Object.entries(pools)) {
        // Find if answer matches any item in the pool (case insensitive match)
        const match = pool.find(item => item.toLowerCase().includes(cleanAns.toLowerCase()) || cleanAns.toLowerCase().includes(item.toLowerCase()));
        if (match) {
            const filtered = pool.filter(item => !item.toLowerCase().includes(cleanAns.toLowerCase()) && !cleanAns.toLowerCase().includes(item.toLowerCase()));
            // Shuffle and take 3
            return filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
        }
    }

    // 3. Fallback for years
    if (/^\d{4}$/.test(cleanAns)) {
        const year = parseInt(cleanAns);
        return [
            (year - 5).toString(),
            (year + 10).toString(),
            (year + 5).toString()
        ];
    }

    // 4. Fallback for percentages
    if (/%$/.test(cleanAns)) {
        const pct = parseFloat(cleanAns);
        return [
            `${(pct - 8.3).toFixed(1)}%`,
            `${(pct + 12.1).toFixed(1)}%`,
            `${(pct - 4.5).toFixed(1)}%`
        ];
    }

    // 5. Fallback for prices (e.g., 473,95$)
    if (/\$$/.test(cleanAns) || /^\$/.test(cleanAns)) {
        const num = parseFloat(cleanAns.replace(/[^\d.]/g, '')) || 400;
        return [
            `${(num - 80).toFixed(2)}$`,
            `${(num + 110).toFixed(2)}$`,
            `${(num + 45).toFixed(2)}$`
        ];
    }

    // Default fallback
    return ["Opción incorrecta 1", "Opción incorrecta 2", "Opción incorrecta 3"];
}

function parseMarkdown() {
    const filePath = path.join(__dirname, '../../resources/gemini-code-1784873246244.md');
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    let currentTema = "Cultura General";
    const questions = [];

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // Header detection
        if (line.startsWith('#')) {
            if (line.includes('Cuestionario 1')) {
                currentTema = "Literatura y Gramática";
            } else if (line.includes('Cuestionario 2')) {
                currentTema = "Actualidad, Política y Economía";
            } else if (line.includes('Cuestionario 3')) {
                currentTema = "Historia y Geografía General";
            } else if (line.includes('Identificación de Organismos')) {
                currentTema = "Organismos Internacionales y Nacionales";
            } else if (line.includes('Cuestionario 4')) {
                currentTema = "Conocimientos Generales";
            }
            continue;
        }

        // Parse Organisms (Bullet points)
        if (currentTema === "Organismos Internacionales y Nacionales" && line.startsWith('*')) {
            // Format: *   **ONU:** Organización de las Naciones Unidas. (Foro global de paz y derecho internacional).
            const match = line.match(/\*\s+\*\*([^*]+):\*\*\s+([^.(]+)\.?\s*(?:\(([^)]+)\))?/);
            if (match) {
                const sigla = match[1].trim();
                const definicion = match[2].trim();
                const contexto = match[3] ? match[3].trim() : 'Organismo nacional o internacional.';

                const qText = `¿Qué significan las siglas ${sigla}?`;
                const correct = definicion;
                const distractors = pools.organisms
                    .filter(o => o !== sigla)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3)
                    .map(o => pools.grammar_terms[12] ? `Definición ficticia para ${o}` : ''); // We'll make some fake names

                // Let's build custom distractors for each organism definition to make it look super realistic
                const fakeDefinitions = {
                    "ONU": ["Organización de Naciones Unidas para el Desarrollo", "Organismo de Naciones Unidas", "Organización de Naciones Unificadas"],
                    "OIT": ["Organización Internacional de Trabajadores", "Oficina de Integración del Trabajo", "Organismo de Inversión y Trabajo"],
                    "FAO": ["Fuerzas Aliadas de Occidente", "Federación de Alimentación y Agricultura", "Fondo para la Alimentación Organizada"],
                    "BID": ["Banco Internacional de Desarrollo", "Banco Interamericano de Inversiones", "Banca de Integración Democrática"],
                    "UNICEF": ["Unión Internacional para la Infancia", "Fondo de Naciones Unidas para la Educación", "Fondo Internacional de Emergencia Social"],
                    "CARICOM": ["Comunidad del Caribe y Colombia", "Comisión de Asuntos Regionales del Caribe", "Consorcio de Armadores del Caribe"],
                    "NAFTA (TLC)": ["Tratado Libre de Comercio Andino", "Acuerdo de Naciones para el Comercio Fiel", "Tratado Latinoamericano de Comercio"],
                    "PNUMA": ["Programa de Naciones Unidas para el Medio Ambiente", "Programa Nacional de Utilidad Medioambiental", "Plan de Naciones Unidas sobre el Medio Ambiente"],
                    "SENIAT": ["Servicio Nacional de Impuestos y Aduanas", "Sistema de Recaudación Tributaria Nacional", "Servicio Estatal de Navegación y Aduanas"],
                    "FOGADE": ["Fondo de Garantía de Depósitos", "Fondo de Ahorro y Depósitos Estatales", "Fideicomiso de Depósitos Bancarios"],
                    "OEA": ["Organización de Estados Andinos", "Organismo del Espacio Americano", "Organización de Estados Aliados"],
                    "FMI": ["Fondo de Mercadeo Internacional", "Federación Monetaria de Inversiones", "Fideicomiso Monetario Internacional"],
                    "OMS": ["Organismo de Medicina Social", "Organización Mundial de Siniestros", "Oficina Médica de la Salud"],
                    "SELA": ["Sistema Económico de Latinoamérica", "Secretaría de Enlace de América Latina", "Sociedad Económica Latinoamericana"],
                    "OTAN": ["Organización de Tratados del Atlántico Norte", "Organización del Tratado del Atlántico", "Alianza de Defensa del Atlántico"],
                    "UE": ["Unión de Estados", "Unidad Europea", "Unión Económica Europea"],
                    "MERCOSUR": ["Mercado Común de Sudamérica", "Mercado del Cono Sur", "Mercado de Cooperación del Sur"],
                    "OPEP": ["Organización de Productores de Petróleo", "Organismo de Países Exportadores", "Organización de Países Productores de Energía"],
                    "OLP": ["Organización para la Libertad de Palestina", "Oficina de Liberación Palestina", "Organización de Liberación Patriótica"]
                };

                const opts = fakeDefinitions[sigla] || ["Opción incorrecta 1", "Opción incorrecta 2", "Opción incorrecta 3"];
                opts.push(correct);

                questions.push({
                    area: "Cultura General",
                    tema: currentTema,
                    tipo: "opcion_multiple",
                    pregunta: qText,
                    opciones: opts,
                    correcta: correct,
                    justificacion: contexto
                });
            }
            continue;
        }

        // Parse Questionnaires questions
        // Format: **1. ¿En el gobierno de cuál presidente se inauguró el Metro de Caracas?** | **R:** a) Luis Herrera | **Contexto:** Inaugurado el 2 de enero de 1983.
        if (line.startsWith('**') && line.includes('|')) {
            const parts = line.split('|');
            if (parts.length >= 2) {
                const qPart = parts[0].trim();
                const rPart = parts[1].trim();
                const cPart = parts[2] ? parts[2].trim() : '';

                // Extract question text
                const qMatch = qPart.match(/\*\*\d+\.\s*([^*]+)\*\*/);
                if (qMatch) {
                    const qText = qMatch[1].trim();

                    // Extract correct answer
                    const rMatch = rPart.match(/\*\*R:\*\*\s*(.+)/);
                    if (rMatch) {
                        const rawCorrect = rMatch[1].trim();
                        const correct = cleanCorrect(rawCorrect);

                        // Extract context
                        let context = '';
                        if (cPart) {
                            const cMatch = cPart.match(/\*\*Contexto:\*\*\s*(.+)/);
                            if (cMatch) {
                                context = cMatch[1].trim();
                            }
                        }

                        // Generate options
                        const distractors = getDistractors(rawCorrect, qText);
                        const options = [correct, ...distractors.map(cleanCorrect)].filter((v, i, self) => self.indexOf(v) === i).slice(0, 4);

                        // Make sure we have 4 options
                        while (options.length < 4) {
                            options.push(`Opción alternativa ${options.length}`);
                        }

                        questions.push({
                            area: "Cultura General",
                            tema: currentTema,
                            tipo: "opcion_multiple",
                            pregunta: qText,
                            opciones: options,
                            correcta: correct,
                            justificacion: context
                        });
                    }
                }
            }
        }
    }

    return questions;
}

function run() {
    console.log("Parsing Cultura General questions...");
    const newQuestions = parseMarkdown();
    console.log(`Parsed ${newQuestions.length} new questions.`);

    const preguntasPath = path.join(__dirname, '../../preguntas.json');
    let existingQuestions = [];

    if (fs.existsSync(preguntasPath)) {
        existingQuestions = JSON.parse(fs.readFileSync(preguntasPath, 'utf8'));
        console.log(`Loaded ${existingQuestions.length} existing questions.`);
    }

    // Get max ID
    let maxId = existingQuestions.reduce((max, q) => q.id > max ? q.id : max, 0);

    // Filter out duplicates if any (by checking matching question text)
    const existingTexts = new Set(existingQuestions.map(q => q.pregunta.toLowerCase()));
    
    let addedCount = 0;
    newQuestions.forEach(q => {
        if (!existingTexts.has(q.pregunta.toLowerCase())) {
            maxId++;
            q.id = maxId;
            existingQuestions.push(q);
            addedCount++;
        }
    });

    fs.writeFileSync(preguntasPath, JSON.stringify(existingQuestions, null, 2), 'utf8');
    console.log(`Added ${addedCount} new questions. Total questions now: ${existingQuestions.length}`);
}

run();
