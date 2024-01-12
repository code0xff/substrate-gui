<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
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
					<Input id="password" type="password" placeholder="password" />
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-end">
			<Button class="w-full md:w-auto">Enter</Button>
		</Card.Footer>
	</Card.Root>
</div>

<style>
</style>
