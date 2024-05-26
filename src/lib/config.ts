export const title: string = "Floofer's Fluffy Blog";
export const desc: string = "The fluffy";
export const postsPath = "./src/posts";
export const dataPath = "./src/lib/data";
export const regex = {
    // Matches +page.svelte.ts, +page.svelte, +server.ts, etc
    isUserfacingPage: /\+(page|server).((svelte|server).)?(ts|svelte)?/gi,
}

// Get the URL of a post
export type PostUrlSettings = {
    hostUrl?: string,
    slug: Required<string>
}
export function getPostUrl(settings: PostUrlSettings) : string {
    return `${settings.hostUrl ?? '.'}/blog/post/${settings.slug}/`
}
