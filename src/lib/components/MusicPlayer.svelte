<script lang="ts">
    import { randomFromList } from "$lib/utils";
    import { PauseIcon, PlayIcon } from "lucide-svelte";
    import { onMount } from "svelte";

    // TODO: Generate at compile-time via a Bun script
    const songList = [
        "assets/audio/music/thingsmaygetbetter.mp3"
    ];
    
    const song = randomFromList(songList);
    let audio: HTMLAudioElement;

    function playButtonOnClick() {
        if (!audio.paused) {
            audio.pause();
        } else {
            audio.play();
        }
    }
</script>

<div class="music_player">
    <audio bind:this={audio} autoplay>
        {#each songList as song}
            <source src={song} type="audio/mpeg" />
        {/each}
    </audio>
    
    <button on:click={playButtonOnClick}>
        {#if audio != undefined}
            {#if audio.paused}
                <PlayIcon />
            {:else}
                <PauseIcon />
            {/if}
        {/if}
    </button>

    <span>{(audio?.duration ?? 0) - (audio?.played?.length ?? 0)}/{audio?.duration ?? "0:00"}</span>
</div>

<style lang="scss">
    .music_player {
        display: inline-block;
    }
</style>
