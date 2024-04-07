<script lang="ts">
	import { SidebarNav } from '$lib/components/ui/sidebar-nav';
	import { Separator } from '$lib/components/ui/separator';
	import { Toaster } from '$lib/components/ui/sonner';
	import { NodeStats, MinerStats, ChainInfo, Environment } from '$lib/types';
	import { invoke } from '@tauri-apps/api/tauri';
	import { _ } from 'svelte-i18n';
	import Node from './node/+page.svelte';
	import Setting from './setting/+page.svelte';
	import { Command } from '@tauri-apps/api/shell';
	import { ApiPromise, WsProvider } from '@polkadot/api';
	import type { Header } from '@polkadot/types/interfaces';
	import type { Selected } from 'bits-ui';
	import { appConfigDir, appDataDir } from '@tauri-apps/api/path';
	import { decodeAddress, encodeAddress } from '@polkadot/keyring';
	import { hexToU8a, isHex } from '@polkadot/util';
	import { toast } from 'svelte-sonner';

	const sidebarNavItems = [
		{
			title: 'Hashcash',
			path: '/main/hashcash',
			description: 'Hashcash node controller',
			icon: 'Coins'
		},
		{
			title: 'P2Pool',
			path: '/main/p2pool',
			description: 'P2Pool node controller',
			icon: 'Network'
		},
		{
			title: 'Setting',
			path: '/main/setting',
			description: 'Node client setting',
			icon: 'Cog'
		}
	];
	let selected: number = 0;
	let maxThreads: number;

	let env: Environment;
	let p2pEnv: Environment;
	let appConfigDirPath: string;
	let appDataDirPath: string;

	(async () => {
		maxThreads = await invoke<number>('max_threads', {});
		appConfigDirPath = await appConfigDir();
		appDataDirPath = await appDataDir();

		env = await Environment.load(appConfigDirPath, 'hashcash.json');
		p2pEnv = await Environment.load(appConfigDirPath, 'p2pool.json');
	})();

	let node: NodeStats = NodeStats.default();
	let miner: MinerStats = MinerStats.default();
	let chain: ChainInfo = ChainInfo.default();
	let logs: string[] = [];

	let p2pNode: NodeStats = NodeStats.default();
	let p2pMiner: MinerStats = MinerStats.default();
	let p2pChain: ChainInfo = ChainInfo.default();
	let p2pLogs: string[] = [];

	function updateLogs(logs: string[], log: string): string[] {
		while (logs.length >= 100) {
			logs.pop();
		}
		logs.unshift(log);
		return logs;
	}

	async function checkNodeStats(node: NodeStats): Promise<NodeStats> {
		if (node.child) {
			let newStats = await invoke<NodeStats>('check_node_stats', { pid: node.child.pid });
			return node.update(newStats);
		} else {
			throw new Error('Node did not started');
		}
	}

	function isValidAddress(address: string) {
		try {
			encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
			return true;
		} catch (error) {
			return false;
		}
	}

	async function startHashcash(program: string, args: string[], endpoint: string) {
		if (!isValidAddress(env.miner)) {
			toast.warning('Invalid miner address');
			return;
		}
		node = node.start();
		logs = [];
		miner = miner.clear();
		chain = chain.clear();

		const command = Command.sidecar(program, args);
		command.stdout.on('data', async (log: string) => {
			logs = updateLogs(logs, log);
			miner = miner.update(log);
		});
		command.stderr.on('data', async (log: string) => {
			logs = updateLogs(logs, log);
			miner = miner.update(log);
		});
		node.child = await command.spawn();
		node.jobId = setInterval(async () => {
			try {
				node = await checkNodeStats(node);
			} catch (e: any) {
				console.error(`Failed to check node. e: ${e}`);
			}
		}, 1000);

		const provider = new WsProvider(endpoint);
		node.api = await ApiPromise.create({ provider });
		chain.api = node.api;
		chain.api.rpc.chain.subscribeNewHeads(async (header: Header) => {
			try {
				chain = await chain.update(header, true);
			} catch (e: any) {
				console.error(`Failed to update chain info. error: ${e}`);
			}
		});
	}

	async function stopHashcash() {
		node = await node.stop();
	}

	async function selectHashcashPower(selected: Selected<string>) {
		env.power = selected;
		await updateHashcashEnv();
	}

	async function updateHashcashEnv() {
		await Environment.save(env, appConfigDirPath, 'hashcash.json');
	}

	async function startP2Pool(program: string, args: string[], endpoint: string) {
		if (!isValidAddress(p2pEnv.miner)) {
			toast.warning('Invalid miner address');
			return;
		}
		p2pNode = p2pNode.start();
		p2pLogs = [];
		p2pMiner = p2pMiner.clear();
		p2pChain = p2pChain.clear();

		const command = Command.sidecar(program, args);
		command.stdout.on('data', async (log: string) => {
			p2pLogs = updateLogs(p2pLogs, log);
			p2pMiner = p2pMiner.update(log);
		});
		command.stderr.on('data', async (log: string) => {
			p2pLogs = updateLogs(p2pLogs, log);
			p2pMiner = p2pMiner.update(log);
		});
		p2pNode.child = await command.spawn();
		p2pNode.jobId = setInterval(async () => {
			try {
				p2pNode = await checkNodeStats(p2pNode);
			} catch (e: any) {
				console.error(`Failed to check node. e: ${e}`);
			}
		}, 1000);

		const provider = new WsProvider(endpoint);
		p2pNode.api = await ApiPromise.create({ provider });
		p2pChain.api = p2pNode.api;
		p2pChain.api.rpc.chain.subscribeNewHeads(async (header: Header) => {
			try {
				p2pChain = await p2pChain.update(header, false);
			} catch (e: any) {
				console.error(`Failed to update chain info. error: ${e}`);
			}
		});
	}

	async function stopP2Pool() {
		p2pNode = await p2pNode.stop();
	}

	async function selecP2PoolPower(selected: Selected<string>) {
		p2pEnv.power = selected;
		await updateP2PoolEnv();
	}

	async function updateP2PoolEnv() {
		await Environment.save(p2pEnv, appConfigDirPath, 'p2pool.json');
	}

	function calculateThreads(power: Selected<string>): number {
		if (power.value === 'min') {
			return 1;
		} else if (power.value === 'max') {
			return Math.max(maxThreads - 1, 1);
		} else {
			return Math.floor((maxThreads * parseInt(power.value)) / 100);
		}
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
					startNode={() =>
						startHashcash(
							'../node/hashcash',
							[
								'--dev',
								'--base-path',
								`${appDataDirPath}/hashcash`,
								'--author',
								env.miner,
								'--threads',
								`${calculateThreads(env.power)}`
							],
							'ws://localhost:9944'
						)}
					stopNode={stopHashcash}
					{logs}
					{miner}
					{chain}
					{env}
					selectPower={selectHashcashPower}
					updateEnv={updateHashcashEnv}
					endpoint={'https://polkadot.js.org/apps/?rpc=ws://localhost:9944#/explorer'}
				/>
			{:else if sidebarNavItems[selected].path === '/main/p2pool'}
				<Node
					node={p2pNode}
					startNode={() =>
						startP2Pool(
							'../node/p2pool',
							[
								'--dev',
								'--base-path',
								`${appDataDirPath}/p2pool`,
								'--author',
								p2pEnv.miner,
								'--threads',
								`${calculateThreads(p2pEnv.power)}`
							],
							'ws://localhost:10044'
						)}
					stopNode={stopP2Pool}
					logs={p2pLogs}
					miner={p2pMiner}
					chain={p2pChain}
					env={p2pEnv}
					selectPower={selecP2PoolPower}
					updateEnv={updateP2PoolEnv}
					endpoint={'https://polkadot.js.org/apps/?rpc=ws://localhost:10044#/explorer'}
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
