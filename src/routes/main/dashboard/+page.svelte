<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button, buttonVariants } from '@/lib/components/ui/button';
	import * as Dialog from '@/lib/components/ui/dialog';
	import { Input } from '@/lib/components/ui/input';
	import Label from '@/lib/components/ui/label/label.svelte';
	import { Textarea } from '@/lib/components/ui/textarea';

	export let dashboardItems: any[];
	export let addDashboardItem: (
		title: string,
		defaultContents: string,
		defaultSubcontents: string,
		script: string
	) => void;

	let open: boolean = false;

	let title: string = '';
	let defaultContents: string = '';
	let defaultSubcontents: string = '';
	let script: string = '';

	async function submit() {
		addDashboardItem(title, defaultContents, defaultSubcontents, script);
		open = false;
	}
</script>

<div>
	<div class="w-full">
		<Dialog.Root bind:open>
			<Dialog.Trigger class={buttonVariants({ variant: 'outline' }) + ' w-full'}
				>Add card</Dialog.Trigger
			>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Add new dashboard card</Dialog.Title>
					<Dialog.Description></Dialog.Description>
				</Dialog.Header>
				<div>
					<div>
						<Label>Title</Label>
					</div>
					<div class="pt-2">
						<Input class="w-full" bind:value={title} />
					</div>
					<div class="pt-4">
						<Label>Default contents</Label>
					</div>
					<div class="pt-2">
						<Input class="w-full" bind:value={defaultContents} />
					</div>
					<div class="pt-4">
						<Label>Default subcontents</Label>
					</div>
					<div class="pt-2">
						<Input class="w-full" bind:value={defaultSubcontents} />
					</div>
					<div class="pt-4">
						<Label>Script</Label>
					</div>
					<div class="pt-2">
						<Textarea class="h-24 w-full resize-none" bind:value={script} />
					</div>
				</div>
				<Dialog.Footer>
					<Button type="submit" on:click={submit}>Submit</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</div>
	<div class="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
		{#each dashboardItems as item}
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">{item.title}</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{item.contents}</div>
					<p class="text-xs text-muted-foreground">{item.subContents}</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>

<style>
</style>
