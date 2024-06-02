<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button, buttonVariants } from '@/lib/components/ui/button';
	import * as Dialog from '@/lib/components/ui/dialog';
	import { Input } from '@/lib/components/ui/input';
	import Label from '@/lib/components/ui/label/label.svelte';

	export let dashboardItems: any[];
</script>

<div>
	<div class="w-full">
		<Dialog.Root>
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
						<Input class="w-full" />
					</div>
					<div class="pt-4">
						<Label>Default contents</Label>
					</div>
					<div class="pt-2">
						<Input class="w-full" />
					</div>
					<div class="pt-4">
						<Label>Default subcontents</Label>
					</div>
					<div class="pt-2">
						<Input class="w-full" />
					</div>
					<div class="pt-4">
						<Label>Script</Label>
					</div>
					<div class="pt-2">
						<Input class="w-full h-24" />
					</div>
				</div>
				<Dialog.Footer>
					<Button type="submit">Submit</Button>
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
