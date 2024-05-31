import { socialAccounts, unsafeSocialAccounts } from "$lib/aboutme";
import { yummyWords } from "$lib/data";
import { buildSocialAccountHtml } from "$lib/utils";
import type { Actions } from "@sveltejs/kit";

export function load() {
    return {
        publicHtml: buildSocialAccountHtml(socialAccounts)
    }
}

type VerifyReturnType = { success: boolean, error?: Array<string>, accountsHtml?: string };
export const actions: Actions = {
    verify: async ({ request }) : Promise<VerifyReturnType> => {
        const form = await request.formData();
        const input = (form.get("input") as string | null) ?? "";
        if (input.length == 0)
            return { success: false, error: ["No text provided"] };
        const inputText = input.toLowerCase().trim();

        if (yummyWords.includes(inputText)) {
            return {
                success: true,
                accountsHtml: buildSocialAccountHtml(unsafeSocialAccounts)
            };
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
