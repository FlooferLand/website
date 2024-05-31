export const socialAccounts = {
    github: "https://github.com/FlooferLand",
    twitter: "https://twitter.com/FlooferLand",
    youtube: {
        main: "https://youtube.com/@FlooferLand",
        music: "https://youtube.com/@Mawqueel",
        animation: "https://youtube.com/@FlooferLandAnimations",
        gameDev: "https://youtube.com/@FlooferLandGames",
    }
}
export const unsafeSocialAccounts = {
    phoneNumber: {},  // TODO: Check if the rickroll phone number from Reddit still works (778-330-2389)
    discord: {},
    contactEmail: "yunaflarf.contact@gmail.com"
}

/** Not of use for contacting; use the contact email instead! */
/** I need to store these to use some services like Gravatar on here */
export const privateEmails = {
    primary:   "yunaflarf@gmail.com",
    secondary: "yunaflarf2@gmail.com"
}

export function getGithubRepoLink(): string {
    return `${socialAccounts.github}/website`;
}

