<script lang="ts">
	import SignUp from './signup/+page.svelte';
	import SignIn from './signin/+page.svelte';

	import { appConfigDir } from '@tauri-apps/api/path';
	import { exists, createDir, readTextFile } from '@tauri-apps/api/fs';

	async function load() {
		const appConfigDirPath = await appConfigDir();
		if (!(await exists(appConfigDirPath))) {
			await createDir(appConfigDirPath);
			return false;
		}
		if (!(await exists(`${appConfigDirPath}/config.json`))) {
			return false;
		}
		const config = JSON.parse(await readTextFile(`${appConfigDirPath}/config.json`));
		if (config.password) {
			return true;
		}
	}
</script>

<div class="m-0 h-full w-full p-0">
	{#await load() then initialized}
		{#if initialized}
			<SignIn />
		{:else}
			<SignUp />
		{/if}
	{/await}
</div>

<style>
</style>
