<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar';
	import { Separator } from '$lib/components/ui/separator';
	import { Sun, Moon } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { setMode, resetMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	const frameworks = [
		{
			value: 'sveltekit',
			label: 'SvelteKit'
		},
		{
			value: 'next',
			label: 'Next.js'
		},
		{
			value: 'astro',
			label: 'Astro'
		},
		{
			value: 'nuxt',
			label: 'Nuxt.js'
		}
	];

	let bookmarks = false;
	let fullUrls = true;
	const profileRadioValue = 'benoit';
</script>

<div class="head pl-5 pr-5">
	<div class="menu">
		<Menubar.Root class="rounded-none border-none">
			<Menubar.Menu>
				<Menubar.Trigger>File</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>
						New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Item>
						New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Item>New Incognito Window</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Sub>
						<Menubar.SubTrigger>Share</Menubar.SubTrigger>
						<Menubar.SubContent>
							<Menubar.Item>Email link</Menubar.Item>
							<Menubar.Item>Messages</Menubar.Item>
							<Menubar.Item>Notes</Menubar.Item>
						</Menubar.SubContent>
					</Menubar.Sub>
					<Menubar.Separator />
					<Menubar.Item>
						Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
					</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger>Edit</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>
						Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Item>
						Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Sub>
						<Menubar.SubTrigger>Find</Menubar.SubTrigger>
						<Menubar.SubContent>
							<Menubar.Item>Search the web</Menubar.Item>
							<Menubar.Separator />
							<Menubar.Item>Find...</Menubar.Item>
							<Menubar.Item>Find Next</Menubar.Item>
							<Menubar.Item>Find Previous</Menubar.Item>
						</Menubar.SubContent>
					</Menubar.Sub>
					<Menubar.Separator />
					<Menubar.Item>Cut</Menubar.Item>
					<Menubar.Item>Copy</Menubar.Item>
					<Menubar.Item>Paste</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger>View</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.CheckboxItem bind:checked={bookmarks}
						>Always Show Bookmarks Bar</Menubar.CheckboxItem
					>
					<Menubar.CheckboxItem bind:checked={fullUrls}>Always Show Full URLs</Menubar.CheckboxItem>
					<Menubar.Separator />
					<Menubar.Item inset>
						Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Item inset>
						Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item inset>Hide Sidebar</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger>Profiles</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.RadioGroup value={profileRadioValue}>
						<Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
						<Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
						<Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
					</Menubar.RadioGroup>
					<Menubar.Separator />
					<Menubar.Item inset>Edit...</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item inset>Add Profile...</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
		</Menubar.Root>
	</div>
	<div class="setting">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="icon">
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
				<DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
				<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
<Separator />
<div class="body">
	<Card.Root class="w-[350px] m-5">
		<Card.Header>
			<Card.Title>Create project</Card.Title>
			<Card.Description>Deploy your new project in one-click.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="name">Name</Label>
						<Input id="name" placeholder="Name of your project" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="framework">Framework</Label>
						<Select.Root>
							<Select.Trigger id="framework">
								<Select.Value placeholder="Select" />
							</Select.Trigger>
							<Select.Content>
								{#each frameworks as framework}
									<Select.Item value={framework.value} label={framework.label}
										>{framework.label}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex justify-between">
			<Button variant="outline">Cancel</Button>
			<Button>Deploy</Button>
		</Card.Footer>
	</Card.Root>
</div>

<style>
	.head {
		width: 100%;
		display: flex;
	}
  
	.menu {
		width: 100%;
	}

	.setting {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}
</style>
