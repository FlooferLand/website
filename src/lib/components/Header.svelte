<!-- The header for every single page -->

<script lang="ts">
	import { NavLink } from "$lib/components";
	import ThemeToggle from "./ThemeToggle.svelte";
</script>

<main>
	<nav>
		<a href="/" class="logo">
			<b>Floof's Fluffy Blog</b>
		</a>

		<ul class="links">
			<NavLink route="/about" text="About me" />
			<NavLink route="/rss" text="RSS feed" />
		</ul>

		<ThemeToggle />
	</nav>
	<hr />
</main>

<style>
	nav {
		padding-block: var(--size-6);
	}

	hr {
		padding: 0%;
		margin: 0%;
	}

	.links {
		margin-block: var(--size-6);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	@media (min-width: 1024px) {
		nav {
			display: flex;
			justify-content: space-between;
		}

		.links {
			display: flex;
			gap: var(--size-6);
			margin-block: 0;
		}
	}
</style>
