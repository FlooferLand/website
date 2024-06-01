<script lang="ts">
    import type { ActionData } from "./$types";

	export let form: ActionData;
    export let data;
</script>


<div class="contact-section">
    <h3>Public socials</h3>
    <ul>
        {@html data.publicHtml}
    </ul>
</div>

<hr/>

<div class="contact-section">
    <h3>Want my email and other private stuff??</h3>
    <p>Do this SILLY YUMMY YUMMY CAPTCHA &#8482;</p>

    <form method="POST" action="?/verify">
        <label>
            Enter a word you'd eat:
            <input name="input" type="text" alt="HINT: The iPhone manufacturers" />
        </label>
        <button formaction="?/verify">Verify</button>
    </form>

    {#if form?.success}
        <div>    
            <h3>Here we go!</h3>
            <ul>
                {@html form?.accountsHtml}
            </ul>
        </div>
    {:else if form?.error}
        <div class="error">
            <h3>Error:</h3>
            {#each form?.error as line}
                <p>{line}</p>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .contact-section {
        padding-block: 10pt;
        padding-inline: 30pt;
        background-color: var(--surface-4);
    }

    ul {
        list-style-type: none;
    }

    .error {
        color: var(--red-6);
        p {
            color: var(--red-2);
        }
    }
</style>
