#pragma once

#ifdef BUILD_WASM
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

#ifdef __cplusplus
extern "C" {
#endif

// The EMSCRIPTEN_KEEPALIVE macro is used to prevent the Emscripten compiler
// from eliminating or mangling the names of functions during optimization.
// This ensures that the specified functions remain accessible and callable from
// JavaScript, even after the aggressive optimizations typically performed
// during the WebAssembly compilation process.
float* EMSCRIPTEN_KEEPALIVE process(int* a,
                                    int num_of_a,
                                    float* b,
                                    int num_of_b);

#ifdef __cplusplus
}
#endif
