<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Icons } from '$lib/components/ui/icons';

	import { localStorageKey, setMode } from 'mode-watcher';

	let mode: string = localStorage.getItem(localStorageKey) ?? 'system';

	function handleClick(mode: 'light' | 'dark' | 'system') {
		setMode(mode);
	}
</script>

<div>
	<Card.Root>
		<Card.Header>
			<Card.Title>Display mode</Card.Title>
			<Card.Description>Select display mode</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-6">
			<RadioGroup.Root value={mode} class="grid grid-cols-3 gap-4">
				<Label
					for="light"
					class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
				>
					<RadioGroup.Item
						value="light"
						id="light"
						class="sr-only"
						aria-label="Light"
						on:click={() => handleClick('light')}
					/>
					<Icons name="sun" />
					Light
				</Label>
				<Label
					for="dark"
					class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
				>
					<RadioGroup.Item
						value="dark"
						id="dark"
						class="sr-only"
						aria-label="Dark"
						on:click={() => handleClick('dark')}
					/>
					<Icons name="moon" />
					Dark
				</Label>
				<Label
					for="system"
					class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
				>
					<RadioGroup.Item
						value="system"
						id="system"
						class="sr-only"
						aria-label="System"
						on:click={() => handleClick('system')}
					/>
					<Icons name="sun-moon" />
					System
				</Label>
			</RadioGroup.Root>
		</Card.Content>
	</Card.Root>
</div>

<style>
</style>
