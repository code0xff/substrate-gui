<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Progress } from '@/lib/components/ui/progress';
	import { Toaster } from '@/lib/components/ui/sonner';

	import { passwordStrength as checkPasswordStrength } from 'check-password-strength';
	import { toast } from 'svelte-sonner';
	import { exists, createDir, writeTextFile } from '@tauri-apps/api/fs';
	import { appConfigDir } from '@tauri-apps/api/path';
	import { goto } from '$app/navigation';
	import crypto from 'crypto-js';
	import { _ } from 'svelte-i18n';

	let password: string = '';
	let confirmPassword: string = '';
	let passwordStrength: number = 0;
	let passwordMessage: string = $_('signup.password.message.default');
	let confirmMessage: string = $_('signup.confirmation.message.default');
	let passwordValid: boolean = false;

	function checkPassword() {
		if (password.length > 0) {
			const { id, contains } = checkPasswordStrength(password);
			const passwordCondition = ['lowercase', 'uppercase', 'symbol', 'number'];

			passwordStrength = id;
			for (const contain of contains) {
				const containIndex = passwordCondition.indexOf(contain);
				if (containIndex > -1) {
					passwordCondition.splice(containIndex, 1);
				}
				if (passwordCondition.length > 0) {
					passwordMessage = `Please include ${passwordCondition.join(', ')}.`;
				} else {
					passwordMessage = $_('signup.password.message.success');
				}
			}
		} else {
			passwordStrength = 0;
			passwordMessage = $_('signup.password.message.default');
		}

		if (confirmPassword.length > 0) {
			if (password === confirmPassword) {
				confirmMessage = $_('signup.confirmation.message.success');
			} else {
				confirmMessage = $_('signup.confirmation.message.fail');
			}
		} else {
			confirmMessage = $_('signup.confirmation.message.default');
		}

		passwordValid = verifyPassword();
	}

	function verifyPassword(): boolean {
		return (
			password.length > 0 &&
			confirmPassword.length > 0 &&
			password === confirmPassword &&
			passwordStrength === 3
		);
	}

	async function confirm() {
		if (verifyPassword()) {
			await initialize();
		} else {
			toast.error($_('signup.confirm.toast.error'));
		}
	}

	async function initialize() {
		const appConfigDirPath = await appConfigDir();
		if (!(await exists(appConfigDirPath))) {
			await createDir(appConfigDirPath);
		}
		await writeTextFile(
			`${appConfigDirPath}/config.json`,
			JSON.stringify({ password: crypto.SHA256(password).toString() })
		);
		await goto('/node');
	}
</script>

<div class="flex justify-center md:h-screen">
	<Card.Root class="m-4 border-none md:m-auto md:w-[480px] md:border-solid">
		<Card.Header>
			<Card.Title>{$_('signup.header.title')}</Card.Title>
			<Card.Description>{$_('signup.header.description')}</Card.Description>
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
					<p class="text-sm text-muted-foreground">{passwordMessage}</p>
				</div>
				<div class="flex flex-col space-y-1.5" on:input={checkPassword}>
					<Input id="confirm" type="password" placeholder="confirm" bind:value={confirmPassword} />
					<p class="text-sm text-muted-foreground">{confirmMessage}</p>
				</div>
				<div class="flex flex-col space-y-1.5">
					<Progress value={passwordStrength} max={3} />
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
