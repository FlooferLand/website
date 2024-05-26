import { socialAccounts } from "$lib/aboutme";
import { yummyWords } from "$lib/data";
import type { Actions } from "@sveltejs/kit";

export function load() {
    let htmlStuff = "";
    buildHtml(socialAccounts);
    
    function buildHtml(obj: object, topKey?: string) {
        const keys = Object.keys(obj) as (keyof typeof obj)[];
        const values = Object.values(obj);
        for (const [i, key] of keys.entries()) {
            let value = values[i];
            if (value == undefined) continue;
            if (typeof(value) == "object" && Object.keys(value).length > 0) {
                htmlStuff += "<li>\n";
                buildHtml(value, key);
                htmlStuff += "\n</li>\n"
            } else if (typeof(value) == "string") {
                const name: string = (topKey ? `${topKey} ` : "") + (topKey ? `(${key})` : key);
                htmlStuff += `\t
                    <li><p>
                        ${name}: <a href=${value}>${value}</a>
                    </p></li>` + '\n'
            }
        }
    }

    return {
        htmlStuff
    }
}

type VerifyReturnType = { success: boolean, error?: Array<string> }
export const actions: Actions = {
    verify: async ({ request }) : Promise<VerifyReturnType> => {
        const form = await request.formData();
        const input = (form.get("input") as string | null) ?? "";
        if (input.length == 0)
            return { success: false, error: ["No text provided"] };
        const inputText = input.toLowerCase().trim();

        if (yummyWords.includes(inputText)) {
            return { success: true };
        }
        return {
            success: false,
            error: [
                `"${inputText}" is not a yummy word!`,
                "Hint: Yummy means tasty/edible; type in something you'd eat"
            ]
        };
    }
}