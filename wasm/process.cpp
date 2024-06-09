#include "process.h"
#include <stdio.h>
#include "dbg.h"

// Without "extern "C"", attempting to call process() from js/process.js would
// result in a TypeError: process is not a function.
// This is because C++ compilers apply name mangling to function names, which
// changes their names in the compiled output.
// Using "extern "C"" prevents name mangling, ensuring the function name remains
// consistent and recognizable when called from other languages like JavaScript.
#ifdef __cplusplus
extern "C" {
#endif

float* EMSCRIPTEN_KEEPALIVE process(int* a,
                                    int num_of_a,
                                    float* b,
                                    int num_of_b) {
  static float ret[3] = {0., 0., 0.};
  for (int i = 0; i < num_of_a; i++) {
    // In WASM, functions like printf cannot be used, so for debugging purposes,
    // values are stored in memory and then retrieved from JavaScript.
#ifdef DEBUG
    char buf[256];
    snprintf(buf, sizeof(buf), ">> [%d] = %d\n", i, a[i]);
    set_msg(buf);
#endif
    ret[0] += static_cast<float>(a[i]);
  }
  for (int i = 0; i < num_of_b; i++) {
    ret[1] += b[i];
  }
  ret[2] = ret[0] + ret[1];
  return ret;
}

#ifdef __cplusplus
}
#endif
