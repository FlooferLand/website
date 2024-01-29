export async function load({ url }) {
    return {
        hostname: url.host
    };
}