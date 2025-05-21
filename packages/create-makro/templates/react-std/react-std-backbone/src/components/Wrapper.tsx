import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Router from '@/router/Router';

const Wrapper = () => {
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Router />
				<Toaster />
			</QueryClientProvider>
		</>
	);
};

export default Wrapper;
