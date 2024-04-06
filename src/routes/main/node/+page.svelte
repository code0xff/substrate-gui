<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	import { ScrollText } from 'lucide-svelte';
	import { ChainInfo, type MinerStats, type NodeStats } from '$lib/types';
	import { DisplayCard } from '@/lib/components/card';

	export let node: NodeStats;
	export let logs: string[];
	export let startNode: () => Promise<void>;
	export let stopNode: () => Promise<void>;
	export let miner: MinerStats;
	export let chain: ChainInfo;
</script>

<div>
	<div class="w-full">
		<Button
			class="w-full"
			variant={node.on ? 'default' : 'outline'}
			on:click={node.on ? stopNode : startNode}>{node.on ? 'Stop' : 'Start'} Node</Button
		>
	</div>
	<div class="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
		<DisplayCard
			title="CPU usage"
			icon="Cpu"
			contents={`${node.cpuUsage.toFixed(2)} %`}
			subContents=""
		/>
		<DisplayCard
			title="Memory"
			icon="MemoryStick"
			contents={`${(node.memory / 1024 / 1024).toFixed(2)} MBytes`}
			subContents=""
		/>
		<DisplayCard
			title="Local hashrate"
			icon="AudioWaveform"
			contents={`${miner.local} H/s`}
			subContents=""
		/>
		<DisplayCard
			title="Network hashrate"
			icon="Antenna"
			contents={`${miner.network} H/s`}
			subContents=""
		/>
	</div>
	<div class="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
		<DisplayCard
			title="Current block"
			icon="Package"
			contents={chain.blockNumber}
			subContents={`Block hash: ${ChainInfo.compressHash(chain.blockHash)}`}
		/>
		<DisplayCard
			title="Block time"
			icon="Timer"
			contents={`${chain.blockTime} secs`}
			subContents={`Previous block time: ${chain.prevBlockTime} secs`}
		/>
		<DisplayCard
			title="Difficulty"
			icon="ArrowLeftRight"
			contents={chain.diff}
			subContents={`Previous difficulty: ${chain.prevDiff}`}
		/>
		<DisplayCard title="Total issued" icon="Landmark" contents={chain.totalIssued} subContents="" />
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
