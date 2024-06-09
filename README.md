# webassembly-js-example

## Prerequisites

- Docker
- Docker Compose

These are required to build and run the application.

## Run
```bash
docker compose run --rm app bash -c "make build && node js/main.js"
```

## Run with debug log
```bash
docker compose run --rm app bash -c "make build-debug && node js/main.js"
```
