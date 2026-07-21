const fs = require('fs');

const content = fs.readFileSync('Raz verbal/preguntas_admision.md', 'utf8');
const lines = content.split('\n');

const questions = [];
let current_area = "Razonamiento Verbal";
let current_tema = "General";
let current_tipo = "opcion_multiple";
let current_context = "";

let i = 0;
while (i < lines.length) {
    const line = lines[i].trim();
    
    if (line.startsWith("### EXAMEN: DPTO. DE CIENCIAS")) {
        current_area = "Razonamiento Lógico";
        current_tema = "Resolución de Problemas";
    } else if (line.startsWith("#### SECCIÓN:")) {
        const tema_str = line.replace("#### SECCIÓN:", "").trim();
        if (tema_str.includes("ORTOGRAFÍA") || tema_str.includes("ACENTUACIÓN")) {
            current_tema = "Corrección Ortográfica";
            current_tipo = "comparacion_ortografica";
        } else if (tema_str.includes("SINÓNIMOS")) {
            current_tema = "Sinónimos en Contexto";
            current_tipo = "opcion_multiple";
        } else if (tema_str.includes("INCOMPLETAS") || tema_str.includes("COMPLETACIÓN")) {
            current_tema = "Completación de Oraciones";
            current_tipo = "opcion_multiple";
        } else if (tema_str.includes("ANALOGÍAS")) {
            current_tema = "Analogías y Relaciones Semánticas";
            current_tipo = "opcion_multiple";
        } else if (tema_str.includes("RAZONAMIENTO LÓGICO")) {
            current_tema = "Lógica Deductiva";
            current_tipo = "opcion_multiple";
        } else if (tema_str.includes("COMPRENSIÓN DE LECTURA")) {
            current_tema = "Comprensión Lectora";
            current_tipo = "opcion_multiple";
        } else if (tema_str.includes("ORDENACIÓN")) {
            current_tema = "Ordenación Lógica de Párrafos";
            current_tipo = "opcion_multiple";
        }
    } else if (line.startsWith("*(Texto:")) {
        current_context = line.replace("*(Texto:", "").replace(")*", "").trim();
    } else if (line.startsWith("*Texto:*")) {
        current_context = line.replace("*Texto:*", "").replace(/"/g, "").trim();
    } else if (line.startsWith("**Pregunta")) {
        const q_data = {
            area: current_area,
            tema: current_tema,
            tipo: current_tipo,
            pregunta: "",
            opciones: [],
            correcta: ""
        };
        
        if (current_tema === "Comprensión Lectora" && current_context) {
            q_data.contexto = current_context;
        }
        
        i++;
        const q_text_lines = [];
        while (i < lines.length && !lines[i].trim().match(/^[a-e]\)/) && !lines[i].trim().startsWith("**Pregunta")) {
            if (lines[i].trim()) {
                q_text_lines.push(lines[i].trim());
            }
            i++;
        }
        
        q_data.pregunta = q_text_lines.join(" ");
        
        const opts = [];
        while (i < lines.length && lines[i].trim().match(/^[a-e]\)/)) {
            const opt_text = lines[i].trim().replace(/^[a-e]\)\s*/, '');
            opts.push(opt_text);
            i++;
        }
        
        q_data.opciones = opts;
        if (opts.length > 0) {
            // Assigning temporary correct answer
            q_data.correcta = opts[0];
            questions.push(q_data);
        }
        continue;
    }
    i++;
}

console.log(`Parsed ${questions.length} questions.`);
fs.writeFileSync('temp_unsolved.json', JSON.stringify(questions, null, 2), 'utf8');
console.log(`Saved to temp_unsolved.json`);
