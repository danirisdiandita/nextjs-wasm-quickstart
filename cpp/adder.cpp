#include <emscripten.h>

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int adder(int a, int b) {
        return a + b;
    };
}