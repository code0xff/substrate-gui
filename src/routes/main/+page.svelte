<script lang="ts">
	import { SidebarNav } from '$lib/components/ui/sidebar-nav';
	import { Separator } from '$lib/components/ui/separator';
	import { Toaster } from '$lib/components/ui/sonner';
	import { NodeInstance } from '$lib/types';
	import { _ } from 'svelte-i18n';
	import Node from './node/+page.svelte';
	import Dashboard from './dashboard/+page.svelte';
	import Setting from './setting/+page.svelte';
	import { Command } from '@tauri-apps/api/shell';
	import { invoke } from '@tauri-apps/api/tauri';
	import { sidebarNavItems } from './menu';
	import { DashboardItem } from '@/lib/types/dashboard';

	let _selected: number = 0;
	let _instance: NodeInstance = NodeInstance.create();
	let _dashboardJobId: NodeJS.Timeout;
	let _logs: string[] = [];

	let _dashboardItems: DashboardItem[] = [
		DashboardItem.create(
			'Best block',
			'0',
			'Block hash: 0x0000...0000',
			`
				const bestHeight = (await api.query.system.number()).toString();
				this.contents = bestHeight;
				const bestHash = (await api.rpc.chain.getBlockHash(parseInt(bestHeight))).toString();
				const displayedHash = bestHash.slice(0, 6) + "..." + bestHash.slice(-4);
				this.subContents = "Block hash: " + displayedHash;
				`
		),
		DashboardItem.create(
			'Timestamp',
			'0',
			'0',
			`
				const currentTimestamp = (await api.query.timestamp.now()).toHuman(); 
				if (currentTimestamp !== this.contents) {
					this.subContents = this.contents;
					this.contents = currentTimestamp;
				}
				`
		)
	];

	function appendLog(logs: string[], log: string): string[] {
		while (logs.length >= 100) {
			logs.pop();
		}
		logs.unshift(log);
		return logs;
	}

	async function checkNodeStatus(instance: NodeInstance): Promise<NodeInstance> {
		if (instance.child) {
			let newStatus = await invoke<NodeInstance>('check_node_status', { pid: instance.child.pid });
			return instance.update(newStatus);
		} else {
			throw new Error('Node did not started');
		}
	}

	async function startNode() {
		_instance = _instance.start();
		_logs = [];

		const command = Command.sidecar('../node/node', ['--dev']);
		command.stdout.on('data', async (log: string) => {
			_logs = appendLog(_logs, log);
		});
		command.stderr.on('data', async (log: string) => {
			_logs = appendLog(_logs, log);
		});
		_instance.child = await command.spawn();
		_instance.jobId = setInterval(async () => {
			try {
				_instance = await checkNodeStatus(_instance);
			} catch (e: any) {
				console.error(`Failed to check node. e: ${e}`);
			}
		}, 1000);

		_instance.endpoint = 'ws://localhost:9944';

		(globalThis as { instance?: any })['instance'] = _instance;

		_dashboardJobId = setInterval(async () => {
			let newItems = [];
			for (const item of _dashboardItems) {
				try {
					const script = `
						const api = await instance.getApi();
						${item.script}
						return this;
					`;
					const newItem = await Object.getPrototypeOf(async function () {})
						.constructor(script)
						.bind(item)();
					newItems.push(newItem);
				} catch (e: unknown) {
					console.error({ e });
					continue;
				}
			}
			_dashboardItems = newItems;
		}, 1000);
	}

	async function stopNode() {
		_instance = await _instance.stop();
		if (_dashboardJobId) {
			clearInterval(_dashboardJobId);
		}
		let resetItems = [];
		for (const item of _dashboardItems) {
			resetItems.push(item.reset());
		}
		_dashboardItems = resetItems;
	}
</script>

<div class="p-4">
	<div class="px-4">
		<h3 class="text-lg font-medium">{sidebarNavItems[_selected].title}</h3>
		<p class="text-sm text-muted-foreground">{sidebarNavItems[_selected].description}</p>
	</div>
	<Separator class="my-2" />
	<div class="flex flex-row">
		<aside class="lg:w-[320px]">
			<SidebarNav
				items={sidebarNavItems}
				selected={_selected}
				selectMenu={(index) => {
					_selected = index;
				}}
			/>
		</aside>
		<div class="w-full px-4">
			{#if sidebarNavItems[_selected].path === '/main/node'}
				<Node instance={_instance} {startNode} {stopNode} logs={_logs} />
			{:else if sidebarNavItems[_selected].path === '/main/dashboard'}
				<Dashboard dashboardItems={_dashboardItems} />
			{:else if sidebarNavItems[_selected].path === '/main/setting'}
				<Setting />
			{/if}
		</div>
	</div>
</div>
<Toaster />

<style>
</style>
