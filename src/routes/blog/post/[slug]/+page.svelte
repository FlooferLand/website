<script lang="ts">
    import type { Post } from "$lib/types";
	import { formatDate } from "$lib/utils";
    import type { PageData } from "./$types";

	export let data: PageData;
	let post: Post;
	$: if (data.post) post = data.post
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

		{#if post.metadata.tags.length > 0}
			<p>
				Tags: <a class="tag surface-4" href="_blank">{post.metadata.tags}</a>
			</p>
		{/if}
	</hgroup>

	<hr />

	<!-- TODO: Try to do server-side rendering instead -->
	<!-- https://stackoverflow.com/a/78267894/15471053 -->
	<!-- EDIT: @html is sorta server-side rendering? -->
	<div class="post-content">
		{@html data.htmlContent}
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

	.tag {
		display: flex;
		gap: var(--size-3);
		margin-top: var(--size-7);
	}
	.tag > *,
	
	.category {
		padding: var(--size-1) var(--size-3);
		border-radius: var(--radius-round);
	}
</style>
