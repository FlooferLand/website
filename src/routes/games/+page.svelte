<script lang="ts">
    import { socialAccounts } from "$lib/aboutme";
    import BannerNotice from "$lib/components/BannerNotice.svelte";
    import BrandIcon from "$lib/components/BrandIcon.svelte";
    import CharEmoji from "$lib/components/CharEmoji.svelte";
    import { tooltip } from "@svelte-plugins/tooltips";
    export let data;
</script>

<div>
    <!-- Games list -->
    <ol class="game_cells">
        {#each data.games as game}
            <li class="game_cell">
                {#if game.thumbnail}
                    <a href={game.url}>
                        <img src={game.thumbnail} alt={`${game.title} thumbnail`} class="thumbnail" />
                    </a>
                {/if}
                
                <a href={game.url}>
                    <h3>{game.title}</h3>
                </a>
                <h3>{game.shortText}</h3>
                
                <!-- Game platforms -->
                <ul>
                    {#each game.platforms as platform}
                        <span use:tooltip={{ content: platform }}>
                            <BrandIcon name={platform} style="margin: 5pt" />
                        </span>
                    {/each}
                </ul>
            </li>
            <hr/>
        {/each}
    </ol>
    <BannerNotice type="info">
        <p>GameJolt games aren't listed on here because GameJolt is a bloated <small>Vue.js</small> piece of JavaScript shit that is impossible to scrape and it has no API of any kind. <CharEmoji id="angy"/></p>
        <p>View my GameJolt games over at <a href={socialAccounts.gamejolt}>{socialAccounts.gamejolt}</a></p>
    </BannerNotice>
    <BannerNotice type="info">
        TODO: Add newgrounds here once I finally start posting games on there
        <a href="https://flooferland.newgrounds.com/games">https://flooferland.newgrounds.com/games</a> 
    </BannerNotice>
</div>


<style lang="scss">
    ol, ul {
        list-style-type: none;
    }

    li {
        width: 256pt;
    }

    h3 {
        padding: 4pt;
        margin: 0;
    }

    .thumbnail {
        width: 100%;
    }

    .game_cells {
        display: flex;
        flex-direction: row;
        zoom: 80%;
    }

    .game_cell {
        padding: 10pt;
    }
</style>
