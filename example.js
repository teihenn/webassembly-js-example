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

/**
 * Allocate memory and assign values to the wasm module
 * @param {WebAssembly.Instance} wasm
 * @param {number[]} array
 * @param {string} type - data type("int32" or "float32")
 * @returns {Int32Array|Float32Array} - allocated memory
 */
function allocAndAssignVals(wasm, array, type) {
    const { memory, alloc } = wasm.exports;
    const addr = alloc(array.length * 4);
    const obj = type === "int32" ? Int32Array : Float32Array;
    const data = new obj(memory.buffer, addr, array.length);
    for (let i = 0; i < array.length; i++) {
        data[i] = array[i];
    }
    return data;
}

/**
 * Deallocate wasm memory
 * @param {WebAssembly.Instance} wasm
 * @param {...TypedArray} addrs - memory addresses
 */
function deallocMemory(wasm, ...addrs) {
    const { dealloc } = wasm.exports;
    for (const addr of addrs) {
        dealloc(addr.byteOffset);
    }
}

module.exports = { doProcess };

