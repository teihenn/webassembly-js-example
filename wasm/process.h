#pragma once

#ifdef BUILD_WASM
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

#ifdef __cplusplus
extern "C" {
#endif

float* EMSCRIPTEN_KEEPALIVE process(int* a,
                                    int num_of_a,
                                    float* b,
                                    int num_of_b);

#ifdef __cplusplus
}
#endif
