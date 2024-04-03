<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	import { Antenna, AudioWaveform, Cpu, MemoryStick, ScrollText } from 'lucide-svelte';
	import type { NodeStatus } from '$lib/types';

	export let status: NodeStatus;
	export let logs: string[];
	export let handleNode: () => void;
	export let lhr: number;
	export let nhr: number;
</script>

<div>
	<div class="w-full">
		<Button class="w-full" variant={status.on ? 'default' : 'outline'} on:click={handleNode}
			>{status.on ? 'Stop' : 'Start'} Node</Button
		>
	</div>
	<div class="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">CPU usage</Card.Title>
				<Cpu class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{status.cpuUsage.toFixed(2)} %</div>
				<p class="text-xs text-muted-foreground"></p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Memory</Card.Title>
				<MemoryStick class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">
					{(status.memory / 1024 / 1024).toFixed(2)} MBytes
				</div>
				<p class="text-xs text-muted-foreground"></p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Local Hashrate</Card.Title>
				<AudioWaveform class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{lhr} H/s</div>
				<p class="text-xs text-muted-foreground"></p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Network Hashrate</Card.Title>
				<Antenna class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{nhr} H/s</div>
				<p class="text-xs text-muted-foreground"></p>
			</Card.Content>
		</Card.Root>
	</div>
	<div class="w-full pt-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Node Logs</Card.Title>
				<ScrollText class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content class="h-96 overflow-y-auto">
				{#each logs as log}
					<p class="text-xs text-muted-foreground">{log}</p>
				{/each}
			</Card.Content>
		</Card.Root>
	</div>
</div>

<style>
</style>
