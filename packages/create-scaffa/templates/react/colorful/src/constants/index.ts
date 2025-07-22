import { LayoutDashboard, MessageCircle, Users, Package, ListTodo } from 'lucide-react';

export const items = [
	{ icon: LayoutDashboard, label: 'Dashboard', href: '/' },
	{ icon: Package, label: 'Products', href: '/products' },
	{ icon: ListTodo, label: 'Todos', href: '/todos' },
	{ icon: MessageCircle, label: 'Chats', href: '/chats', badge: 3 },
	{ icon: Users, label: 'Users', href: '/users' }
];
