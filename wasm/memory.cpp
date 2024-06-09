#include "memory.h"
#include <stdlib.h>

#ifdef __cplusplus
extern "C" {
#endif

void* EMSCRIPTEN_KEEPALIVE alloc(int size) {
  return malloc(size);
}

void EMSCRIPTEN_KEEPALIVE dealloc(void* address) {
  free(address);
}

#ifdef __cplusplus
}
#endif
