import DefaultLayout from '@/layouts/DefaultLayout';
import HomeView from '@/modules/home/HomeView';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '',
				element: <HomeView />
			}
		]
	}
]);

const Wrapper = () => {
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}></RouterProvider>
				<Toaster />
			</QueryClientProvider>
		</>
	);
};

export default Wrapper;
