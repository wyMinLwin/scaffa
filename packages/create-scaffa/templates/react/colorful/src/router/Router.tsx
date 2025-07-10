import DefaultLayout from '@/layouts/DefaultLayout';
import DashboardView from '@/modules/dashboard/DashboardView';
import ProductsView from '@/modules/products/ProductsView';
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
				}
			]
		}
	]);
	return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
