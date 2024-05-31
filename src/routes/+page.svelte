<script lang="ts">
    import { socialAccounts } from "$lib/aboutme";
    import LucideIcon from "$lib/components/LucideIcon.svelte";
    import { unpackObject, camelCaseToWordCase, capitalizeString } from "$lib/utils";

    export let data;
</script>

<main>
    <div class="left">
        <img src={data.gravatarUrl} alt="(my profile pic)" />
        <h3>Floof 🦇</h3>
        <p>haii i'm Floof. I like playing games, making games, and making music</p>
    </div>
    <div class="left">
        <ul>
            {#each unpackObject(socialAccounts) as [keys, value]}
                <li>
                    <LucideIcon name={capitalizeString(keys[0])} />
                    <a class="social-button" href={value}>
                        {keys.map(a => camelCaseToWordCase(a)).join(" / ")}
                    </a>
                </li>
                <br/>
            {/each}
        </ul>
    </div>
</main>

<style lang="scss">
    ol, ul {
        list-style-type: none;
        transform: none;
    }

    .left {
        float: left;
        margin-right: 15pt;
        width: 40%;
    }
    .right {
        width: 3%;
        word-wrap: break-word;
    }
</style>
