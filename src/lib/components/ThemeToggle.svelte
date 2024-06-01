<script lang="ts">
	import { fly } from "svelte/transition";
	import { Moon, Sun } from "lucide-svelte";
	import { theme, toggleTheme } from "$lib/stores/theme";
    import { onMount } from "svelte";
    import { goto, invalidateAll } from "$app/navigation";
    import { refreshPage } from "$lib/utils";

	let javascriptEnabled = false;
	onMount(() => {
		javascriptEnabled = true;
	});
	
	let shouldRefreshPage = false;
	function onThemeToggle() {
		toggleTheme();
		invalidateAll();
		shouldRefreshPage = true;
	}
	function onRefreshButton() {
		refreshPage();
		shouldRefreshPage = false;
	}
</script>

<div>
	<button on:click={onThemeToggle} title="Toggle theme (dark mode looks better)">
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
			<p class="error" title={
				"Sorry NoScript users!!\n"
				+ "Theme toggling is broken for y'all since I can't figure out how to make this HTML-only\n"
				+ "You are likely a dark mode user though, so thats what this site defaults to"
			}>(hover)</p>
		</noscript>
	</button>

	{#if shouldRefreshPage}
		<button class="error" on:click={onRefreshButton}>
			Refresh to fully apply changes!
		</button>
	{/if}
</div>

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

	.error {
		color: var(--error);
		display: block;
		
	}
</style>
