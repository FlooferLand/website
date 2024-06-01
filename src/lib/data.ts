import fs from "fs";
import { dataPath } from "./config";
import type { GamePlatform } from "./generated/types";

// Const
export const gamePlatforms: Array<GamePlatform> = ["linux", "windows", "darwin", "android", "html"];

// Data (cached/loaded)
export const yummyWords: Array<string> = loadWorldList("yummy_words.lst");

/** Loads a list of words from a file; each entry separated by a new line character */
function loadWorldList(filePath: string) : Array<string> {
    const file: string = fs.readFileSync(`${dataPath}/${filePath}`, { encoding: "utf-8" });
    return file
        .split(/[\r\n]+/g)
        .map(v => v.trim().toLowerCase())
        .filter(v => v.length > 0)
}
