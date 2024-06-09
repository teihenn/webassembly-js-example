#pragma once

#ifdef BUILD_WASM
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

#ifdef __cplusplus
extern "C" {
#endif

void* EMSCRIPTEN_KEEPALIVE alloc(int size);
void EMSCRIPTEN_KEEPALIVE dealloc(void* address);

#ifdef __cplusplus
}
#endif
