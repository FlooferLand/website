<script lang="ts">
    import * as icons from "lucide-svelte";
    export let name: string;
</script>

<svelte:component this={icons[name]} {...$$props} />

<style lang="scss">
    svg {
        margin: 0 !important;
        padding: 0 !important;
    }
</style>
