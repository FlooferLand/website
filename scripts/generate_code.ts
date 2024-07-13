// #!/bin/bun

import { $ } from "bun";
import { postCategories } from "../src/lib/posts";
import { gamePlatforms } from "../src/lib/data";
import path from "path";
import fs from "fs";
import { assetsPath, scriptGeneratedPath } from "../src/lib/config";

// Paths
const rootDir = (await ($`pwd`).text()).trim();
const emojiDir = path.join(assetsPath, "emoji");

// For posts
const t_postCategory = makeStringSelection(postCategories);
const t_postTag = makeStringSelection(postCategories);

// For game data stuff
const t_gamePlatforms = makeStringSelection(gamePlatforms);

// Emoji stuff (variants are hard-coded for now)
function emojisFromPath(filePath: string = "") {
    const files: Array<string> = [];
    const filesNoExt: Array<string> = [];

    for (const fileName of fs.readdirSync(path.join(rootDir, emojiDir, filePath))) {
        if (!fileName.includes('.')) continue; // Skip folders
        if (!fileName.endsWith(".webp")) {
            console.warn(`Emoji \"${fileName}\" is not a webp file!\nThis impacts the speediness of the website`);
            continue;
        }
        files.push(fileName);
        filesNoExt.push(fileName.replace(".webp", ""));
    }

    return objectFromKeys(
        filesNoExt,
        key => { return { path: path.join(assetsPath, "emoji", "variants", path.basename(filePath), files.find(e => e.startsWith(key)) ?? "ERROR") } }
    );
}
function emojiVariants() {
    const variants: Array<string> = [];
    for (const folderName of fs.readdirSync(path.join(rootDir, emojiDir, "variants"))) {
        if (folderName.includes('.')) continue; // Skip files
        variants.push(folderName);
    }
    return variants;
}
const defaultVariant = "nana";
const emojis = emojisFromPath();
const variantedEmojis = emojisFromPath(path.join("variants", defaultVariant));
const emojiVariantTypes = emojiVariants();
write("emoji.ts", /*ts*/`
    export type EmojiName = ${makeStringSelection(Object.keys(emojis))};
    export const emojiNames = ${makeObject(emojis)};

    export type VariedEmojiName = ${makeStringSelection(Object.keys(variantedEmojis))};
    export const variedEmojiNames = ${makeObject(variantedEmojis)};

    export type EmojiVariant = ${makeStringSelection(emojiVariantTypes)};
    export const emojiVariants = ${makeObject(emojiVariantTypes)};

    export const defaultVariant: string = "${defaultVariant}";
`);

// Writing types
write("types.ts", /*ts*/`
    export type PostCategory = ${t_postCategory};
    export type PostTag = ${t_postTag};

    export type GamePlatform = ${t_gamePlatforms};
`);

// -- Utility --

/** Writes the code to a file */
function write(filename: string, code: string) {
    Bun.write(
        Bun.file(path.join(rootDir, scriptGeneratedPath, filename)),
        ("// This file is generated via a script\n" + code)
            .split('\n')
            .map(e => e.replace(/\t|    /, ""))
            .join('\n')
            .replaceAll('    ', '\t')
            .trim() + '\n'
    )
}

function objectFromKeys(array: Array<string>, valueGenerator: (key: string) => any) : object {
    const obj = {};
    for (const key of array) {
        obj[key] = valueGenerator(key);
    }
    return obj;
}

/** Creates a string choice. For example "dirt"|"grass"|"stone" */
function makeStringSelection(array: Array<string>) : string {
    return array.map(v => `"${v}"`).join(" | ");
}
function makeObject(obj: object) : string {
    return JSON.stringify(obj, null, 4)
        .split('\n')
        .map((value, i, arr) => (i != 0 && i != arr.length-1) ? `    ${value}` : value)
        .join('\n');
}
