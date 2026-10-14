/**
 * SUITE DE PRUEBAS AUTOMATIZADAS - LÓGICA PURA (FASE 2)
 * Valida los dos casos obligatorios del Anexo A, el verificador de equivalencia y el bonus épsilon.
 * Ejecución: node test_runner.js
 */

const {
    PRESETS,
    convertirAfndAAfd,
    convertirAfAExpresionRegular,
    ejecutarVerificacionCompleta,
    ejecutarSuitePruebas
} = require("./app.js");

console.log("==============================================================");
console.log("  INICIANDO SUITE DE PRUEBAS: SIMULADOR DE AUTÓMATAS (OFFLINE)");
console.log("==============================================================\n");

const exito = ejecutarSuitePruebas();

if (exito) {
    console.log("\n>>> TODAS LAS PRUEBAS AUTOMÁTICAS PASARON EXITOSAMENTE (100%) <<<");
    process.exit(0);
} else {
    console.error("\n>>> HUBO FALLAS EN LAS PRUEBAS AUTOMÁTICAS <<<");
    process.exit(1);
}
