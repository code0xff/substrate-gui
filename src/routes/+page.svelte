<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	import { Command } from '@tauri-apps/api/shell';
	import { appConfigDir } from '@tauri-apps/api/path';
	import { createDir, exists } from '@tauri-apps/api/fs';
	import { Separator } from '@/lib/components/ui/separator';

	let key: string = '';

	async function generateNodeKey() {
		const appConfigDirPath = await appConfigDir();
		if (!(await exists(appConfigDirPath))) {
			await createDir(appConfigDirPath);
		}
		const command = Command.sidecar('../node/node-template', [
			'key',
			'generate-node-key',
			'--file',
			`${appConfigDirPath}/node-key`
		]);
		const {code, stderr} = await command.execute();
    if (code === 0) {
      key = stderr;
    }
	}
</script>

<div>
	<Button class="m-3" on:click={generateNodeKey}>Node Key</Button>
	<Separator />
	<p>{key}</p>
</div>

<style>
</style>
