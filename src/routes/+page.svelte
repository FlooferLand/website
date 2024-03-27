<script lang="ts">
	import { formatDate } from "$lib/utils.js";
	export let data;
</script>

<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<img class="thumbnail" src={post.thumbnail} alt="thumbnail" />
				<a class="title" href={"/post/" + post.slug}>{post.title}</a>
				<p class="date">{formatDate(post.date)}</p>
				<p class="desc">{post.desc}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
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
		box-shadow: 0pt 0pt 15pt rgba(255, 255, 255, 0.2);
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
</style>
