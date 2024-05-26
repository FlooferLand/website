<script lang="ts">
	import "open-props/style";
	import "open-props/normalize";
	import "open-props/buttons";

	// Components
	import { Header, Footer } from "$lib/components";
	import "$lib/styles/app.scss";
    import BannerNotice from "$lib/components/BannerNotice.svelte";
</script>

<div class="layout">
	<Header />
	<main>
		<BannerNotice type="warning">
			This website is still a work in progress.
			Do not bookmark pages for now, as the URLs might change
		</BannerNotice>
		<slot />
	</main>
	<Footer />
</div>

<style lang="scss">
	@use "$lib/styles/variables.scss";

	.layout {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr auto;
		padding: var(--size-4);
	}

	main {
		padding-inline: var(--size-2);
	}

	@media (min-width: variables.$mobile-transition-width) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
