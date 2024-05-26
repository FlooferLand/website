<!-- The header for every single page -->

<main>
	<nav>
		<a href="/">
			<h4 class="logo" style={`--background-style: ${backgroundStyle}`}>
				Floof's Fluffy /{route}/
			</h4>
		</a>

		<ul class="links">
			<NavLink route="/blog/" text="blog" />
			<NavLink route="/wiki/" text="wiki" />
			<NavLink route="/util/" text="utility" />
			<VerticalRule />
			<NavLink route="/contact/" text="contact me" />
		</ul>

		<ThemeToggle />
	</nav>
	<hr />
</main>

<script lang="ts">
    import { page } from "$app/stores";
	import { NavLink } from "$lib/components";
	import ThemeToggle from "./ThemeToggle.svelte";
	import VerticalRule from "./VerticalRule.svelte";

	let route: string = ($page.route.id ?? "")
		.replace('/', '')
		.split("/")
		.map(a => a.trim())
		.filter(a => a.length > 0)
		.at(0) ?? "site";
	let colors: string[];
	switch (route) {
		case "":
			colors = ["var(--primary)", "var(--secondary)"];
			break;
		case "blog":
			colors = ["var(--secondary)", "var(--primary)"];
			break;
		case "wiki":
			colors = ["red", "cyan"];
			break;
		case "utility":
			colors = ["cyan", "gray"];
			break;
		default:
			colors = ["var(--secondary)", "var(--secondary)"];
			break;
	}
	let backgroundStyle = `linear-gradient(to left, ${colors[0]}, ${colors[1]})`
</script>

<style lang="scss">
	@use "$lib/styles/variables.scss";

	.logo {
		background: var(--background-style);
		background-clip: text;
		-webkit-text-fill-color: transparent;
		filter: saturate(0%);
		padding: 0;
		margin: 0;
		&:hover {
			background: var(--background-style);
			filter: saturate(100%);
			background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}

	nav {
		padding-inline: var(--size-4);
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	@media (min-width: variables.$mobile-transition-width) {
		nav {
			display: flex;
			justify-content: space-between;
		}
	
		.links {
			display: flex;
			gap: var(--size-4);
			margin-block: 0;
		}
	}
	
	@media (max-width: variables.$mobile-transition-width) {
		ul, a {
			align-items: center;
			align-self: center;
			align-content: center;
		}
	}
</style>
