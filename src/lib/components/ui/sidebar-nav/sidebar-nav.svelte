<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import Icons from '../icons/icons.svelte';
	let className: string | undefined | null = undefined;
	export let selected: number;
	export let selectMenu: (index: number) => void;
	export let items: { path: string; title: string; icon: string }[];
	export { className as class };
</script>

<nav class={cn('flex flex-col', className)}>
	{#each items as item, index}
		<Button
			id={item.path}
			variant="ghost"
			class={cn(
				selected === index ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent',
				'justify-start'
			)}
			on:click={() => {
				selectMenu(index);
			}}
		>
			<Icons name={item.icon} width="24" height="24" />
			<span class="lg:block hidden">
				&nbsp;
				{item.title}
			</span>
		</Button>
	{/each}
</nav>
