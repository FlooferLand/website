<script lang="ts">
    import { theme } from "$lib/stores/theme";
    import { get } from "svelte/store";

    export let name: string;
    export let size: string = "24pt";

    let themeColor = "red";
    $: themeColor = get(theme) == "dark" ? "white" : "black";
</script>

<img width={size} height={size} src="https://cdn.simpleicons.org/{name.toLowerCase()}/{themeColor}?viewbox=auto" alt="({name} icon)" {...$$props}/>

<style lang="scss">
    img {
        display: inline;
        border-radius: 0;
    }
</style>
