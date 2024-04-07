<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '@/lib/components/ui/button';
	import { Command } from '@tauri-apps/api/shell';

	let keys: string = '';

	async function generateKeys(): Promise<void> {
		const command = Command.sidecar('../node/hashcash', [
			'key',
			'generate',
			'--output-type',
			'json'
		]);
		const child = await command.execute();
		if (child.code === 0) {
			keys = JSON.stringify(JSON.parse(child.stdout), null, 2);
		}
	}

	function clearKeys(): void {
		keys = '';
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Minder key</Card.Title>
		<Card.Description
			>Generated miner key is provided temporarily and should be backed up if you want to continue
			using it. <br />*We recommend using wallet to generate key.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<div>
			<Button
				variant={keys ? 'default' : 'outline'}
				on:click={keys ? clearKeys : generateKeys}
				class="w-full">{keys ? 'Clear' : 'Generate'} key</Button
			>
		</div>
		<div class="pt-4">
			<pre class="text-xs text-muted-foreground">{keys}</pre>
		</div>
	</Card.Content>
</Card.Root>
