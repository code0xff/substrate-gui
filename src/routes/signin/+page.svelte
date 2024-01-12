<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Toaster } from '@/lib/components/ui/sonner';

	let password: string = '';
	let passwordValid: boolean = false;

	function confirm() {}

	function checkPassword() {
		passwordValid = password.length > 0;
	}
</script>

<div class="flex justify-center md:h-screen">
	<Card.Root class="m-4 border-none md:m-auto md:w-[480px] md:border-solid">
		<Card.Header>
			<Card.Title>Enter your password</Card.Title>
			<Card.Description>Enter your password for authentication.</Card.Description>
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
