<script lang="ts">
	export let name: string;
	export let width: string = '24';
	export let height: string = '24';
</script>

<span>
	{#if name === 'network'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{width}
			{height}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-network"
			><rect x="16" y="16" width="6" height="6" rx="1" /><rect
				x="2"
				y="16"
				width="6"
				height="6"
				rx="1"
			/><rect x="9" y="2" width="6" height="6" rx="1" /><path
				d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"
			/><path d="M12 12V8" /></svg
		>
	{:else if name === 'layout-dashboard'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{width}
			{height}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-layout-dashboard"
			><rect width="7" height="9" x="3" y="3" rx="1" /><rect
				width="7"
				height="5"
				x="14"
				y="3"
				rx="1"
			/><rect width="7" height="9" x="14" y="12" rx="1" /><rect
				width="7"
				height="5"
				x="3"
				y="16"
				rx="1"
			/></svg
		>
	{:else if name === 'cog'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{width}
			{height}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-cog"
			><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /><path
				d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
			/><path d="M12 2v2" /><path d="M12 22v-2" /><path d="m17 20.66-1-1.73" /><path
				d="M11 10.27 7 3.34"
			/><path d="m20.66 17-1.73-1" /><path d="m3.34 7 1.73 1" /><path d="M14 12h8" /><path
				d="M2 12h2"
			/><path d="m20.66 7-1.73 1" /><path d="m3.34 17 1.73-1" /><path d="m17 3.34-1 1.73" /><path
				d="m11 13.73-4 6.93"
			/></svg
		>
	{:else if name === 'sun'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{width}
			{height}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-sun"
			><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path
				d="m4.93 4.93 1.41 1.41"
			/><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path
				d="m6.34 17.66-1.41 1.41"
			/><path d="m19.07 4.93-1.41 1.41" /></svg
		>
	{:else if name === 'moon'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{width}
			{height}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
		>
	{:else if name === 'sun-moon'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{width}
			{height}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-sun-moon"
			><path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" /><path d="M12 2v2" /><path
				d="M12 20v2"
			/><path d="m4.9 4.9 1.4 1.4" /><path d="m17.7 17.7 1.4 1.4" /><path d="M2 12h2" /><path
				d="M20 12h2"
			/><path d="m6.3 17.7-1.4 1.4" /><path d="m19.1 4.9-1.4 1.4" /></svg
		>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{width}
			{height}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
		>
	{/if}
</span>
