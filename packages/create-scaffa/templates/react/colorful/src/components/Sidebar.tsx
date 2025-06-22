'use client';

import { items } from '@/constants';
import { Settings, CircleUser } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
	return (
		<aside className="hidden md:flex h-full w-64 flex-col bg-muted border-r border-border p-4 space-y-6">
			<div className="text-2xl font-bold px-2">Scaffa Colorful</div>

			<div className="space-y-1">
				{items.map((item) => (
					<Link
						key={item.label}
						to={item.href}
						className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted-foreground/10 transition"
					>
						<div className="flex items-center gap-2">
							<item.icon size={18} />
							<span>{item.label}</span>
						</div>
						{item.badge && (
							<span className="text-xs px-2 bg-primary text-white rounded-full">{item.badge}</span>
						)}
					</Link>
				))}
			</div>

			<div className="mt-auto space-y-1 text-sm text-muted-foreground">
				<Link to="/settings" className="flex items-center gap-2 hover:text-primary">
					<Settings size={16} /> Settings
				</Link>
				<Link to="/help" className="flex items-center gap-2 hover:text-primary">
					<CircleUser size={16} /> Help Center
				</Link>
			</div>
		</aside>
	);
};
