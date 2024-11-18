#!/bin/bash

echo "THIS SCRIPT IS CURRENTLY BROKEN"
echo "USE CARGO-MAKE INSTEAD!"

return
clear

# Functions
install_dep() {
	dep_name="$3"
	if eval "$1" | grep -vq -- "$dep_name"; then
    	echo "'$dep_name' not found.. Installing.."
    	eval "$2 $dep_name"
    fi
}
run_thread() {
	echo "Running $1" 1>&2 && shift
	eval "$@"
	echo $!
}

# Dependencies
install_dep "cargo install --list" "cargo install" trunk
install_dep "cargo install --list" "cargo install" cargo-watch
install_dep "rustup target list --installed" "rustup target add" wasm32-unknown-unknown

# Running stuff
server=$(run_thread "server" "cd server && cargo build && cargo watch -x run --")
client=$(run_thread "client" "cd client && trunk build && trunk serve --release=false")
cleanup() {
	echo "Exiting.."
	kill "$server" "$client"
	wait "$server" "$client"
}
trap cleanup EXIT HUP TERM INT
wait -n
