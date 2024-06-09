#pragma once

#ifdef BUILD_WASM
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

#ifdef __cplusplus
extern "C" {
#endif

char* EMSCRIPTEN_KEEPALIVE get_msg();
void EMSCRIPTEN_KEEPALIVE set_msg(char* msg);

#ifdef __cplusplus
}
#endif
