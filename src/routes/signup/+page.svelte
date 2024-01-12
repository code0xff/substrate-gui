<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Progress } from '@/lib/components/ui/progress';
	import { Toaster } from '@/lib/components/ui/sonner';
	
	import { passwordStrength as checkPasswordStrength } from 'check-password-strength';
	import { toast } from "svelte-sonner";

	let password: string = '';
	let confirmPassword: string = '';
	let passwordStrength: number = 0;
	let passwordMessage: string = 'Please enter your password.';
	let confirmMessage: string = 'Please enter confirm password.';
	let passwordValid: boolean = false;

	async function checkPassword() {
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
					passwordMessage = 'Strong password!';
				}
			}
		} else {
			passwordStrength = 0;
			passwordMessage = 'Please enter your password.';
		}

		if (confirmPassword.length > 0) {
			if (password === confirmPassword) {
				confirmMessage = `Password and confirm password match exactly.`;
			} else {
				confirmMessage = `Password and confirm password don't match each other.`;
			}
		} else {
			confirmMessage = 'Please enter confirm password.';
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

	function confirm() {
		if (verifyPassword()) {
		} else {
			toast.error(`Password and confirm password don't match each other.`);
		}
	}
</script>

<div class="flex justify-center md:h-screen">
	<Card.Root class="m-4 border-none md:m-auto md:w-[480px] md:border-solid">
		<Card.Header>
			<Card.Title>Create a strong password</Card.Title>
			<Card.Description>
				Create a strong password of at least 10 characters, combining uppercase letters, lowercase
				letters, numbers, and symbols.</Card.Description
			>
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
