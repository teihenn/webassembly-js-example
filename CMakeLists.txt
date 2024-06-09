cmake_minimum_required(VERSION 3.22)
project(webassembly_js_example)

if(DEBUG)
    set(CMAKE_CXX_FLAGS "-g -DDEBUG=1")
endif()

message(">> MAKE_CXX_FLAGS=${CMAKE_CXX_FLAGS}")

add_subdirectory(wasm)
