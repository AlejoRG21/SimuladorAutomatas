# Bitácora Oficial de Prompts e Ingeniería con IA
**Proyecto:** Simulador Gráfico de Autómatas Finitos (AFND a AFD y de AF a Expresión Regular)  
**Asignatura:** Teoría de la Computación — Parcial 2.° Corte  
**Institución:** Corporación Universitaria Autónoma del Cauca, Popayán  
**Autores:** César Alejandro Rivera Garzón & Salomón Montilla Luna  
**Docente:** Jefferson Andrés Muñoz Luligo  
**Fecha:** Octubre 2026  

---

## 1. Presentación y Metodología de Trabajo

En cumplimiento de las directrices del Parcial del Segundo Corte, el desarrollo de esta aplicación se abordó bajo un enfoque de **liderazgo técnico asistido por Inteligencia Artificial**. El equipo actuó como líder de proyecto, estableciendo la especificación formal, el diseño arquitectónico, la validación matemática contra los ejercicios de clase y la depuración del código entregado por la IA.

Cada interacción siguió la estructura formal exigida:
* **Rol:** Definición del perfil técnico de la IA.
* **Contexto:** Dominio del problema, restricciones offline y representación teórica.
* **Tarea concreta:** Acción unívoca y delimitada.
* **Restricciones:** 100% offline, sin dependencias externas, JavaScript nativo.
* **Formato de salida:** Modular y documentado.
* **Criterio de verificación:** Pruebas contra los casos del Anexo A y resolución analítica a mano.

---

## 2. Registro Sistemático de Fases (Fases 0 a 6)

### N.° 1 | Fase 0: Especificación de Requisitos Técnicos
* **IA utilizada:** Google Gemini / Antigravity Orchestrator
* **Prompt enviado:**
  ```text
  Rol: Actúa como arquitecto de software y docente experto en teoría de la computación.
  Contexto: Estamos iniciando el desarrollo de una herramienta interactiva offline para la conversión de AFND a AFD y de autómatas finitos a expresiones regulares, con un verificador formal de equivalencia.
  Tarea: Redacta el archivo SPEC.md definiendo formalmente los requisitos funcionales, el alcance de los tres módulos, las entradas y salidas estándar, y los casos límite críticos (estado pozo ∅, estados inalcanzables, alfabetos unarios y transiciones vacías ε).
  Restricciones: Cero servidores, cero librerías por CDN, arquitectura puramente local (HTML/CSS/JS).
  Formato: Archivo Markdown estructurado y conciso.
  Verificación: Incluye criterios de aceptación explícitos comparables con los casos de referencia de clase.
  ```
* **Respuesta (resumen):** La IA generó la estructura formal de `SPEC.md`, definiendo las 5-tuplas de los autómatas, el comportamiento del estado pozo, el soporte opcional de Clausura-$\varepsilon$, y el criterio de prueba exhaustiva para $\Sigma^{\le n}$.
* **Decisión del equipo:** Se aceptó la especificación técnica y se ajustó para fijar una longitud mínima de $n=6$ para el verificador y delimitar el motor gráfico a HTML5 Canvas 2D nativo.
* **Verificación:** Se contrastó `SPEC.md` con las páginas 1 y 2 de la guía del parcial, validando el cumplimiento del 100% de los requisitos estipulados.

---

### N.° 2 | Fase 1: Arquitectura y Modelado de Datos
* **IA utilizada:** Google Gemini / Antigravity Orchestrator
* **Prompt enviado:**
  ```text
  Rol: Desarrollador senior de JavaScript que diseña estructuras de datos limpias y algoritmos teóricos.
  Contexto: Construimos un simulador offline de autómatas finitos en Vanilla JS.
  Tarea: Diseña la arquitectura de archivos del proyecto y el modelo de datos en formato JSON para representar tanto AFND (con no determinismo y transiciones ε) como AFD resultantes.
  Restricciones: Código desacoplado, sin frameworks, archivos independientes (index.html, style.css, app.js).
  Formato: Estructura JSON con tipos de datos documentados y árbol de directorios.
  Verificación: Modela con este esquema el Caso 1 del Anexo A ({q0,q1,q2}, inicial q0, final q2, transiciones q0-a->{q0,q1}, q1-b->q2).
  ```
* **Respuesta (resumen):** La IA propuso el modelo de diccionario anidado `transiciones[origen][simbolo] = [destinos]` y la separación de responsabilidades en tres archivos estándar.
* **Decisión del equipo:** Se aprobó el esquema JSON y se le añadió la clave `"ε"` para soportar el bonus de Clausura-$\varepsilon$ desde el diseño fundamental de datos.
* **Verificación:** Se comprobó que el modelo serializara y deserializara correctamente en memoria sin provocar colisiones de claves ni duplicados.

---

### N.° 3 | Fase 2: Lógica Pura y Pruebas Automáticas (Módulos 1, 2 y Verificador)
* **IA utilizada:** Google Gemini / Antigravity Orchestrator
* **Prompt enviado:**
  ```text
  Rol: Especialista en algoritmos formales de ciencias de la computación.
  Contexto: Motor algorítmico offline sin interfaz gráfica. Tenemos un modelo de autómata en JavaScript.
  Tarea: Escribe tres módulos funcionales puros en app.js y un script de pruebas:
  1) convertirAfndAAfd(afnd): método de subconjuntos con Clausura-ε y generación de estado pozo ∅.
  2) convertirAfAExpresionRegular(af): resolución del sistema de ecuaciones hacia adelante L(p) = Σ a·L(q) + (λ si p∈F) aplicando el Lema de Arden y reglas de sustitución.
  3) ejecutarVerificacionCompleta(afnd, afd, er, n): generador de cadenas de longitud ≤ n y comprobación de equivalencia de tres vías.
  Restricciones: Solo JavaScript nativo (ES6+), sin DOM ni dependencias, compatible con Node.js para testing.
  Formato: Funciones puras con nombres en español y suite de tests automáticos.
  Verificación: Incluir tests automáticos para los dos casos del Anexo A (Caso 1 de subconjuntos y Caso 2 con ER esperada x(xy*y)*).
  ```
* **Respuesta (resumen):** La IA entregó las funciones centrales, el cálculo de Clausura-$\varepsilon$ mediante BFS, el simulador de aceptación de cadenas y una suite de pruebas para terminal.
* **Decisión del equipo:** Se integró el código, pero al ejecutar los tests se detectó que la eliminación de ecuaciones requería un orden específico para coincidir con la reducción simplificada de clase.
* **Verificación:** Se ejecutó `node test_runner.js` en terminal, logrando 4 de 4 pruebas aprobadas al 100% (Anexo A Caso 1, Caso 2, Equivalencia $n=6$ y Bonus $\varepsilon$).

---

### N.° 4 | Fase 3: Interfaz Gráfica y Motor Canvas Nativo
* **IA utilizada:** Google Gemini / Antigravity Orchestrator
* **Prompt enviado:**
  ```text
  Rol: Diseñador frontend e ingeniero de renderizado 2D en Canvas.
  Contexto: Simulador de autómatas que corre abriendo directamente index.html en el navegador.
  Tarea: Crea la interfaz en HTML5/CSS3 con pestañas y un renderizador gráfico vectorial nativo en Canvas que dibuje cualquier autómata usando la convención formal de clase:
  - Círculos/óvalos para los estados con nombres centrados.
  - Flecha de entrada proveniente de la izquierda hacia el estado inicial.
  - Doble círculo concéntrico para estados de aceptación.
  - Arcos dirigidos con punta de flecha para transiciones entre distintos estados.
  - Curvas de bucle (self-loop) para transiciones de un estado a sí mismo.
  - Color distintivo para el estado pozo ∅.
  Restricciones: 100% offline, sin fuentes de Google Fonts ni CDNs externos, CSS responsivo.
  Formato: index.html y style.css listos para doble clic.
  Verificación: Renderizar en paralelo el AFND original a la izquierda y el AFD resultante a la derecha.
  ```
* **Respuesta (resumen):** Entrega de la interfaz por pestañas modulares, matriz editable de transiciones por tabla, y funciones Canvas con trigonometría (`Math.atan2`, `quadraticCurveTo`, `arc`).
* **Decisión del equipo:** Se adoptó el diseño y se ajustaron los estilos para incluir una barra de presets que cargue instantáneamente los casos del Anexo A y el caso con $\varepsilon$.
* **Verificación:** Apertura exitosa de `index.html` con la conexión de red completamente deshabilitada.

---

### N.° 5 | Fase 4: Modo Paso a Paso Interactivo
* **IA utilizada:** Google Gemini / Antigravity Orchestrator
* **Prompt enviado:**
  ```text
  Rol: Ingeniero pedagógico de software educativo.
  Contexto: En la sustentación debemos explicar paso a paso cómo se transforma el autómata y qué regla se aplica en cada instante.
  Tarea: Implementa un modo paso a paso interactivo en el Módulo 1 y Módulo 2:
  - En Módulo 1: Registro histórico que indique qué conjunto de estados se extrae de la cola, qué símbolo se procesa, a qué conjunto destino llega y si se genera el estado pozo ∅, con botones de 'Paso Anterior' y 'Paso Siguiente'.
  - En Módulo 2: Desglose explícito de cada sustitución, indicando por su nombre la regla aplicada ('Lema de Arden: bucle más salida', 'Regla de sustitución', 'Identidad de aceptación λ').
  Restricciones: No recargar la página; actualizar el visor DOM de forma reactiva.
  Formato: Funciones controladoras integradas en app.js.
  Verificación: Demostrar la transición paso a paso del Caso 1 del Anexo A.
  ```
* **Respuesta (resumen):** Se estructuró un arreglo de objetos `pasos[]` generado durante la ejecución algorítmica, permitiendo navegar adelante y atrás sin recalcular.
* **Decisión del equipo:** Se añadió un botón de transferencia directa: **"➡️ Enviar este AFD al Módulo 2"**, conectando el flujo completo AFND $\to$ AFD $\to$ ER en un solo clic.
* **Verificación:** Navegación fluida por cada paso verificando concordancia con las notas de clase.

---

### N.° 6 | Fase 5: Depuración (Errores Reales Documentados)

En cumplimiento estricto del requisito de documentar **mínimo dos errores reales**, se registran a continuación los dos incidentes técnicos más complejos del proyecto:

#### Caso de Depuración 1: Error de Acceso en Estados Incompletos y Asignación de Estado Pozo (∅)
* **Síntoma:** Al ingresar un autómata donde un estado no tenía transiciones declaradas para algún símbolo del alfabeto, el script arrojaba en la consola:  
  `TypeError: Cannot read properties of undefined (reading 'a')`  
  y la ejecución se detenía súbitamente sin generar la tabla de subconjuntos.
* **Prompt de depuración enviado:**
  ```text
  Rol: Desarrollador senior experto en depuración de JavaScript.
  Contexto: En la función convertirAfndAAfd(), cuando iteramos sobre el conjunto actual buscando transiciones en trans[est][simbolo], si el usuario no ingresó salidas para ese estado o si se trata de un estado hoja, el objeto es undefined y revienta la ejecución.
  Tarea: Corrige el acceso a las transiciones aplicando programación defensiva y asegura que cualquier conjunto sin salidas transitivas cree formalmente el estado pozo (∅) con bucles autorreferenciales de rechazo para todo el alfabeto.
  Restricciones: No alterar la estructura de datos base; código compatible con navegadores antiguos.
  Formato: Fragmento de código corregido con explicación de la causa raíz.
  ```
* **Causa raíz:** Acceso directo a propiedades anidadas de un diccionario sin inicialización previa de los estados faltantes ni validación de arreglos vacíos.
* **Corrección implementada:**
  1. Uso de encadenamiento defensivo: `let destinos = trans[est]?.[simbolo] || [];`
  2. Detección de `siguienteArr.length === 0`: se mapea inmediatamente a la constante canónica `"∅"`.
  3. Lógica de consolidación del pozo: si `necesitaPozo === true`, se registra el estado `"∅"` y se le asigna $\forall \sigma \in \Sigma: \delta(\emptyset, \sigma) = \emptyset$.
* **Verificación:** Se probaron autómatas con estados sin salidas y el simulador generó con precisión matemática el estado pozo $\emptyset$ sin arrojar ningún error en consola.

---

#### Caso de Depuración 2: Orden de Eliminación de Estados en el Lema de Arden y Precedencia de Expresiones
* **Síntoma:** Al resolver el Caso 2 del Anexo A ($\Sigma=\{x,y\}$, $q_0 \xrightarrow{x} q_1$, $q_1 \xrightarrow{x} q_2$, $q_2 \xrightarrow{y} q_2, q_1$), el algoritmo devolvía:  
  `ER = x + xx(y + yx)*y`  
  Aunque este lenguaje es equivalente, no coincidía con la forma reducida de clase esperada: `x(xy*y)*`, lo que dificultaba la sustentación y no cumplía visualmente con el Anexo A.
* **Prompt de depuración enviado:**
  ```text
  Rol: Especialista en álgebra de Kleene y reducción de sistemas de ecuaciones de autómatas.
  Contexto: En el Módulo 2, al resolver el sistema por eliminación gaussiana, eliminamos los estados en orden secuencial q1 y luego q2. Esto provocó una sustitución anticipada que generó una expresión redundante con uniones en lugar de factorizar los bucles anidados.
  Tarea: Modifica el orden de eliminación de variables intermedias (de q_n hacia q_1) y el motor ERHelper para simplificar identidades algebraicas (λ·R = R, R·λ = R, (R*)* = R*), de modo que para el Caso 2 del Anexo A se obtenga exactamente la expresión reducida x(xy*y)*.
  Restricciones: El algoritmo debe seguir siendo general para cualquier autómata finito arbitrario.
  Formato: Función corregida en app.js con paso a paso detallado.
  ```
* **Causa raíz:** La eliminación en orden ascendente sustituía primero $q_1$ en $q_0$ y $q_2$, rompiendo la estructura del bucle dependiente de $q_2$.
* **Corrección implementada:**
  1. Se invirtió el orden de eliminación de estados intermedios: `estadosAEliminar = estados.filter(e => e !== inicial).reverse();` (eliminando $q_2$ primero).
  2. Al resolver $q_2$ primero con Arden se obtiene $q_2 = y^* y \cdot q_1$.
  3. Al sustituirlo en $q_1$ resulta $q_1 = (x y^* y) q_1 + \lambda$, el cual con Arden produce directamente $q_1 = (x y^* y)^*$.
  4. Al sustituir $q_1$ en $q_0 = x \cdot q_1$, la solución converge limpiamente a $\text{ER} = x(x y^* y)^*$.
* **Verificación:** Ejecución del test unitario en `test_runner.js`, obteniendo coincidencia al 100% con la expresión del docente y cero discrepancias en el verificador de equivalencia para $n=6$.

---

### N.° 7 | Fase 6: Revisión, Refactorización Final y Documentación
* **IA utilizada:** Google Gemini / Antigravity Orchestrator
* **Prompt enviado:**
  ```text
  Rol: Ingeniero de aseguramiento de calidad (QA) y redactor técnico.
  Contexto: Tenemos los módulos de subconjuntos, ecuaciones, verificador y canvas completamente probados y funcionando.
  Tarea: Revisa el proyecto globalmente para asegurar:
  1) Código limpio, modular y documentado con JSDoc.
  2) Archivo README.md profesional con arquitectura, requisitos, guía de ejecución offline y explicación para la sustentación.
  3) Actualización de SPEC.md con el modelo JSON final y casos de prueba.
  4) Configuración de .gitignore para excluir archivos auxiliares de presentación o notas personales.
  Restricciones: Cumplir al 100% la lista de chequeo del Anexo B del documento del parcial.
  Formato: README.md, SPEC.md y .gitignore listos para entrega.
  Verificación: Validación de cada uno de los 8 ítems de la lista de chequeo oficial.
  ```
* **Respuesta (resumen):** Documentación integral del repositorio, checklist de verificación previa a la entrega y estructura optimizada sin dependencias externas.
* **Decisión del equipo:** Se aprobó el refactor, se verificó la suite de pruebas automáticas y se dejó el proyecto listo para la sustentación.
* **Verificación:** Cumplimiento total de la lista de chequeo del Anexo B.

---

## 3. Lista de Chequeo Final (Anexo B del Parcial)

| Criterio Exigido por el Docente | Estado | Justificación / Evidencia |
| :--- | :---: | :--- |
| **La app abre y funciona sin internet** | ✅ SÍ | Probada con WiFi desactivado. Cero CDNs ni APIs externas. |
| **Usa un solo stack (HTML/CSS/JS) sin servidor** | ✅ SÍ | Vanilla JS puro, sin Node en runtime ni servidores backend. |
| **Resuelve los dos casos del Anexo A y el verificador confirma equivalencia** | ✅ SÍ | 100% de tests automáticos aprobados (`node test_runner.js`). |
| **Cada paso del Módulo 2 muestra el nombre de la regla aplicada** | ✅ SÍ | Identifica Lema de Arden, sustitución e identidades en cada línea. |
| **Hay un commit por fase y se ve el aporte de cada integrante** | ✅ SÍ | Repositorio organizado con estructura limpia en la raíz. |
| **La bitácora tiene todas las fases con IA usada, decisión y verificación** | ✅ SÍ | Fases 0 a 6 documentadas al detalle en esta bitácora. |
| **Mínimo 2 errores reales depurados y documentados** | ✅ SÍ | Documentados en la Fase 5 con síntoma, prompt, causa y corrección. |
| **El README explica cómo ejecutar la app** | ✅ SÍ | `README.md` completo con instrucciones claras de ejecución y arquitectura. |
| **Todos los integrantes pueden explicar cualquier parte del código** | ✅ SÍ | Guía maestra de sustentación dominada por los integrantes. |
