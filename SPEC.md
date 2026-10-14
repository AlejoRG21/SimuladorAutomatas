# Especificación Técnica (SPEC.md)
**Simulador Gráfico de Autómatas: De AFND a AFD y de AF a Expresión Regular**  
*Teoría de la Computación — Parcial 2.° Corte*

---

## 1. Propósito y Objetivos
Desarrollar una aplicación gráfica local, interactiva y 100% offline que permita:
1. **Módulo 1:** Convertir un Autómata Finito No Determinista (AFND) a un Autómata Finito Determinista (AFD) mediante el **método de subconjuntos**, incluyendo el cálculo de **Clausura-ε** (Bonus), la generación formal del **estado pozo ($\emptyset$)**, y la representación gráfica en Canvas 2D según la notación de clase (óvalos, flechas dirigidas, flecha de entrada al inicial y doble círculo en finales).
2. **Módulo 2:** Obtener la **Expresión Regular (ER)** que reconoce el lenguaje de un autómata finito a través de la resolución del sistema de ecuaciones lineales hacia adelante:
   $$L(p) = \sum_{a \in \Sigma} a \cdot L(\delta(p, a)) \ + \ (\lambda \text{ si } p \in F)$$
   aplicando sustituciones algebraicas y el **Lema de Arden** ($X = AX + B \implies X = A^*B$), mostrando en cada paso el nombre de la regla aplicada. Con soporte para recibir directamente el AFD del Módulo 1.
3. **Verificador de Equivalencia de Tres Vías:** Generar exhaustivamente todas las cadenas del alfabeto hasta una longitud $n$ configurable ($n \ge 6$) y verificar que:
   $$\forall w \in \Sigma^{\le n}: \quad w \in \mathcal{L}(\text{AFND}) \iff w \in \mathcal{L}(\text{AFD}) \iff w \in \mathcal{L}(\text{ER})$$
   reportando de inmediato cualquier cadena en la que difieran.

---

## 2. Restricciones Técnicas y Arquitectura
* **Stack tecnológico:** HTML5, CSS3 y JavaScript nativo (Vanilla JS, ECMAScript moderno).
* **Arquitectura:** Aplicación puramente cliente local (`index.html`, `style.css`, `app.js`). Cero servidores (sin Node.js en runtime, Flask, Django, etc.).
* **Conectividad:** 100% Offline. Sin dependencias de internet, sin CDNs, sin fuentes web externas.
* **Ejecución:** Apertura directa con doble clic en `index.html`. Pruebas automáticas opcionales en terminal con `node test_runner.js`.

---

## 3. Modelo de Datos del Autómata (Estructura JSON)
Los autómatas se modelan formalmente como una 5-tupla en memoria:
```json
{
  "estados": ["q0", "q1", "q2"],
  "alfabeto": ["a", "b"],
  "inicial": "q0",
  "finales": ["q2"],
  "transiciones": {
    "q0": { "a": ["q0", "q1"], "b": [], "ε": [] },
    "q1": { "a": [], "b": ["q2"], "ε": [] },
    "q2": { "a": [], "b": [], "ε": [] }
  }
}
```

---

## 4. Casos Límite y Manejo Formal
1. **Estado Pozo ($\emptyset$):** Cuando para un subconjunto y símbolo no existen transiciones definidas, se genera el estado explícito de absorción o rechazo $\emptyset$, con transiciones $\delta(\emptyset, \sigma) = \emptyset$ para todo $\sigma \in \Sigma$.
2. **Estados Inalcanzables:** El algoritmo de subconjuntos parte exclusivamente de $\text{Clausura-}\varepsilon(\{q_{inicial}\})$, por lo que cualquier estado inalcanzable queda automáticamente descartado del AFD resultante.
3. **Transiciones Vacías ($\varepsilon$):** Se calcula la clausura reflexiva y transitiva sobre transiciones $\varepsilon$ tanto para el estado inicial como para cada conjunto generado.
4. **Alfabetos Unarios:** Si $|\Sigma| = 1$, la explosión combinatoria de cadenas en el verificador es lineal ($n+1$ cadenas).

---

## 5. Casos de Prueba Oficiales (Anexo A)
* **Caso 1 (AFND $\to$ AFD):**  
  $\Sigma = \{a, b\}$, $Q = \{q0, q1, q2\}$, Inicial: $q0$, Final: $q2$.  
  $\delta(q0, a) = \{q0, q1\}$, $\delta(q1, b) = \{q2\}$.  
  *AFD Esperado:* Estados $\{q0\}$, $\{q0,q1\}$, $\{q2\}$, $\emptyset$; Final: $\{q2\}$.
* **Caso 2 (AF $\to$ ER):**  
  $\Sigma = \{x, y\}$, $Q = \{q0, q1, q2\}$, Inicial: $q0$, Final: $q1$.  
  $q0 \xrightarrow{x} q1$, $q1 \xrightarrow{x} q2$, $q2 \xrightarrow{y} q2$, $q2 \xrightarrow{y} q1$.  
  *ER Esperada:* $x(x y^* y)^*$.