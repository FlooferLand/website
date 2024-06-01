<script lang="ts">
    import { codeToHtml } from "shiki";
    import { onMount } from "svelte";

    export let code: string;
    export let lang: string;
    export let fileName: string | undefined = undefined;
</script>

{#if fileName}
    <pre>{fileName}</pre>
{/if}

{#await codeToHtml(code, { lang, theme: "dark-plus" })}
    <pre {lang}>{code}</pre>
{:then htmlOut}
    {@html htmlOut}
{:catch err}
    <hr/>
    <pre {lang}>{code}</pre>
    <p style="color: red">{err}</p>
    <hr/>
{/await}
