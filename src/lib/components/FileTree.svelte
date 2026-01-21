<script lang="ts">
	interface FileNode {
		name: string;
		comment?: string;
		children?: FileNode[];
	}

	interface Props {
		files: FileNode[];
		root?: string;
	}

	let { files, root }: Props = $props();
</script>

<div class="file-tree">
	{#if root}
		<div class="tree-root">
			<i class="icon-[material-symbols--folder] text-primary"></i>
			<span class="name">{root}</span>
		</div>
	{/if}
	<ul class="tree-list" class:has-root={root}>
		{#each files as node}
			{@render treeNode(node, 0)}
		{/each}
	</ul>
</div>

{#snippet treeNode(node: FileNode, depth: number)}
	<li class="tree-item">
		<div class="tree-row">
			{#if node.children}
				<i class="icon-[material-symbols--folder] text-primary"></i>
			{:else}
				<i class="icon-[material-symbols--draft-outline] text-mute"></i>
			{/if}
			<span class="name">{node.name}</span>
			{#if node.comment}
				<span class="comment">{node.comment}</span>
			{/if}
		</div>
		{#if node.children && node.children.length > 0}
			<ul class="tree-children">
				{#each node.children as child}
					{@render treeNode(child, depth + 1)}
				{/each}
			</ul>
		{/if}
	</li>
{/snippet}

<style>
	.file-tree {
		font-family: 'Fira Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
		padding: 1rem 0;
	}

	.tree-root {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-bottom: 0.25rem;
	}

	.tree-root .name {
		font-weight: 500;
	}

	.tree-list {
		list-style: none;
		padding-left: 0;
		margin: 0;
	}

	.tree-list.has-root {
		padding-left: 1rem;
		border-left: 1px solid rgba(247, 241, 255, 0.15);
		margin-left: 0.5rem;
	}

	:global(.light) .tree-list.has-root {
		border-left-color: rgba(33, 31, 34, 0.15);
	}

	.tree-item {
		position: relative;
	}

	.tree-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.125rem 0;
	}

	.tree-row i {
		flex-shrink: 0;
		font-size: 1rem;
	}

	.name {
		color: var(--color-light);
	}

	:global(.light) .name {
		color: var(--color-dark);
	}

	.comment {
		color: var(--color-mute);
		font-size: 0.8rem;
		margin-left: 0.5rem;
	}

	.comment::before {
		content: '#';
		margin-right: 0.25rem;
		opacity: 0.5;
	}

	.tree-children {
		list-style: none;
		padding-left: 1.25rem;
		margin: 0;
		border-left: 1px solid rgba(247, 241, 255, 0.15);
		margin-left: 0.5rem;
	}

	:global(.light) .tree-children {
		border-left-color: rgba(33, 31, 34, 0.15);
	}
</style>
