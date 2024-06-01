<script lang="ts">
	export let src = "";
	export let alt = "";
</script>

<img src="content/{src}" {alt} loading="lazy" {...$$props} />
