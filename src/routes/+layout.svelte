<script lang="ts">
	import "open-props/style";
	import "open-props/normalize";
	import "open-props/buttons";

	// Not sure what these do but they sound cool!
	// import "open-props/media";
	// import "open-props/camo";

	// Components
	import { Header, Footer } from "$lib/components";
	import "$lib/styles/app.scss";
</script>

<div class="layout">
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	.layout {
		height: 100%;
		max-inline-size: 1440px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-inline: auto;
		padding-inline: var(--size-6);
	}

	main {
		padding-block: var(--size-8);
	}

	@media (min-width: 1440px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
