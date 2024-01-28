<script lang="ts">
	import { formatDate } from "$lib/utils";
	export let data;
</script>

<!-- Making Google happy -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published on {formatDate(data.meta.date)}</p>
		<p>
			Category: <a class="category surface-4" href="_blank">{data.meta.category}</a>
		</p>
	</hgroup>

	<hr />

	<div class="post-content">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
	}

	h1 + p {
		margin-top: var(--size-2);
	}

	.tags {
		display: flex;
		gap: var(--size-3);
		margin-top: var(--size-7);
	}

	.tags > *,
	.category {
		padding: var(--size-1) var(--size-3);
		border-radius: var(--radius-round);
	}
</style>
