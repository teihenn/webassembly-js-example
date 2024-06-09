const fs = require('fs');
const util = require('util');

const wasmFile = fs.readFileSync('build/example.wasm');

function doProcess() {

    const wasm = instantiateWasm(wasmFile);

    const intArr = [1, 2, 3, 4, 5];
    const intArrAddr = allocAndAssignVals(wasm, intArr, "int32");

    const floatArr = [1.0, 2.0, 3.0, 4.0, 5.0];
    const floatArrAddr = allocAndAssignVals(wasm, floatArr, "float32");

    const { process, memory } = wasm.exports;
    const resultAddr = process(intArrAddr, intArr.length, floatArrAddr, floatArr.length);
    deallocMemory(wasm, intArrAddr, floatArrAddr);

    const results = new Float32Array(memory.buffer, resultAddr, 3);
    console.log("results: " + results);
}

function instantiateWasm(wasmFile) {
    const module = new WebAssembly.Module(wasmFile);
    return new WebAssembly.Instance(module, {});
}

