export const contactEmail = "yunaflarf.contact@gmail.com";
export const socialAccounts: Record<string, string|object> = {
    github: "https://github.com/FlooferLand",
    twitter: "https://twitter.com/FlooferLand",
    youtube: {
        main: "https://youtube.com/@FlooferLand",
        music: "https://youtube.com/@Mawqueel",
        animation: "https://youtube.com/@FlooferLandAnimations",
        gameDev: "https://youtube.com/@FlooferLandGames",
    },
    discord: {}
}

export function getGithubRepoLink(): string {
    return "https://github.com/FlooferLand/website";
}

