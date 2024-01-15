<script lang="ts">
	import { SidebarNav } from '$lib/components/ui/sidebar-nav';
	import { Separator } from '$lib/components/ui/separator';
	import type { NodeStatus } from '$lib/types';

	import { invoke } from '@tauri-apps/api/tauri';

	import Node from './node/+page.svelte';
	import Dashboard from './dashboard/+page.svelte';
	import Setting from './setting/+page.svelte';

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

	let status: NodeStatus = {
		on: false,
		iid: 0,
		cpuUsage: 0.0,
		memory: 0
	};

	async function handleNode() {
		status.on = !status.on;

		if (status.on) {
			status.iid = setInterval(() => {
				invoke('check_status', { pid: 0 })
					.then((result: any) => {
						status.cpuUsage = result.cpu_usage;
						status.memory = result.memory;
					})
					.finally(console.error);
			}, 1000);
		} else {
			clearInterval(status.iid);
			status.cpuUsage = 0.0;
			status.memory = 0;
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
				<Node {status} {handleNode} />
			{:else if sidebarNavItems[selected].path === '/main/dashboard'}
				<Dashboard />
			{:else if sidebarNavItems[selected].path === '/main/setting'}
				<Setting />
			{/if}
		</div>
	</div>
</div>

<style>
</style>
