<script lang="ts">
    import { InfoIcon, MessageCircleWarningIcon } from "lucide-svelte";
    export let type: ("info"|"warning"|"error");
</script>

<div class={type}>
    <span>
        {#if type == "info"}
            <InfoIcon style="display: inline" />
        {:else}
            <MessageCircleWarningIcon style="display: inline"  />
        {/if}
        <hr/>
        {type}!
    </span>
    <span><slot/></span>
</div>

<style lang="scss">
    div {
        width: 100%;
        height: min-content;
        text-align: justify;
        padding: 3pt;
        margin-block: 3pt;
        margin-bottom: 5pt;
        
        cursor: default;

        span {
            font-weight: bolder;
            display: block;
            width: 100%;
            height: auto;
            padding: 0;
            margin: 0;
            text-shadow: 1pt 1pt 3pt var(--surface-1);
            line-height: 12.5pt;
        }
    }

    @function bannerNoticeBackground($color) {
        @return linear-gradient(to bottom, $color, color-mix(in srgb, $color 50%, transparent));
    }

    .info {
        color: var(--text-1);
        background: bannerNoticeBackground(var(--info-bg));
    }
    .warning {
        color: var(--text-1);
        background: bannerNoticeBackground(var(--warning-bg));
    }
    .error {
        color: var(--text-1);
        background: bannerNoticeBackground(var(--error-bg));
    }

    hr {
        margin: 0;
        margin-bottom: 3pt;
        padding: 0;
        background: linear-gradient(to right, rgb(0, 0, 0), transparent);
        opacity: 20%;
        width: 50%;
    }
</style>
