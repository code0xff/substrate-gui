<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	import { Child, Command } from '@tauri-apps/api/shell';
	import { appConfigDir } from '@tauri-apps/api/path';
	import { createDir, exists } from '@tauri-apps/api/fs';
	import { Separator } from '@/lib/components/ui/separator';

	let key: string = '';
	let child: Child;

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
		const { code, stderr } = await command.execute();
		if (code === 0) {
			key = stderr;
		}
	}

	async function runNode() {
		const appConfigDirPath = await appConfigDir();
		const nodeKey = `${appConfigDirPath}/node-key`;
		if (!(await exists(nodeKey))) {
			console.error('key does not exist');
			return;
		}
		const command = Command.sidecar('../node/node-template', [
			'--dev',
			'--node-key-file',
			`${appConfigDirPath}/node-key`
		]);
		command.on('close', (data) => {
			console.log(data);
		});
		command.on('error', (e) => {
			console.error(e);
		});
		command.stdout.on('data', (line) => {
			console.log(line);
		});
		command.stderr.on('data', (line) => {
			console.log(line);
		});
		child = await command.spawn();
	}

	async function stopNode() {
		if (child) {
			await child.kill();
		}
	}
</script>

<div>
	<Button class="m-3" on:click={generateNodeKey}>Generate Key</Button>
	<Button class="m-3" on:click={runNode}>Run Node</Button>
	<Button class="m-3" on:click={stopNode}>Stop Node</Button>
	<Separator />
	<p>{key}</p>
</div>

<style>
</style>
