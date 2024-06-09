#include <emscripten/emscripten.h>

#ifdef __cplusplus
extern "C" {
#endif

float* EMSCRIPTEN_KEEPALIVE process(int* a,
                                    int num_of_a,
                                    float* b,
                                    int num_of_b) {
  static float ret[3] = {0., 0., 0.};
  for (int i = 0; i < num_of_a; i++) {
    ret[0] += static_cast<float>(a[i]);
  }
  for (int i = 0; i < num_of_b; i++) {
    ret[1] += b[i];
  }
  ret[2] = ret[0] + ret[1];
  return ret;
}

void* EMSCRIPTEN_KEEPALIVE alloc(int size) {
  return malloc(size);
}

void EMSCRIPTEN_KEEPALIVE dealloc(void* address) {
  free(address);
}

#ifdef __cplusplus
}
#endif
