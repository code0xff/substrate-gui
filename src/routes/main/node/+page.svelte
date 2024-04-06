<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';

	import { ScrollText, Dumbbell, CircleUserRound } from 'lucide-svelte';
	import { ChainInfo, Environment, type MinerStats, type NodeStats } from '$lib/types';
	import { DisplayCard } from '@/lib/components/card';

	export let node: NodeStats;
	export let logs: string[];
	export let startNode: () => Promise<void>;
	export let stopNode: () => Promise<void>;
	export let miner: MinerStats;
	export let chain: ChainInfo;
	export let env: Environment;
	export let selectPower: any;
	export let updateEnv: () => Promise<void>;

	const levels = [
		{ value: 'min', label: 'Min' },
		{ value: '25', label: '25%' },
		{ value: '50', label: '50%' },
		{ value: '75', label: '75%' },
		{ value: 'max', label: 'Max' }
	];
</script>

<div>
	<div class="w-full">
		<Button
			class="w-full"
			variant={node.on ? 'default' : 'outline'}
			on:click={node.on ? stopNode : startNode}>{node.on ? 'Stop' : 'Start'} Node</Button
		>
	</div>
	<div class="w-full">
		<Accordion.Root class="w-full">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Environments</Accordion.Trigger>
				<Accordion.Content>
					<div class="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-2">
						<Card.Root>
							<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
								<Card.Title class="text-sm font-medium">Miner</Card.Title>
								<CircleUserRound class="h-4 w-4 text-muted-foreground" />
							</Card.Header>
							<Card.Content>
								<Input disabled={node.on} bind:value={env.miner} on:change={updateEnv} />
							</Card.Content>
						</Card.Root>
						<Card.Root>
							<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
								<Card.Title class="text-sm font-medium">Mining power</Card.Title>
								<Dumbbell class="h-4 w-4 text-muted-foreground" />
							</Card.Header>
							<Card.Content>
								<Select.Root onSelectedChange={selectPower} selected={env.power} disabled={node.on}>
									<Select.Trigger class="w-full">
										<Select.Value placeholder="Select power level for mining" />
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											{#each levels as level}
												<Select.Item value={level.value} label={level.label}
													>{level.label}</Select.Item
												>
											{/each}
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</Card.Content>
						</Card.Root>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
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
