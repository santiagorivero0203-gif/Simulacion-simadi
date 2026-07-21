import json
import os

def agregar_preguntas(nuevas_preguntas, json_path):
    if not os.path.exists(json_path):
        print(f"Error: No se encontró el archivo {json_path}")
        return
    
    with open(json_path, 'r', encoding='utf-8') as f:
        try:
            datos = json.load(f)
        except json.JSONDecodeError:
            print("Error: El archivo JSON está corrupto.")
            return
            
    # Obtener el último ID
    if len(datos) > 0:
        ultimo_id = max([p.get('id', 0) for p in datos])
    else:
        ultimo_id = 0
        
    for i, pregunta in enumerate(nuevas_preguntas):
        pregunta['id'] = ultimo_id + i + 1
        datos.append(pregunta)
        
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(datos, f, ensure_ascii=False, indent=2)
        
    print(f"Se agregaron {len(nuevas_preguntas)} preguntas correctamente. Total de preguntas ahora: {len(datos)}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        nuevas_preguntas_file = sys.argv[1]
        json_path = sys.argv[2]
        with open(nuevas_preguntas_file, 'r', encoding='utf-8') as f:
            nuevas_preguntas = json.load(f)
        agregar_preguntas(nuevas_preguntas, json_path)
    else:
        print("Uso: python script_actualizacion.py <nuevas_preguntas.json> <preguntas.json>")
