<script lang="ts">
    import type { Post } from "$lib/types";
	import { formatDate } from "$lib/utils";

	export let data;
	let post: Post;
	let contentPromise;
	$: post = data.post
	$: contentPromise = import(`##posts/${data.slug}/index.md`)
</script>

<!-- Making Google happy -->
<svelte:head>
	<title>{post.metadata.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.metadata.title} />
</svelte:head>

<article>
	<hgroup>
		<h1>{post.metadata.title}</h1>
		<p>Published on {formatDate(post.metadata.date)}</p>
		<p>
			Category: <a class="category surface-4" href="_blank">{post.metadata.category}</a>
		</p>
	</hgroup>

	<hr />

	<!-- TODO: Do server-side rendering instead -->
	<!-- https://stackoverflow.com/a/78267894/15471053 -->
	<div class="post-content">
		{#await contentPromise}
			<p>Loading..</p>
		{:then content}
			<svelte:component this={content.default} />
		{:catch err}
			<p>Error: {err}</p>
		{/await}
	</div>
</article>

<style lang="scss">
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
	}

	h1 + p {
		margin-top: var(--size-2);
	}

	// .tags {
	// 	display: flex;
	// 	gap: var(--size-3);
	// 	margin-top: var(--size-7);
	// }

	// .tags > *,
	.category {
		padding: var(--size-1) var(--size-3);
		border-radius: var(--radius-round);
	}
</style>
