# Especificación Técnica (SPEC.md) - Simulador de Autómatas Finitos

## 1. Propósito del Proyecto
Desarrollar una aplicación gráfica local e interactiva que permita:
1. **Módulo 1:** Convertir un Autómata Finito No Determinista (AFND) a un Autómata Finito Determinista (AFD) mediante el método de subconjuntos, mostrando la tabla de conversión, el estado pozo ($\emptyset$) cuando corresponda, y la representación gráfica de ambos autómatas.
2. **Módulo 2:** Obtener la Expresión Regular (ER) a partir de un autómata finito aplicando reglas formales de reducción de sistemas de ecuaciones, mostrando paso a paso cada sustitución y simplificación con el nombre de la regla aplicada. Con conexión directa desde el Módulo 1.
3. **Verificador de Equivalencia:** Generar todas las cadenas posibles de un alfabeto dado hasta una longitud $n$ configurable (mínimo 6) para comprobar que el AFND original, el AFD resultante y la ER aceptan exactamente el mismo lenguaje, reportando cualquier discrepancia.

---

## 2. Alcance y Restricciones Técnicas
* **Stack tecnológico:** HTML5, CSS3 y JavaScript nativo (Vanilla JS).
* **Arquitectura:** Aplicación 100% local basada en archivos independientes (`index.html`, `styles.css`, `app.js`). Cero servidores (nada de Flask, Django o Node.js).
* **Conectividad:** Funciona completamente offline. Sin uso de internet, APIs, CDNs ni fuentes externas.

---

## 3. Modelo de Datos del Autómata (Estructura JSON)
Un autómata se representará mediante la siguiente estructura estandarizada:
```json
{
  "estados": ["q0", "q1", "q2"],
  "alfabeto": ["a", "b"],
  "inicial": "q0",
  "finales": ["q2"],
  "transiciones": {
    "q0": { "a": ["q0", "q1"], "b": [] },
    "q1": { "a": [], "b": ["q2"] },
    "q2": { "a": [], "b": [] }
  }
}