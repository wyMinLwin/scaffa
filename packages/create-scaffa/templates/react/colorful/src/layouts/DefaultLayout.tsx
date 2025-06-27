import { CommandDialog } from '@/components/CommandDialog';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { useThemeStore } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
	const { theme } = useThemeStore();

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark');
	}, [theme]);

	return (
		<>
			<div
				className={cn(
					'flex h-screen overflow-hidden',
					theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
				)}
			>
				<Sidebar />
				<div className="flex flex-col flex-1 overflow-hidden">
					<Navbar />
					<main className="flex-1 overflow-y-auto p-4">
						<Outlet />
					</main>
				</div>
			</div>
			<CommandDialog />
		</>
	);
};

export default DefaultLayout;
