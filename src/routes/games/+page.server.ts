import { socialAccounts } from "$lib/aboutme";
import { gamePlatforms } from "$lib/data";
import type { GamePlatform } from "$lib/generated/types";
import cheerio from "cheerio";

export async function load({ fetch }) {
    const itch: Array<GameInfo> = await getItchGames(await fetch(socialAccounts.itchIo));
    // await getGamejoltGames(await fetch(socialAccounts.gamejolt + "/games"));
    return {
        games: itch // itch.concat(gamejolt)
    }
}

export type GameInfo = {
    url: string,
    title: string,
    shortText: string,
    thumbnail?: string,
    platforms: Array<GamePlatform>
}

async function getItchGames(response: Response) : Promise<Array<GameInfo>> {
    const $ = cheerio.load(await response.text());
    const games: Array<GameInfo> = [];
    
    $(".game_cell").each((index, gameCell) => {
        const url = $(gameCell).find("a").attr("href") ?? socialAccounts.itchIo;
        const title = $(gameCell).find(".game_title").text();
        const shortText = $(gameCell).find(".game_text").text();
        
        // Getting the thumbnail
        const thumbnailElement = $(gameCell).find(".game_thumb img");
        const thumbnail = thumbnailElement.attr("src")
            ?? thumbnailElement.attr("data-lazy-src")
            ?? thumbnailElement.attr("data-lazy_src");

        // Getting the platforms
        const platforms: Array<GamePlatform> = $(gameCell)
            .find(".game_platform span")
            .map((i, e) => mapPlatforms(($(e).attr("title") ?? "").toLowerCase()))
            .get()
            .filter(a => a != undefined);
        
        games.push({ url, title, shortText, thumbnail, platforms });
    });

    return games;
}

/*async function getGamejoltGames(response: Response) : Promise<Array<GameInfo>> {
    const text = await response.text();
    const $ = cheerio.load(text);
    const games: Array<GameInfo> = [];
    
    // FIXME: Can't find a way to load GameJolt
    
    $("._game-grid-item").each((index, gridItem) => {
        console.log(gridItem);
        const metaRoot = $(gridItem).find(".-meta");
        const metaExtraRoot = $(metaRoot).find(".-meta-extra");
        const thumbnailRoot = $(gridItem).find("a.game-thumbnail");
        const osRoot = $(metaExtraRoot).find(".-os");

        const url = $(gridItem).find("a").attr("href") ?? socialAccounts.itchIo;
        const title = $(metaRoot).find(".-title").text() ?? $(metaRoot).find(".-title").attr("title");
        const shortText = $(gridItem).find(".game_text").text();
        const thumbnail = thumbnailRoot.attr("href") ?? socialAccounts.gamejolt;
        const platforms: Array<GamePlatform> = osRoot.find("span")
            .map((i, e) => mapPlatforms(($(e).attr("class") ?? "").toLowerCase()))
            .get()
            .filter(a => a != undefined);
        
        console.log(osRoot.find("span")
        .map((i, e) => ($(e).attr("class") ?? "").toLowerCase()))

        games.push({ url, title, shortText, thumbnail, platforms });
    });
    return [];
}*/

function mapPlatforms(platformName: string) : GamePlatform | undefined {
    return gamePlatforms.find(platform => platformName && platformName.includes(platform));
}
