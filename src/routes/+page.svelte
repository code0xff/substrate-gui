<script lang="ts">
	import SignUp from './signup/+page.svelte';
	import SignIn from './signin/+page.svelte';

	let password: string | null = localStorage.getItem('password');
</script>

<div class="m-0 h-full w-full p-0">
	{#if !password}
		<SignUp />
	{:else}
		<SignIn />
	{/if}
</div>

<style>
</style>
