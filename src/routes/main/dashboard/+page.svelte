<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	export let dashboardItems: any[];
</script>

<div>
	<div class="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
		{#each dashboardItems as item}
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">{item.title}</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{item.contents}</div>
					<p class="text-xs text-muted-foreground">{item.subContents}</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>

<style>
</style>
