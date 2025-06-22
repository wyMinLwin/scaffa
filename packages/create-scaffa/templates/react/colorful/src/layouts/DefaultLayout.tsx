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
		<div
			className={cn(
				'flex h-screen',
				theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
			)}
		>
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Navbar />
				<main className="font-display p-2">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DefaultLayout;
