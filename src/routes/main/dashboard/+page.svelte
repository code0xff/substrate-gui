<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { ArrowLeftRight, Landmark, Package, Timer } from 'lucide-svelte';
</script>

<div>
	<div class="grid gap-4 pb-4 md:grid-cols-2 lg:grid-cols-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Current block</Card.Title>
				<Package class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">1,000,000</div>
				<p class="text-xs text-muted-foreground">Finalized block: 999,994</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Block time</Card.Title>
				<Timer class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">120 secs</div>
				<p class="text-xs text-muted-foreground">Last block time: 110 secs</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Transaction count</Card.Title>
				<ArrowLeftRight class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">38</div>
				<p class="text-xs text-muted-foreground">Transaction count of last block: 10</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total issued</Card.Title>
				<Landmark class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">1,000,000</div>
				<p class="text-xs text-muted-foreground">+10% from last block</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>

<style>
</style>
