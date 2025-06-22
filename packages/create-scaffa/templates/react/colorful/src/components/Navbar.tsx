'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun, Bell, User } from 'lucide-react';
import { SearchCommand } from '@/components/SearchCommand';
import { useThemeStore } from '@/lib/theme';

export const Navbar = () => {
	const { theme, toggleTheme } = useThemeStore();

	return (
		<header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-border bg-background">
			<div className="text-lg font-semibold">Dashboard</div>

			<div className="flex items-center gap-4 ml-auto">
				<SearchCommand />

				<Button variant="ghost" size="icon" onClick={toggleTheme}>
					{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
				</Button>

				<Button variant="ghost" size="icon">
					<Bell size={18} />
				</Button>

				<Button variant="ghost" size="icon">
					<User size={18} />
				</Button>
			</div>
		</header>
	);
};
