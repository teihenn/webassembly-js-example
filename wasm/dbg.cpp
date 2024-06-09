#include "dbg.h"
#include <stdio.h>

#ifdef __cplusplus
extern "C" {
#endif

static char _msg[102400];
static int _msg_remain = 102400 - 1;
static int _msg_pos = 0;

char* EMSCRIPTEN_KEEPALIVE get_msg() {
  return _msg;
}

void EMSCRIPTEN_KEEPALIVE set_msg(char* msg) {
  int n = snprintf(&_msg[_msg_pos], _msg_remain, "%s", msg);
  _msg_pos += n;
  _msg_remain -= n;
}

#ifdef __cplusplus
}
#endif
