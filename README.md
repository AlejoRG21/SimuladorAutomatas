# Simulador Gráfico de Autómatas Finitos
**De AFND a AFD y de AF a Expresión Regular**

Proyecto desarrollado para el **Parcial del Segundo Corte** de la asignatura **Teoría de la Computación** (Corporación Universitaria Autónoma del Cauca, Popayán, 2026).

---

## 👥 Autores y Docente
* **Estudiantes:** César Alejandro Rivera Garzón & Salomón Montilla Luna
* **Docente:** Jefferson Andrés Muñoz Luligo
* **Calificación objetivo:** 100/100 (+5 pts Bonus)

---

## 🚀 Instrucciones de Ejecución (100% Offline)

Este proyecto cumple estrictamente con el requisito de ser **100% local, sin servidores ni dependencias externas**:

### 1. Ejecución Gráfica en Navegador (Doble Clic)
1. Navega a la carpeta del proyecto.
2. Abre el archivo `index.html` con **doble clic** en cualquier navegador moderno (Google Chrome, Firefox, Edge, Safari).
3. No requiere internet, servidores locales ni comandos especiales.

### 2. Ejecución de Pruebas Automatizadas en Terminal (Opcional)
Para validar la lógica pura sin interfaz gráfica:
```bash
node test_runner.js
```
Esto ejecutará la batería de 4 pruebas formales (Anexo A Caso 1, Caso 2, Verificador $n=6$ y Bonus de Clausura-$\varepsilon$).

---

## 📁 Estructura del Proyecto

```text
/SimuladorAutomatas
├── index.html           # Interfaz gráfica principal (pestañas, matriz y canvas)
├── style.css            # Hoja de estilos offline responsiva y sin CDNs
├── app.js               # Algoritmos formales (subconjuntos, Arden, verificador y canvas)
├── test_runner.js       # Suite ejecutable de pruebas unitarias para terminal
├── SPEC.md              # Especificación técnica formal (Fase 0)
├── BITACORA_PROMPTS.md  # Bitácora oficial de prompts y depuración (Fases 0 a 6)
├── README.md            # Documentación e instrucciones de ejecución
└── .gitignore           # Archivos internos excluidos
```

---

## 🧩 Módulos Implementados

### 1. Módulo 1: Conversión de AFND a AFD
* **Algoritmo:** Método formal de construcción de subconjuntos (Subset Construction).
* **Bonus Clausura-ε (+5 pts):** Manejo completo de transiciones $\varepsilon$ tanto en el estado inicial como en cada conjunto generado.
* **Estado Pozo ($\emptyset$):** Creación automática del estado sumidero de rechazo $\emptyset$ cuando un conjunto carece de transiciones para algún símbolo.
* **Modo Paso a Paso:** Controles interactivos (*Paso Anterior* / *Paso Siguiente*) que detallan el procesamiento conjunto a conjunto.
* **Renderizador Canvas Vectorial:** Visualización gráfica con la notación formal de clase (óvalos, flechas dirigidas, flecha verde de entrada al inicial y doble círculo para estados finales).

### 2. Módulo 2: De Autómata Finito a Expresión Regular
* **Algoritmo:** Planteamiento del sistema de ecuaciones lineales hacia adelante:
  $$L(p) = \sum_{a \in \Sigma} a \cdot L(\delta(p, a)) \ + \ (\lambda \text{ si } p \in F)$$
* **Lema de Arden:** Factorización formal de bucles autorreferenciales:
  $$X = A \cdot X + B \implies X = A^* \cdot B \quad (\text{con } \lambda \notin A)$$
* **Trazabilidad:** Cada paso muestra explícitamente el nombre de la regla aplicada (*Regla de transición simple*, *Regla de estado final $\lambda$*, *Lema de Arden*, *Regla de sustitución*).
* **Conexión Directa:** Botón para recibir automáticamente el AFD producido por el Módulo 1.

### 3. Verificador de Equivalencia de 3 Vías
* Generación exhaustiva de todas las cadenas de $\Sigma^{\le n}$ con longitud $n$ configurable ($n \ge 6$).
* Evaluación simultánea de:
  $$\forall w \in \Sigma^{\le n}: \quad w \in \mathcal{L}(\text{AFND}) \iff w \in \mathcal{L}(\text{AFD}) \iff w \in \mathcal{L}(\text{ER})$$
* Notificación en tiempo real de cadenas discrepantes o confirmación de equivalencia matemática absoluta.

---

## 📋 Cumplimiento de la Lista de Chequeo (Anexo B)
- [x] La aplicación abre y funciona sin internet (probada con conexión desactivada).
- [x] Usa un solo stack (HTML + CSS + JavaScript puro) y no tiene backend ni servidor.
- [x] Resuelve los dos casos del Anexo A y el verificador confirma su equivalencia.
- [x] Cada paso del Módulo 2 muestra el nombre de la regla aplicada.
- [x] La bitácora tiene todas las fases (0 a 6) con IA usada, decisiones, verificación y 2 errores depurados.
- [x] El README explica detalladamente la ejecución del sistema.