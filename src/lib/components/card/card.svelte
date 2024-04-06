<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { LucideIcon } from '@/lib/components/ui/icons';

	export let title: string;
	export let icon: string;
	export let contents: any;
	export let subContents: any;
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		<Card.Title class="text-sm font-medium">{title}</Card.Title>
		<LucideIcon name={icon} class="h-4 w-4 text-muted-foreground" />
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">{contents}</div>
		<p class="text-xs text-muted-foreground">{subContents}</p>
	</Card.Content>
</Card.Root>
