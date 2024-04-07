<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Progress } from '$lib/components/ui/progress';
	import { Toaster } from '$lib/components/ui/sonner';

	import { passwordStrength as checkPasswordStrength } from 'check-password-strength';
	import { toast } from 'svelte-sonner';
	import { exists, createDir, writeTextFile } from '@tauri-apps/api/fs';
	import { appConfigDir } from '@tauri-apps/api/path';
	import { goto } from '$app/navigation';
	import crypto from 'crypto-js';
	import { _ } from 'svelte-i18n';

	import { mnemonicGenerate } from '@polkadot/util-crypto';
	import Keyring from '@polkadot/keyring';

	let password: string = '';
	let confirmPassword: string = '';
	let passwordStrength: number = 0;
	let passwordMessage: string = $_('signup.password.message.default');
	let confirmMessage: string = $_('signup.confirm.message.default');
	let passwordValid: boolean = false;
	let processing: boolean = false;

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
				confirmMessage = $_('signup.confirm.message.success');
			} else {
				confirmMessage = $_('signup.confirm.message.fail');
			}
		} else {
			confirmMessage = $_('signup.confirm.message.default');
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
		processing = true;
		if (verifyPassword()) {
			await initialize();
		} else {
			processing = false;
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

		const mnemonic = mnemonicGenerate();
		const keyring = new Keyring();
		const keyringPair = keyring.addFromUri(mnemonic);
		await writeTextFile(
			`${appConfigDirPath}/key.json`,
			JSON.stringify(keyringPair.toJson(password))
		);

		const address = keyringPair.address;
		await writeTextFile(
			`${appConfigDirPath}/hashcash.json`,
			JSON.stringify({ miner: address, power: { value: 'min', label: 'Min' } })
		);
		await writeTextFile(
			`${appConfigDirPath}/p2pool.json`,
			JSON.stringify({ miner: address, power: { value: 'max', label: 'Max' } })
		);

		await goto('/main');
	}

	function submit(e: any) {
		if (e.key === 'Enter') {
			confirm();
		}
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
						disabled={processing}
						bind:value={password}
						on:input={checkPassword}
						on:keydown={passwordValid ? submit : null}
					/>
					<p class="text-sm text-muted-foreground">{passwordMessage}</p>
				</div>
				<div class="flex flex-col space-y-1.5" on:input={checkPassword}>
					<Input
						id="confirm"
						type="password"
						placeholder="confirm"
						disabled={processing}
						bind:value={confirmPassword}
						on:keydown={passwordValid ? submit : null}
					/>
					<p class="text-sm text-muted-foreground">{confirmMessage}</p>
				</div>
				<div class="flex flex-col space-y-1.5">
					<Progress value={passwordStrength} max={3} />
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-end">
			<Button class="w-full md:w-auto" on:click={confirm} disabled={processing || !passwordValid}
				>Enter</Button
			>
		</Card.Footer>
	</Card.Root>
	<Toaster />
</div>

<style>
</style>
