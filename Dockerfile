FROM emscripten/emsdk:3.1.59-arm64

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y nodejs npm cmake
