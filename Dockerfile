FROM rust:latest AS build

# WASM setup
RUN rustup target add wasm32-unknown-unknown
RUN cargo install trunk wasm-bindgen-cli

WORKDIR /usr/src/website

# Cache dependencies
COPY Cargo.toml Cargo.lock ./
RUN mkdir -p server/src && echo "fn main() {}" > server/src/main.rs
RUN mkdir -p client/src && echo "fn main() {}" > client/src/main.rs
RUN mkdir -p common/src && echo "fn main() {}" > common/src/main.rs
COPY server/Cargo.toml ./server/
COPY client/Cargo.toml ./client/
COPY common/Cargo.toml ./common/
RUN cargo build --release
RUN rm -r server client common

# Copy source files and build
COPY . .
RUN cd client && trunk build --release
RUN cargo build --release

# Image
FROM gcr.io/distroless/cc-debian12
COPY --from=build /usr/src/website/target/release/server /usr/local/bin/server/server
COPY --from=build /usr/src/website/client/dist /usr/local/bin/client/dist
WORKDIR /usr/local/bin/server
CMD ["/usr/local/bin/server/server"]
