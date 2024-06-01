export const title: string = "Floofer's Fluffy Blog";
export const desc: string = "The fluffy";
export const regex = {
    // Matches +page.svelte.ts, +page.svelte, +server.ts, etc
    isUserfacingPage: /\+(page|server).((svelte|server).)?(ts|svelte)?/gi,
}

// Paths
export const assetsPath = "./assets";
export const postsPath = "./src/posts";
export const dataPath = "./src/lib/storage";
export const scriptGeneratedPath = "./src/lib/generated";

// Get the URL of a post
export type PostUrlSettings = {
    hostUrl?: string,
    slug: Required<string>
}
export function getPostUrl(settings: PostUrlSettings) : string {
    return `${settings.hostUrl ?? '.'}/blog/post/${settings.slug}/`
}
