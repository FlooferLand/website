<script lang="ts">
    import { getGithubRepoLink } from "$lib/aboutme";
    import VerticalRule from "$lib/components/VerticalRule.svelte";
    import { getPostUrl } from "$lib/config";
    import type { PostCategory, PostTag } from "$lib/generated/types.js";
    import { categoriesArray, tagsArray } from "$lib/posts";
    import type { Post } from "$lib/types.js";
	import { capitalizeString, formatDate } from "$lib/utils";
	import { onMount } from "svelte";
	export let data;
	let posts: Array<Post> = [];

	enum SortOrder {
		Newest,
		Oldest
	}

	type FilterObj = { order: SortOrder, category: PostCategory | undefined, tags: Array<PostTag> }
	const filter: FilterObj = {
		order: SortOrder.Newest,
		category: undefined,
		tags: []
	};

	function resort() {
		filter.tags = filter.tags
			.filter(tag => tag && tag.length > 0);

		posts = data.posts
			.sort(
				(a, b) =>
					(b.metadata.date.getTime() - a.metadata.date.getTime())
						* (filter.order == SortOrder.Newest ? 1 : -1)
			)
			.filter(post => filter.category ? post.metadata.category == filter.category : true)
			.filter(post => {
				for (const tag of filter.tags) {
					if (!post.metadata.tags.includes(tag)) {
						return false;
					}
				}
				return true;
			})
	}

	onMount(() => {
		posts = data.posts;
		resort();
	});
</script>

<section>
	<ul class="filters">
		<!-- Ordering -->
		<label for="filter-ordering">Ordering</label>
		<li id="filter-ordering">
			<select
				bind:value={filter.order}
				on:change={resort}
			>
				{#each Object.keys(SortOrder).filter(a => isNaN(Number(a))).entries() as [i, sortOption]}
					<option value={i}>{sortOption}</option>
				{/each}
			</select>
			<VerticalRule />
		</li>

		<!-- Category -->
		<label for="filter-category">Category</label>
		<li id="filter-category">
			<select
				bind:value={filter.category}
				on:change={resort}
			>
				<option value={undefined}>All</option>
				{#each categoriesArray as category}
					<option value={category}>{capitalizeString(category)}</option>
				{/each}
			</select>
			<VerticalRule />
		</li>

		<!-- Tags -->
		<label for="filter-tags">Tags</label>
		<li id="filter-tags">
			<select
				multiple
				bind:value={filter.tags}
				on:change={resort}
			>
				<option value="" on:submit={() => filter.tags = []}>None</option>
				{#each tagsArray as tag}
					<option value={tag}>{capitalizeString(tag)}</option>
				{/each}
			</select>
			<VerticalRule />
		</li>
	</ul>
	<noscript>
		(Sorting/filtering only works with JavaScript, sorry!) <br/>
		<a href={getGithubRepoLink()}>Make a issue on GitHub</a> if you want me to add it in server-side somehow!
	</noscript>

	<hr/>

	<ul class="posts">
		{#each posts as post}
			<li class="post">
				<img class="thumbnail" src={post.thumbnailPath} alt="thumbnail" />
				<a class="title" href={getPostUrl({ slug: post.slug })}>{post.metadata.title}</a>
				<p class="date">{formatDate(post.metadata.date)}</p>
				<p class="desc">{post.metadata.desc}</p>
			</li>
		{:else}
			<p>Nothing here!</p>
		{/each}
	</ul>
	<br/>
</section>

<style lang="scss">
	.filters li {
		display: inline-block;

		select[multiple] {
			width: 150pt;
			height: 30pt;

			&:hover {
				position: absolute;
				height: 130pt;
			}
		}
	}

	.posts {
		display: grid;
		gap: var(--size-7);
	}

	.post {
		max-inline-size: var(--size-content-3);
	}

	.post:not(:last-child) {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--size-7);
	}

	.thumbnail {
		width: 30%;
		background-size: cover;
		float: left;
		margin: 10pt 30pt 10pt 10pt;
		box-shadow: 0pt 0pt 15pt color-mix(in srgb, var(--separator) 40%, transparent);
		-webkit-user-drag: none;
	}

	.title {
		font-size: var(--font-size-fluid-1);
	}

	.date {
		color: var(--text-2);
	}

	.desc {
		margin-top: var(--size-3);
	}

	ul {
		list-style-type: none;
	}
</style>
