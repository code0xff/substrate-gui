<script lang="ts">
	import { SidebarNav } from '$lib/components/ui/sidebar-nav';
	import { Separator } from '$lib/components/ui/separator';
	import { Toaster } from '$lib/components/ui/sonner';
	import { NodeStatus } from '$lib/types';

	import { invoke } from '@tauri-apps/api/tauri';
	import { toast } from 'svelte-sonner';
	import { _ } from 'svelte-i18n';

	import Node from './node/+page.svelte';
	import Dashboard from './dashboard/+page.svelte';
	import Setting from './setting/+page.svelte';

	import { Command, Child } from '@tauri-apps/api/shell';

	const sidebarNavItems = [
		{
			title: 'Node',
			path: '/main/node',
			description: 'Node controller',
			icon: 'network'
		},
		{
			title: 'Dashboard',
			path: '/main/dashboard',
			description: 'Dashboard for node',
			icon: 'layout-dashboard'
		},
		{
			title: 'Setting',
			path: '/main/setting',
			description: 'Node client setting',
			icon: 'cog'
		}
	];
	let selected: number = 0;

	let status: NodeStatus = NodeStatus.default();
	let logs: string[] = [];
	let lhr: number = 0;
	let nhr: number = 0;
	let child: Child;

	async function handleLog(log: string) {
		while (logs.length >= 50) {
			logs.pop();
		}
		logs.unshift(log);
		logs = [...logs];

		if (log.indexOf('Local hashrate: ') !== -1 && log.indexOf('network hashrate: ') !== -1) {
			let index = log.indexOf('Local hashrate: ') + 'Local hashrate: '.length;
			lhr = parseFloat(log.slice(index, log.indexOf(' H/s')));

			index = log.indexOf('network hashrate: ') + 'network hashrate: '.length;
			nhr = parseFloat(log.slice(index, log.indexOf(' H/s', index)));
		}
	}

	async function handleNode() {
		status.on = !status.on;
		if (status.on) {
			logs = [];
			status.cpuUsage = 0.0;
			status.memory = 0;
			status.startTime = 0;
			lhr = 0;
			nhr = 0;

			const command = Command.sidecar('../node/pocd', ['--dev', '--disable-weak-subjectivity']);
			command.stdout.on('data', handleLog);
			command.stderr.on('data', handleLog);

			child = await command.spawn();
			console.log(child.pid);

			status.iid = setInterval(async () => {
				try {
					const { cpuUsage, memory, startTime } = await invoke<NodeStatus>('check_status', {
						pid: child.pid
					});
					status.cpuUsage = cpuUsage;
					status.memory = memory;
					status.startTime = startTime;
				} catch (e: any) {
					if (status.iid !== 0) {
						clearInterval(status.iid);
					}
					status.iid = 0;

					console.error(e);
					toast.error($_('main.handle_node.toast.error'));
				}
			}, 1000);
		} else {
			if (status.iid !== 0) {
				clearInterval(status.iid);
			}
			if (child) {
				await child.kill();
			}

			status.iid = 0;
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
			{#if sidebarNavItems[selected].path === '/main/node'}
				<Node {status} {handleNode} {logs} {lhr} {nhr} />
			{:else if sidebarNavItems[selected].path === '/main/dashboard'}
				<Dashboard />
			{:else if sidebarNavItems[selected].path === '/main/setting'}
				<Setting />
			{/if}
		</div>
	</div>
</div>
<Toaster />

<style>
</style>
