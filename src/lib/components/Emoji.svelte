<script lang="ts">
    import { emojiNames, type EmojiName } from "$lib/generated/emoji";

    export let name: EmojiName;
</script>

<img src={emojiNames[name].path} alt="📎" class="emoji">

<style lang="scss">
    img {
        border-radius: 0;
    }
</style>
