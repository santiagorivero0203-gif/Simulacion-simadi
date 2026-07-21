import re
import json
import os

with open("Raz verbal/preguntas_admision.md", "r", encoding="utf-8") as f:
    content = f.read()

questions = []
current_area = "Razonamiento Verbal"
current_tema = "General"
current_tipo = "opcion_multiple"
current_context = ""

# Parse sections and questions
lines = content.split('\n')
i = 0
while i < len(lines):
    line = lines[i].strip()
    
    if line.startswith("### EXAMEN: DPTO. DE CIENCIAS"):
        current_area = "Razonamiento Lógico"
        current_tema = "Resolución de Problemas"
    elif line.startswith("#### SECCIÓN:"):
        tema_str = line.replace("#### SECCIÓN:", "").strip()
        if "ORTOGRAFÍA" in tema_str or "ACENTUACIÓN" in tema_str:
            current_tema = "Corrección Ortográfica"
            current_tipo = "comparacion_ortografica"
        elif "SINÓNIMOS" in tema_str:
            current_tema = "Sinónimos en Contexto"
            current_tipo = "opcion_multiple"
        elif "INCOMPLETAS" in tema_str or "COMPLETACIÓN" in tema_str:
            current_tema = "Completación de Oraciones"
            current_tipo = "opcion_multiple"
        elif "ANALOGÍAS" in tema_str:
            current_tema = "Analogías y Relaciones Semánticas"
            current_tipo = "opcion_multiple"
        elif "RAZONAMIENTO LÓGICO" in tema_str:
            current_tema = "Lógica Deductiva"
            current_tipo = "opcion_multiple"
        elif "COMPRENSIÓN DE LECTURA" in tema_str:
            current_tema = "Comprensión Lectora"
            current_tipo = "opcion_multiple"
        elif "ORDENACIÓN" in tema_str:
            current_tema = "Ordenación Lógica de Párrafos"
            current_tipo = "opcion_multiple"
            
    elif line.startswith("*(Texto:"):
        current_context = line.replace("*(Texto:", "").replace(")*", "").strip()
    elif line.startswith("*Texto:*"):
        current_context = line.replace("*Texto:*", "").replace('"', '').strip()
        
    elif line.startswith("**Pregunta"):
        # We found a question
        q_data = {
            "area": current_area,
            "tema": current_tema,
            "tipo": current_tipo,
            "pregunta": "",
            "opciones": [],
            "correcta": ""
        }
        if current_tema == "Comprensión Lectora" and current_context:
            q_data["contexto"] = current_context
            
        i += 1
        # Read question text
        q_text_lines = []
        while i < len(lines) and not lines[i].strip().startswith("a)") and not lines[i].strip().startswith("**Pregunta"):
            if lines[i].strip():
                q_text_lines.append(lines[i].strip())
            i += 1
            
        q_data["pregunta"] = " ".join(q_text_lines)
        
        # Read options
        opts = []
        while i < len(lines) and re.match(r'^[a-e]\)', lines[i].strip()):
            opt_text = re.sub(r'^[a-e]\)\s*', '', lines[i].strip())
            opts.append(opt_text)
            i += 1
            
        q_data["opciones"] = opts
        
        # Heurística para respuesta correcta (como no están marcadas en el .md, escogemos la 'a' temporalmente,
        # pero es peligroso. El usuario no puso respuestas correctas en el archivo MD, excepto donde hay una clave.)
        # En los exámenes, a veces la A no es la correcta.
        # Espera, si el MD no tiene las respuestas correctas indicadas, pondré la primera y luego
        # añadiremos un TODO para que se revisen.
        if len(opts) > 0:
            q_data["correcta"] = opts[0]
            questions.append(q_data)
        
        continue # skip the i += 1 at the end of loop
        
    i += 1

print(f"Parsed {len(questions)} questions.")

with open('temp_unsolved.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
    
print(f"Saved {len(questions)} parsed questions to temp_unsolved.json")
