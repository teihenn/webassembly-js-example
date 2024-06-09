# webassembly-js-example

## Prerequisites

- Docker
- Docker Compose

These are required to build and run the application.

## Run
```bash
docker compose run --rm app bash -c "make build && node js/main.js"
```

### output
```bash
[+] Building 0.0s (0/0)                                                                                             docker:desktop-linux
[+] Building 0.0s (0/0)                                                                                             docker:desktop-linux
emcmake cmake -S . -B build -DBUILD_WASM=1 && cd build && make VERBOSE=1
configure: cmake -S . -B build -DBUILD_WASM=1 -DCMAKE_TOOLCHAIN_FILE=/emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake -DCMAKE_CROSSCOMPILING_EMULATOR=/emsdk/node/16.20.0_64bit/bin/node

...

make[3]: Leaving directory '/app/build'
[100%] Built target example
make[2]: Leaving directory '/app/build'
/usr/bin/cmake -E cmake_progress_start /app/build/CMakeFiles 0
make[1]: Leaving directory '/app/build'

results: 15,35,50
```

## Run with debug log
```bash
docker compose run --rm app bash -c "make build-debug && node js/main.js"
```

### output
```bash
[+] Building 0.0s (0/0)                                                                                             docker:desktop-linux
[+] Building 0.0s (0/0)                                                                                             docker:desktop-linux
emcmake cmake -S . -B build -DDEBUG=1 -DBUILD_WASM=1 && cd build && make VERBOSE=1
configure: cmake -S . -B build -DDEBUG=1 -DBUILD_WASM=1 -DCMAKE_TOOLCHAIN_FILE=/emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake -DCMAKE_CROSSCOMPILING_EMULATOR=/emsdk/node/16.20.0_64bit/bin/node

...

make[3]: Leaving directory '/app/build'
[100%] Built target example
make[2]: Leaving directory '/app/build'
/usr/bin/cmake -E cmake_progress_start /app/build/CMakeFiles 0
make[1]: Leaving directory '/app/build'
>> [0] = 1
>> [1] = 2
>> [2] = 3
>> [3] = 4
>> [4] = 5

results: 15,35,50
```

## clean
```bash
make clean
```
