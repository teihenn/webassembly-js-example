cmake_minimum_required(VERSION 3.22)
project(wasm_js_ex)

add_executable(example sample.cpp)
set_target_properties(example PROPERTIES OUTPUT_NAME example)
target_compile_options(example PUBLIC -O3 --no-entry)
target_link_options(example PUBLIC -s STANDALONE_WASM=1 --no-entry)
