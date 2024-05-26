<script lang="ts">
	import { fly } from "svelte/transition";
	import { Moon, Sun } from "lucide-svelte";
	import { theme, toggleTheme } from "$lib/stores/theme";
    import { onMount } from "svelte";

	let javascriptEnabled = false;
	onMount(() => {
		javascriptEnabled = true;
	});
</script>

<button on:click={toggleTheme} title="Toggle theme (It looks better in dark mode)">
	{#if $theme === "light"}
		<div in:fly={{ y: -20 }}>
			<Sun />
			<span>Light</span>
		</div>
	{:else}
		<div in:fly={{ y: 20 }}>
			<Moon />
			<span>Dark</span>
		</div>
	{/if}

	<noscript>
		<p style="color: red" title={
			"Sorry NoScript users!!\n"
			+ "Theme toggling is broken for y'all since I can't figure out how to make this HTML-only\n"
			+ "You are likely a dark mode user though, so thats what this site defaults to"
		}>(hover)</p>
	</noscript>
</button>

<style>
	button {
		padding: 0;
		font-weight: inherit;
		background: none;
		border: none;
		box-shadow: none;
		overflow: hidden;
	}

	button > * {
		display: flex;
		gap: var(--size-2);
	}
</style>
