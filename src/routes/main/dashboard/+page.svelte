<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { ArrowLeftRight, Landmark, Package, Timer } from 'lucide-svelte';

	const blocks = [
		{
			height: '1,000,007',
			hash: '0x45a0353aaa0f4ec356be681c7675426dd8003eab36848cda283bf8d0438937c8',
			miner: '0xfe010e53873f5ef78e23d323f2f535b5e1a24d065575eea77bb67e601dd67af6'
		},
		{
			height: '1,000,006',
			hash: '0x45a0353aaa0f4ec356be681c7675426dd8003eab36848cda283bf8d0438937c8',
			miner: '0xfe010e53873f5ef78e23d323f2f535b5e1a24d065575eea77bb67e601dd67af6'
		},
		{
			height: '1,000,005',
			hash: '0x45a0353aaa0f4ec356be681c7675426dd8003eab36848cda283bf8d0438937c8',
			miner: '0xfe010e53873f5ef78e23d323f2f535b5e1a24d065575eea77bb67e601dd67af6'
		},
		{
			height: '1,000,004',
			hash: '0x45a0353aaa0f4ec356be681c7675426dd8003eab36848cda283bf8d0438937c8',
			miner: '0xfe010e53873f5ef78e23d323f2f535b5e1a24d065575eea77bb67e601dd67af6'
		},
		{
			height: '1,000,003',
			hash: '0x45a0353aaa0f4ec356be681c7675426dd8003eab36848cda283bf8d0438937c8',
			miner: '0xfe010e53873f5ef78e23d323f2f535b5e1a24d065575eea77bb67e601dd67af6'
		},
		{
			height: '1,000,002',
			hash: '0x45a0353aaa0f4ec356be681c7675426dd8003eab36848cda283bf8d0438937c8',
			miner: '0xfe010e53873f5ef78e23d323f2f535b5e1a24d065575eea77bb67e601dd67af6'
		},
		{
			height: '1,000,001',
			hash: '0x45a0353aaa0f4ec356be681c7675426dd8003eab36848cda283bf8d0438937c8',
			miner: '0xfe010e53873f5ef78e23d323f2f535b5e1a24d065575eea77bb67e601dd67af6'
		}
	];

	const events = [
		{
			height: '1,000,005',
			index: '1',
			event: 'balances.Transfer'
		},
		{
			height: '1,000,004',
			index: '1',
			event: 'balances.Transfer'
		},
		{
			height: '1,000,003',
			index: '1',
			event: 'balances.Transfer'
		},
		{
			height: '1,000,002',
			index: '1',
			event: 'balances.Transfer'
		},
		{
			height: '1,000,001',
			index: '3',
			event: 'balances.Transfer'
		},
		{
			height: '1,000,001',
			index: '2',
			event: 'balances.Transfer'
		},
		{
			height: '1,000,001',
			index: '1',
			event: 'balances.Transfer'
		}
	];
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
	<div class="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
		<Table.Root>
			<Table.Caption>A list of your recent blocks.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head colspan={3}>Recent blocks</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each blocks as block, i (i)}
					<Table.Row>
						<Table.Cell>{block.height}</Table.Cell>
						<Table.Cell>{block.hash}</Table.Cell>
						<Table.Cell>{block.miner}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
		<Table.Root>
			<Table.Caption>A list of your recent transaction events.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head colspan={3}>Recent events</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each events as event, i (i)}
					<Table.Row>
						<Table.Cell>{event.height}</Table.Cell>
						<Table.Cell>{event.index}</Table.Cell>
						<Table.Cell>{event.event}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>

<style>
</style>
