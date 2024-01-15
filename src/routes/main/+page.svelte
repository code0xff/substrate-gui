<script lang="ts">
	import { SidebarNav } from '$lib/components/ui/sidebar-nav';
	import { Separator } from '$lib/components/ui/separator';

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
		<div class="w-full px-4 py-2">
			{#if sidebarNavItems[selected].path === '/main/node'}
				<Node />
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
