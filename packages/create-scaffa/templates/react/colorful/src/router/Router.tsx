import DefaultLayout from '@/layouts/DefaultLayout';
import DashboardView from '@/modules/dashboard/DashboardView';
import ProductsView from '@/modules/products/ProductsView';
import TodosView from '@/modules/todos/TodosView';
import ChatsView from '@/modules/chats/ChatsView';
import UsersView from '@/modules/users/UsersView';
import SettingsView from '@/modules/settings/SettingsView';
import HelpView from '@/modules/help/HelpView';
// import HomeView from '@/modules/home/HomeView';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Router = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <DefaultLayout />,
			children: [
				{
					path: '',
					element: <DashboardView />
				},
				{
					path: 'products',
					element: <ProductsView />
				},
				{
					path: 'todos',
					element: <TodosView />
				},
				{
					path: 'chats',
					element: <ChatsView />
				},
				{
					path: 'users',
					element: <UsersView />
				},
				{
					path: 'settings',
					element: <SettingsView />
				},
				{
					path: 'help',
					element: <HelpView />
				}
			]
		}
	]);
	return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
