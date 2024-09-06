FROM rust:latest as build

# WASM setup
RUN rustup target add wasm32-unknown-unknown
RUN cargo install trunk wasm-bindgen-cli

WORKDIR /usr/src/website
COPY . .

# Building
RUN cd frontend && trunk build --release
RUN cargo build --release

# Image
FROM gcr.io/distroless/cc-debian12
COPY --from=build /usr/src/website/target/release/backend /usr/local/bin/backend
COPY --from=build /usr/src/website/target/frontend/dist /usr/local/bin/dist
WORKDIR /usr/local/bin
CMD ["backend"]