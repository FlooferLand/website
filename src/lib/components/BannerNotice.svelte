<script lang="ts">
    export let type: ("info"|"warning"|"error");
</script>

<div class={type}>
    <span>{type}!</span>
    <span><slot/></span>
</div>

<style lang="scss">
    div {
        width: 100%;
        height: min-content;
        text-align: justify;
        padding: 3pt;
        margin-block: 3pt;
        
        cursor: default;

        span {
            font-weight: bolder;
            display: block;
            width: 100%;
            height: auto;
            padding: 0;
            margin: 0;
            line-height: 12.5pt;
        }
    }

    .info {
        color: var(--info);
        background-color: var(--surface-1);
    }
    .warning {
        color: rgb(0, 0, 0);
        background-color: var(--warning);
    }
    .error {
        color: var(--surface-1);
        background-color: var(--error);
    }
</style>
