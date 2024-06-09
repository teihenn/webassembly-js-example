.PHONE: all build clean

all: build

build:
	emcmake cmake -S . -B build && cd build && make VERBOSE=1

clean:
	rm -rf build build.cpp
