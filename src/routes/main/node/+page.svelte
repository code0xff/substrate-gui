<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	import { AudioWaveform, Coins, Cpu, Dumbbell, MemoryStick, Package } from 'lucide-svelte';
	import { invoke } from '@tauri-apps/api/tauri';

	let nodeOn: boolean = false;
	let cpuUsage: number = 0.0;
	let memory: number = 0;

	let jobId: number = 0;

	async function startNode() {
		nodeOn = !nodeOn;

		if (nodeOn) {
			jobId = setInterval(() => {
				invoke('check_status', { pid: 0 })
					.then((status: any) => {
						cpuUsage = status.cpu_usage;
						memory = status.memory;
					})
					.finally(console.error);
			}, 1000);
		} else {
			clearInterval(jobId);
		}
	}
</script>

<div>
	<div class="w-full">
		<Button class="w-full" variant={nodeOn ? 'default' : 'outline'} on:click={startNode}
			>{nodeOn ? 'Node Stop' : 'Node Start'}</Button
		>
	</div>
	<div class="grid gap-4 pt-4 md:grid-cols-1 lg:grid-cols-2">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">CPU usage</Card.Title>
				<Cpu class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{cpuUsage}</div>
				<p class="text-xs text-muted-foreground"></p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Memory</Card.Title>
				<MemoryStick class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{memory}</div>
				<p class="text-xs text-muted-foreground"></p>
			</Card.Content>
		</Card.Root>
	</div>
	<div class="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Last mined height</Card.Title>
				<Package class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">1,000,000</div>
				<p class="text-xs text-muted-foreground">Current height: 1,000,100</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">My hashrate</Card.Title>
				<AudioWaveform class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">19.00 KH/s</div>
				<p class="text-xs text-muted-foreground">Total hashrate: 2.29 GH/s</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Difficulty</Card.Title>
				<Dumbbell class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">30</div>
				<p class="text-xs text-muted-foreground">+10% from last block</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Current reward</Card.Title>
				<Coins class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">10</div>
				<p class="text-xs text-muted-foreground">+10% from last block</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>

<style>
</style>
