add_executable(example process.cpp dbg.cpp memory.cpp)

if(BUILD_WASM)
    set_target_properties(example PROPERTIES OUTPUT_NAME example)
    target_compile_options(example PUBLIC -O3 --no-entry -DBUILD_WASM=1)
    target_link_options(example PUBLIC -s STANDALONE_WASM=1 --no-entry)
endif()
