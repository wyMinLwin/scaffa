'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CommandDialog() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen(true);
			}
		};
		window.addEventListener('keydown', down);
		return () => window.removeEventListener('keydown', down);
	}, []);

	const handleSelect = (href: string) => {
		setOpen(false);
		navigate(href);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0 overflow-hidden max-w-lg">
				<Command>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Pages">
							<CommandItem onSelect={() => handleSelect('/')}>Dashboard</CommandItem>
							<CommandItem onSelect={() => handleSelect('/users')}>Users</CommandItem>
							<CommandItem onSelect={() => handleSelect('/chats')}>Chats</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
}
