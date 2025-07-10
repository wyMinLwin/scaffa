'use client';

import { items } from '@/constants';
import { useSidebarStore } from '@/lib/sidebar';
import { Settings, CircleUser, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
	const { isCollapsed, toggle } = useSidebarStore();
	const location = useLocation();

	return (
		<aside
			className={`hidden md:flex h-full flex-col border-r border-border bg-background text-foreground transition-all duration-300 ${
				isCollapsed ? 'w-[72px]' : 'w-64'
			}`}
		>
			{/* Top Section */}
			<div className="flex items-center justify-between p-4">
				{!isCollapsed && <span className="text-2xl font-bold">Scaffa Colorful</span>}
				<button
					onClick={toggle}
					className="p-2 rounded hover:bg-muted-foreground/10 transition"
					aria-label="Toggle Sidebar"
				>
					{isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
				</button>
			</div>

			{/* Menu Items */}
			<div className="flex-1 px-2 space-y-1">
				{items.map((item) => {
					const isActive = location.pathname === item.href;
					return (
						<Link
							key={item.label}
							to={item.href}
							className={`flex items-center ${
								isCollapsed ? 'justify-center' : 'gap-3'
							} p-2 rounded-md transition ${
								isActive
									? 'bg-primary/10 text-primary font-semibold'
									: 'hover:bg-muted-foreground/10'
							}`}
						>
							<item.icon size={20} />
							{!isCollapsed && <span>{item.label}</span>}
						</Link>
					);
				})}
			</div>

			{/* Footer Links */}
			<div className="p-2 text-sm text-muted-foreground space-y-1">
				<Link
					to="/settings"
					className={`flex items-center ${
						isCollapsed ? 'justify-center' : 'gap-2'
					} hover:text-primary transition`}
				>
					<Settings size={16} />
					{!isCollapsed && 'Settings'}
				</Link>
				<Link
					to="/help"
					className={`flex items-center ${
						isCollapsed ? 'justify-center' : 'gap-2'
					} hover:text-primary transition`}
				>
					<CircleUser size={16} />
					{!isCollapsed && 'Help Center'}
				</Link>
			</div>
		</aside>
	);
};
