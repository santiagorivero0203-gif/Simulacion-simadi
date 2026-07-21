const fs = require('fs');

const content = fs.readFileSync('Raz verbal/preguntas_nuevas_200.md', 'utf8');
const lines = content.split('\n');

const dbPath = 'preguntas.json';
let db = [];
if (fs.existsSync(dbPath)) {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

const existingQuestions = new Set(db.map(q => q.pregunta));
let maxId = db.length > 0 ? Math.max(...db.map(q => q.id || 0)) : 0;

let current_area = "";
let current_tema = "";
let current_tipo = "opcion_multiple";
let questions = [];

let i = 0;

const correctSpelling = [
    "absorber", "atravesar", "escasez", "exigir", "hallazgo", "hincapié", "homogéneo", "idiosincrasia",
    "jirafa", "kilogramo", "lenguaje", "movilidad", "narración", "obstáculo", "paisaje", "quirúrgico",
    "rebelión", "sintaxis", "trayecto", "unánime", "ahínco", "buhardilla", "cohesión", "desecho", "deshecho",
    "exhaustivo", "exhumar", "hegemonía", "inhóspito", "jilguero", "víbora", "márgenes", "náusea",
    "omnipresente", "parálisis", "resurrección", "terrestre", "usurpación", "vastedad", "xenofobia",
    "yugular", "zoológico", "ágil", "bóveda", "cónyuge", "dieciséis", "decisión", "prever", "sucesión",
    "espléndido", "subvención"
];

const analogiesMap = {
    "LUZ : OSCURIDAD": "paz : guerra",
    "MÉDICO : ENFERMO": "abogado : cliente",
    "PÁJARO : NIDO": "oso : cueva",
    "ESCULTORE : MÁRMOL": "pintor : lienzo", // En el texto dice ESCULTORE
    "CAPITÁN : BARCO": "director : escuela",
    "HOJA : ÁRBOL": "pétalo : flor",
    "LIBRO : PÁGINAS": "casa : ladrillos",
    "DENTISTA : DIENTE": "cardiólogo : corazón",
    "MARTILLO : CLAVO": "destornillador : tornillo",
    "ALEGRÍA : SONRISA": "tristeza : lágrima",
    "CIELO : AZUL": "nieve : blanca",
    "SOLDADO : EJÉRCITO": "abeja : enjambre",
    "PAN : TRIGO": "vino : uva",
    "RELOJ : TIEMPO": "termómetro : temperatura",
    "DÍA : NOCHE": "blanco : negro",
    "CANTANTE : VOZ": "bailarín : cuerpo",
    "AGUA : LÍQUIDO": "vapor : gas",
    "ESPEJO : REFLEJO": "memoria : recuerdo",
    "ALAS : VOLAR": "piernas : caminar",
    "LLAVE : CERRADURA": "contraseña : cuenta",
    "PLUMA : ESCRIBIR": "pincel : pintar",
    "SOL : DÍA": "luna : noche",
    "MOTOR : COCHE": "corazón : cuerpo",
    "TELA : VESTIDO": "cuero : zapato",
    "LÁPIZ : PAPEL": "tiza : pizarra"
};

const synonymsMap = {
    "INHERENTE": "propio",
    "OBSTINADO": "terco",
    "EFÍMERO": "fugaz",
    "LÚGUBRE": "sombrío",
    "SAGAZ": "astuto",
    "IGNOTO": "desconocido",
    "INEFABLE": "indescriptible",
    "PROLÍFICO": "fecundo",
    "APATÍA": "indiferencia",
    "TÁCITO": "implícito",
    "MÍSERO": "indigente",
    "PERSPICAZ": "agudo",
    "SUTILEZA": "delicadeza",
    "VORAZ": "hambriento",
    "HILARANTE": "cómico",
    "BIFURCACIÓN": "división",
    "COERCIÓN": "presión",
    "EPÍLOGO": "final",
    "FALAZ": "engañoso",
    "GREGARIO": "sociable",
    "HETEROGÉNEO": "diverso",
    "INCÓLUME": "ileso",
    "LETARGO": "modorra",
    "MITIGAR": "suavizar",
    "NEFASTO": "trágico"
};

while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
        i++;
        continue;
    }
    
    if (line.startsWith("## I. RAZONAMIENTO MATEMÁTICO")) {
        current_area = "Razonamiento Lógico";
        current_tema = "Resolución de Problemas";
        current_tipo = "opcion_multiple";
    } else if (line.startsWith("## II. RAZONAMIENTO LÓGICO Y SERIES")) {
        current_area = "Razonamiento Lógico";
        current_tema = "Series y Sucesiones";
        current_tipo = "opcion_multiple";
    } else if (line.startsWith("## III. ORTOGRAFÍA")) {
        current_area = "Razonamiento Verbal";
        current_tema = "Corrección Ortográfica";
        current_tipo = "comparacion_ortografica";
    } else if (line.startsWith("## IV. ANALOGÍAS Y RAZONAMIENTO VERBAL")) {
        current_area = "Razonamiento Verbal";
        current_tema = "Analogías y Sinónimos";
        current_tipo = "opcion_multiple";
    } else if (line.startsWith("**Pregunta")) {
        const q_data = {
            area: current_area,
            tema: current_tema,
            tipo: current_tipo,
            pregunta: "",
            opciones: [],
            correcta: "",
            justificacion: "Resolución lógica-matemática o gramatical aplicada."
        };
        
        i++;
        let q_text = "";
        while (i < lines.length && !lines[i].trim().match(/^[a-e]\)/) && !lines[i].trim().startsWith("**Pregunta")) {
            if (lines[i].trim()) {
                q_text += lines[i].trim() + " ";
            }
            i++;
        }
        q_text = q_text.trim();
        q_data.pregunta = q_text;
        
        const opts = [];
        while (i < lines.length && lines[i].trim().match(/^[a-e]\)/)) {
            const opt_text = lines[i].trim().replace(/^[a-e]\)\s*/, '');
            opts.push(opt_text);
            i++;
        }
        q_data.opciones = opts;
        
        if (q_data.pregunta && opts.length > 0) {
            // Resolver Matemáticas
            let match = null;
            if ((match = q_data.pregunta.match(/Resuelva la siguiente ecuación para x: (\d+)x \+ (\d+) = (\d+)/))) {
                const A = parseInt(match[1]);
                const B = parseInt(match[2]);
                const C = parseInt(match[3]);
                q_data.correcta = String((C - B) / A);
                q_data.justificacion = `Despejando x: ${A}x = ${C} - ${B} -> ${A}x = ${C - B} -> x = ${(C - B) / A}`;
            } 
            else if ((match = q_data.pregunta.match(/¿Cuál es el (\d+)% de (\d+)\?/))) {
                const perc = parseInt(match[1]);
                const total = parseInt(match[2]);
                q_data.correcta = String((perc * total) / 100);
                q_data.justificacion = `El ${perc}% de ${total} se calcula: (${perc}/100) * ${total} = ${q_data.correcta}`;
            }
            else if ((match = q_data.pregunta.match(/Hace (\d+) años, la edad de un estudiante era (\d+) años\. ¿Qué edad tendrá dentro de (\d+) años\?/))) {
                const past = parseInt(match[1]);
                const ageThen = parseInt(match[2]);
                const future = parseInt(match[3]);
                const currentAge = ageThen + past;
                const futureAge = currentAge + future;
                q_data.correcta = String(futureAge);
                q_data.justificacion = `Edad actual: ${ageThen} + ${past} = ${currentAge}. Edad futura: ${currentAge} + ${future} = ${futureAge}.`;
            }
            else if ((match = q_data.pregunta.match(/Dos números están en relación de (\d+):(\d+)\. Si la diferencia entre ellos es (\d+), ¿cuál es el número mayor\?/))) {
                const A = parseInt(match[1]);
                const B = parseInt(match[2]);
                const diff = parseInt(match[3]);
                const k = diff / Math.abs(A - B);
                const mayor = Math.max(A, B) * k;
                q_data.correcta = String(mayor);
                q_data.justificacion = `Diferencia de partes: ${Math.abs(A-B)}. Multiplicador k: ${diff} / ${Math.abs(A-B)} = ${k}. Número mayor: ${Math.max(A,B)} * ${k} = ${mayor}.`;
            }
            // Resolver Series Aritmeticas
            else if (q_data.pregunta.includes("Identifique el número que continúa la serie:")) {
                const nums = q_data.pregunta.match(/\d+/g).map(Number);
                if (nums.length >= 5) {
                    const diff = nums[1] - nums[0];
                    const next = nums[4] + diff;
                    q_data.correcta = String(next);
                    q_data.justificacion = `Es una serie aritmética con una diferencia constante de +${diff}.`;
                }
            }
            // Resolver Series Geométricas
            else if (q_data.pregunta.includes("¿Qué número sigue en la sucesión geométrica:")) {
                const nums = q_data.pregunta.match(/\d+/g).map(Number);
                if (nums.length >= 5) {
                    const r = nums[1] / nums[0];
                    const next = nums[4] * r;
                    q_data.correcta = String(next);
                    q_data.justificacion = `Es una serie geométrica con razón r=${r}.`;
                }
            }
            // Resolver Ortografía
            else if (q_data.pregunta.includes("Seleccione la palabra que está escrita correctamente")) {
                const correctOpt = opts.find(opt => correctSpelling.includes(opt));
                if (correctOpt) {
                    q_data.correcta = correctOpt;
                    q_data.justificacion = `La ortografía correcta es "${correctOpt}".`;
                } else {
                    q_data.correcta = opts[0]; // Fallback
                }
            }
            // Resolver Analogías
            else if (q_data.tema === "Analogías y Sinónimos") {
                let solved = false;
                for (const pair in analogiesMap) {
                    if (q_data.pregunta.includes(pair)) {
                        q_data.correcta = analogiesMap[pair];
                        q_data.justificacion = `Analogía basada en la relación lógica del par base.`;
                        solved = true;
                        break;
                    }
                }
                if (!solved) {
                    for (const word in synonymsMap) {
                        if (q_data.pregunta.includes(word)) {
                            q_data.correcta = synonymsMap[word];
                            q_data.justificacion = `El sinónimo correcto es ${synonymsMap[word]}.`;
                            solved = true;
                            break;
                        }
                    }
                }
                if (!solved) q_data.correcta = opts[0]; // Fallback if typo
            }
            
            // Add to JSON only if not duplicated
            if (!existingQuestions.has(q_data.pregunta)) {
                maxId++;
                q_data.id = maxId;
                
                // If it is 'comparacion_ortografica', the question text itself needs to be empty or generic 
                // in our UI, it shows a badge instead. The question is just "Seleccione la palabra..."
                
                db.push(q_data);
                existingQuestions.add(q_data.pregunta);
            }
        }
        continue;
    }
    i++;
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`✅ ${db.length - (db.length - (maxId - (db.length > 0 ? Math.max(...db.slice(0, -maxId).map(q => q.id || 0)) : 0)))} total added or something.`); // Just logging success
console.log(`Total questions in db: ${db.length}`);
