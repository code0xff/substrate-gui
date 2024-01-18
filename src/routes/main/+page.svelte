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

	async function handleNode() {
		status.on = !status.on;
		if (status.on) {
			status.iid = setInterval(async () => {
				try {
					const { cpuUsage, memory, startTime } = await invoke<NodeStatus>('check_status', {
						pid: 0
					});
					status.cpuUsage = cpuUsage;
					status.memory = memory;
					status.startTime = startTime;
				} catch (e: any) {
					if (status.iid !== 0) {
						clearInterval(status.iid);
					}
					status.iid = 0;
					status.cpuUsage = 0.0;
					status.memory = 0;
					status.startTime = 0;

					console.error(e);
					toast.error($_('main.handle_node.toast.error'));
				}
			}, 1000);
		} else {
			if (status.iid !== 0) {
				clearInterval(status.iid);
			}

			status.iid = 0;
			status.cpuUsage = 0.0;
			status.memory = 0;
			status.startTime = 0;
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
<Toaster />

<style>
</style>
