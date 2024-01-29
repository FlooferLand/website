<script lang="ts">
    export let text: string;
    export let url: string;

    export let light: boolean = false;
    export let id: string = "";
</script>

<a href={url} class={(light ? "light" : "")} {id}>{text}</a>

<style>
    .light {
        filter: saturate(50%) brightness(110%);
    }
</style>
