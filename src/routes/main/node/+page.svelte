<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Cpu, MemoryStick, ScrollText } from 'lucide-svelte';
	import { NodeInstance } from '$lib/types';
	import { open } from '@tauri-apps/api/shell';

	export let instance: NodeInstance;
	export let logs: string[];
	export let startNode: () => void;
	export let stopNode: () => void;
</script>

<div>
	<div class="grid gap-4 lg:grid-cols-2">
		<Button
			variant={instance.on ? 'default' : 'outline'}
			on:click={instance.on ? stopNode : startNode}>{instance.on ? 'Stop' : 'Start'} Node</Button
		>
		<Button
			disabled={!instance.on}
			on:click={() => {
				open(`https://polkadot.js.org/apps/?rpc=${instance.endpoint}#/explorer`);
			}}>Open Explorer</Button
		>
	</div>
	<div class="grid gap-4 pt-4 lg:grid-cols-2">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">CPU usage</Card.Title>
				<Cpu class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{instance.cpuUsage.toFixed(2)} %</div>
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
					{(instance.memory / 1024 / 1024).toFixed(2)} MBytes
				</div>
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
