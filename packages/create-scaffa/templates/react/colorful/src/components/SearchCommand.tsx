'use client';

import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchCommand() {
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				const input = document.getElementById('global-search') as HTMLInputElement;
				input?.focus();
			}
		};
		window.addEventListener('keydown', down);
		return () => window.removeEventListener('keydown', down);
	}, []);

	return (
		<div className="relative flex items-center w-[240px]">
			<Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
			<Input
				id="global-search"
				placeholder="Search..."
				className="pl-10 pr-16 py-2 rounded-lg text-sm bg-muted border border-border"
			/>
			<kbd className="absolute right-3 pointer-events-none hidden sm:flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] text-muted-foreground border">
				<span className="text-xs">⌘</span>K
			</kbd>
		</div>
	);
}
