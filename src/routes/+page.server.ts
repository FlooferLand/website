import { getMdsvexOptions } from "$lib/markdown.js";
import { compile } from "mdsvex";

const readmeLink = "https://github.com/FlooferLand"
const rawReadmeLink = "https://raw.githubusercontent.com/FlooferLand/FlooferLand/main/README.md"

type ReturnType = {
    readmeLink: string,
    html: string
}
function error() : ReturnType {
    return {
        html: /*html*/`
            <p>I.. uhh.. info about me was supposed to show up here but an error occured!!</p>
            <a href="${readmeLink}">Its fine!! click here to view the info that was supposed to show up here!</a>
        `,
        readmeLink
    }
}

export async function load({ fetch }) : Promise<ReturnType> {
    const response = await fetch(rawReadmeLink);
    if (!response.ok) return error();

    const compiled = await compile(await response.text(), getMdsvexOptions(true));
    if (!compiled) return error();

    return {
        readmeLink,
        html: compiled.code
    };
}
