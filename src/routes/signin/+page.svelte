<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Toaster } from '@/lib/components/ui/sonner';

	import { exists, readTextFile } from '@tauri-apps/api/fs';
	import { appConfigDir } from '@tauri-apps/api/path';
	import { toast } from 'svelte-sonner';
	import crypto from 'crypto-js';
	import { _ } from 'svelte-i18n';

	let password: string = '';
	let passwordValid: boolean = false;

	async function confirm() {
		if (passwordValid) {
			const appConfigDirPath = await appConfigDir();
			if (!(await exists(`${appConfigDirPath}/config.json`))) {
				await goto('/signup');
				return;
			}
			const config = JSON.parse(await readTextFile(`${appConfigDirPath}/config.json`));
			if (config.password === crypto.SHA256(password).toString()) {
				await goto('/node');
			} else {
				toast.error($_('signin.confirm.error'));
			}
		}
	}

	function checkPassword() {
		passwordValid = password.length > 0;
	}
</script>

<div class="flex justify-center md:h-screen">
	<Card.Root class="m-4 border-none md:m-auto md:w-[480px] md:border-solid">
		<Card.Header>
			<Card.Title>{$_('signin.header.title')}</Card.Title>
			<Card.Description>{$_('signin.header.description')}</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Input
						id="password"
						type="password"
						placeholder="password"
						bind:value={password}
						on:input={checkPassword}
					/>
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-end">
			{#if passwordValid}
				<Button class="w-full md:w-auto" on:click={confirm}>Enter</Button>
			{:else}
				<Button class="w-full md:w-auto" disabled>Enter</Button>
			{/if}
		</Card.Footer>
	</Card.Root>
	<Toaster />
</div>

<style>
</style>
