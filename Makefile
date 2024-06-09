.PHONE: all build clean

all: build

build:
	emcmake cmake -S . -B build -DBUILD_WASM=1 && cd build && make VERBOSE=1

build-debug:
	emcmake cmake -S . -B build -DDEBUG=1 -DBUILD_WASM=1 && cd build && make VERBOSE=1

clean:
	rm -rf build
