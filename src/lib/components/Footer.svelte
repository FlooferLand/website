<!-- The footer for every single page -->

<script lang="ts">
	import { getGithubRepoLink } from "$lib/aboutme";
    import Link from "./Link.svelte";
</script>

<footer>
	<p id="copyright">{`FlooferLand ©️ 2024-${new Date().getFullYear()}`} </p>
	<div id="freedom-notice">
		<p>My website is <Link text="Free and Open-Source" url="https://www.gnu.org/philosophy/free-sw.en.html" light />
			software licensed under GPL-3.</p>
		<p>The website is (mostly statically) built using <Link text="SvelteKit" url="https://kit.svelte.dev" light />,
			which is a FOSS project licensed under MIT.</p>
		<Link text="You may view the website source code here (GitHub)" url={getGithubRepoLink()} />
	</div>
</footer>

<style>
	footer {
		padding: var(--size-6);
		border-top: 1px solid var(--border);
		width: 100%;
	}

	p {
		color: var(--text-2);
	}

	#copyright {
		margin-bottom: 4pt;
	}

	#freedom-notice {
		font-size: var(--font-size-1);
		width: 100%;
	}
</style>
