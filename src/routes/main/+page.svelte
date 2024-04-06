<script lang="ts">
	import { SidebarNav } from '$lib/components/ui/sidebar-nav';
	import { Separator } from '$lib/components/ui/separator';
	import { Toaster } from '$lib/components/ui/sonner';
	import { NodeStats, MinerStats, ChainInfo } from '$lib/types';

	import { invoke } from '@tauri-apps/api/tauri';
	import { toast } from 'svelte-sonner';
	import { _ } from 'svelte-i18n';

	import Node from './node/+page.svelte';
	import Setting from './setting/+page.svelte';

	import { Command, Child } from '@tauri-apps/api/shell';

	import { ApiPromise, WsProvider } from '@polkadot/api';
	import type { Header } from '@polkadot/types/interfaces';

	const sidebarNavItems = [
		{
			title: 'Hashcash',
			path: '/main/hashcash',
			description: 'Hashcash node controller',
			icon: 'Coins'
		},
		{
			title: 'Setting',
			path: '/main/setting',
			description: 'Node client setting',
			icon: 'Cog'
		}
	];
	let selected: number = 0;

	let node: NodeStats = NodeStats.default();
	let miner: MinerStats = MinerStats.default();
	let chain: ChainInfo = ChainInfo.default();
	let logs: string[] = [];
	let child: Child;
	let api: ApiPromise;

	async function handleLog(log: string) {
		while (logs.length >= 100) {
			logs.pop();
		}
		logs.unshift(log);
		logs = [...logs];

		if (log.indexOf('Local Hashrate: ') !== -1 && log.indexOf('Network Hashrate: ') !== -1) {
			let index = log.indexOf('Local Hashrate: ') + 'Local Hashrate: '.length;
			miner.local = parseInt(log.slice(index, log.indexOf(' H/s')));

			index = log.indexOf('Network Hashrate: ') + 'Network Hashrate: '.length;
			miner.network = parseInt(log.slice(index, log.indexOf(' H/s', index)));
		}
	}

	async function spawnProgram(program: string, args: string[]): Promise<void> {
		const command = Command.sidecar(program, args);
		command.stdout.on('data', handleLog);
		command.stderr.on('data', handleLog);

		child = await command.spawn();
	}

	function checkNode(): NodeJS.Timeout {
		return setInterval(async () => {
			try {
				const newStats = await invoke<NodeStats>('check_node_stats', {
					pid: child.pid
				});
				node = node.update(newStats);
			} catch (e: any) {
				console.error(e);
				toast.error($_('main.handle_node.toast.error'));
			}
		}, 1000);
	}

	async function checkChain(endpoint: string): Promise<void> {
		const provider = new WsProvider(endpoint);
		api = await ApiPromise.create({ provider });
		api.rpc.chain.subscribeNewHeads(async (header: Header) => {
			try {
				chain = await chain.update(api, header);
			} catch (e: any) {
				console.error(`Failed to update chain info. error: ${e}`);
			}
		});
	}

	async function startNode(program: string, args: string[], endpoint: string) {
		node = node.start();
		logs = [];
		node = node.clear();
		miner = miner.clear();

		await spawnProgram(program, args);
		node.jobId = checkNode();
		await checkChain(endpoint);
	}

	async function stopNode() {
		node = node.stop();
		if (api && api.isConnected) {
			await api.disconnect();
		}
		if (node.jobId) {
			clearInterval(node.jobId);
		}
		if (child) {
			await child.kill();
		}
		node.jobId = null;
	}
</script>

<div class="p-4">
	<div class="px-4">
		<h3 class="text-lg font-medium">{sidebarNavItems[selected].title}</h3>
		<p class="text-sm text-muted-foreground">{sidebarNavItems[selected].description}</p>
	</div>
	<Separator class="my-2" />
	<div class="flex flex-row">
		<aside class="lg:w-[320px]">
			<SidebarNav
				items={sidebarNavItems}
				{selected}
				selectMenu={(index) => {
					selected = index;
				}}
			/>
		</aside>
		<div class="w-full px-4">
			{#if sidebarNavItems[selected].path === '/main/hashcash'}
				<Node
					{node}
					startNode={async () =>
						await startNode('../node/hashcash', ['--dev', '--alice'], 'ws://localhost:9944')}
					{stopNode}
					{logs}
					{miner}
					{chain}
				/>
			{:else if sidebarNavItems[selected].path === '/main/setting'}
				<Setting />
			{/if}
		</div>
	</div>
</div>
<Toaster />

<style>
</style>
