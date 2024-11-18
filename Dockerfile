FROM rust:latest AS build

# WASM setup
RUN rustup target add wasm32-unknown-unknown
RUN cargo install trunk wasm-bindgen-cli

WORKDIR /usr/src/website
COPY . .

# Building
RUN cd client && trunk build --release
RUN cargo build --release

# Image
# TODO: Maybe copy over other things like server-side assets..?
FROM gcr.io/distroless/cc-debian12
COPY --from=build /usr/src/website/target/release/server /usr/local/bin/server/server
COPY --from=build /usr/src/website/client/dist /usr/local/bin/client/dist
WORKDIR /usr/local/bin/server
CMD ["server/server"]