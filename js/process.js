const fs = require('fs');

const wasmFile = fs.readFileSync('/app/build/wasm/example.wasm');

function doProcess() {

    const wasm = _instantiateWasm(wasmFile);

    const intArr = [1, 2, 3, 4, 5];
    const intArrAddr = _allocAndAssignVals(wasm, intArr, "int32");

    console.log("intArrAddr: " + intArrAddr);

    const floatArr = [1.0, 2.0, 3.0, 4.0, 5.0];
    const floatArrAddr = _allocAndAssignVals(wasm, floatArr, "float32");

    console.log("floatArrAddr: " + floatArrAddr);

    const { process, memory, get_msg } = wasm.exports;
    const resultAddr = process(intArrAddr, intArr.length, floatArrAddr, floatArr.length);
    _deallocMemory(wasm, intArrAddr, floatArrAddr);

    const results = new Float32Array(memory.buffer, resultAddr, 3);
    _getMsgAndPrint(wasm, get_msg(), 102400);
    console.log("results: " + results);
}

function _instantiateWasm(wasmFile) {
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
function _allocAndAssignVals(wasm, array, type) {
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
function _deallocMemory(wasm, ...addrs) {
    const { dealloc } = wasm.exports;
    for (const addr of addrs) {
        dealloc(addr.byteOffset);
    }
}

function _getMsgAndPrint(wasm, addr, length) {
    const { memory } = wasm.exports;
    const internalMsg = new Uint8Array(memory.buffer, addr, length);
    const len = _arrayBufferStringLength(internalMsg);
    const msg = String.fromCharCode.apply("", internalMsg.slice(0, len));
    console.log(msg);
    return msg;
}

/**
 * Get string length from ArrayBuffer
 * @param {Uint8Array} arrayBuffer
 * @returns {number}
 */
function _arrayBufferStringLength(arrayBuffer) {
    for (let i = 0; i < arrayBuffer.length; i++) {
        if (arrayBuffer[i] === 0) {
            return i;
        }
    }
}

module.exports = { doProcess };

