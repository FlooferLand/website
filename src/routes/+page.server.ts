import { privateEmails } from "$lib/aboutme.js";
import cryptoJs from "crypto-js";
const { MD5 } = cryptoJs;

const readmeLink = "https://github.com/FlooferLand"

type ReturnType = {
    gravatarUrl: string,
    readmeLink: string
}

export async function load({ fetch }) : Promise<ReturnType> {
    const gravatarId = MD5(privateEmails.primary).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarId}`;

    return {
        gravatarUrl,
        readmeLink
    };
}
