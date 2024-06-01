<script lang="ts">
    import { defaultVariant, variedEmojiNames, type EmojiVariant, type VariedEmojiName } from "$lib/generated/emoji";
    import { tooltip } from "@svelte-plugins/tooltips";

    type Selector = `${`${EmojiVariant}:` | ""}${VariedEmojiName}`;
    export let id: Selector;

    function getVariant() : string {
        return id.split(':').length > 1 ? (id.split(':')[0] ?? defaultVariant) : defaultVariant
    }
    function getName() : string {
        return id.split(':')[1] ?? id
    }

    let variant: string = getVariant();
    let name: string = getName();
    $: {
        [variant, name] = [getVariant(), getName()];
    }
</script>

<span use:tooltip={{ content: `${variant}:${name}` }}>
    <img src={variedEmojiNames[name].path} alt="({name} emoji)" class="emoji">
</span>

<style lang="scss">
    img {
        border-radius: 0;
    }
</style>
