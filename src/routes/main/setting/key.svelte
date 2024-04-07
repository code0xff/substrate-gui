<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '@/lib/components/ui/button';
	import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
	import { appConfigDir, downloadDir } from '@tauri-apps/api/path';
	import { save } from '@tauri-apps/api/dialog';

	let keys: string = '';

	async function exportKey(): Promise<void> {
		const appConfigDirPath = await appConfigDir();
		const key = await readTextFile(`${appConfigDirPath}/key.json`);
		const downloadDirPath = await downloadDir();
		const filePath = await save({ defaultPath: `${downloadDirPath}/key.json` });
		if (filePath) {
			await writeTextFile(filePath, key);
		}
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Key</Card.Title>
		<Card.Description>You can import this key into polkadot.js with your password.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<div>
			<Button variant={'outline'} on:click={exportKey} class="w-full">Export key</Button>
		</div>
		<div class="pt-4">
			<pre class="text-xs text-muted-foreground">{keys}</pre>
		</div>
	</Card.Content>
</Card.Root>
