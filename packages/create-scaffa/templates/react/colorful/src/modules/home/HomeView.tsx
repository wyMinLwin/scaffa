import api from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Languages, Plus, Package, ListTodo, Loader2 } from 'lucide-react';
import i18next from 'i18next';

const HomeView = () => {
	const { t } = useTranslation();
	const [input, setInput] = useState('');
	const queryClient = useQueryClient();

	const changeLanguage = (lng: string) => {
		i18next.changeLanguage(lng);
		localStorage.setItem('scaffa-locale', lng);
	};

	const productsQuery = api.products.getProducts.useQuery();
	const todosQuery = api.todos.getTodos.useInfiniteQuery();

	const addProductMutation = api.products.addProduct.useMutation({
		onSuccess: (data) => {
			toast.success('Product added successfully');
			queryClient.setQueryData(['products'], (oldData: ProductType[]) => [
				...(oldData ?? []),
				data
			]);
			setInput('');
		}
	});

	const addProduct = () => {
		if (!input) {
			toast.error('Please enter a product name');
			return;
		}
		addProductMutation.mutate({
			title: input,
			description: 'Test',
			category: 'Test',
			price: 129.99,
			discountPercentage: 15,
			rating: 4.5,
			stock: 200,
			tags: ['test', 'testing'],
			brand: 'TestBrand',
			sku: 'TestSKU123',
			weight: 0.3,
			dimensions: {
				width: 18,
				height: 20,
				depth: 8
			}
		});
	};

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-8 text-sm">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-bold flex items-center gap-2">
					<Package className="w-6 h-6 text-primary" />
					Scaffa Colorful
				</h1>
				<p className="text-muted-foreground">Tech Stack: React + ShadCN UI</p>
				<p>{t('common.hello')}</p>
			</div>

			{/* Language Switch */}
			<div className="flex items-center gap-2">
				<Languages className="w-5 h-5 text-muted-foreground" />
				<Button variant="outline" onClick={() => changeLanguage('en')}>
					English
				</Button>
				<Button variant="outline" onClick={() => changeLanguage('mm')}>
					Myanmar
				</Button>
			</div>

			{/* Add Product */}
			<div className="bg-muted p-4 rounded-md space-y-3">
				<p className="font-medium flex items-center gap-2">
					<Plus className="w-4 h-4" /> Add a new product
				</p>
				<div className="flex gap-2">
					<Input
						disabled={addProductMutation.isPending}
						className="w-full"
						placeholder="Product Name"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<Button
						disabled={addProductMutation.isPending}
						onClick={addProduct}
						className="flex items-center gap-1"
					>
						{addProductMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
						<Plus className="w-4 h-4" />
						Add
					</Button>
				</div>
			</div>

			{/* Product List */}
			<div>
				<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
					<Package className="w-5 h-5" />
					Products
				</h2>
				{productsQuery.isLoading ? (
					<p className="text-muted-foreground">Loading...</p>
				) : (
					<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-64 overflow-y-auto pr-2">
						{productsQuery.data?.map((item) => (
							<div
								key={item.id}
								className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col gap-1"
							>
								<div className="flex items-center justify-between">
									<h3 className="font-medium">{item.title}</h3>
									<Package className="w-4 h-4 text-muted-foreground" />
								</div>
								<p className="text-xs text-muted-foreground">SKU: {item.sku || 'N/A'}</p>
								<p className="text-xs">Stock: {item.stock}</p>
								<p className="text-xs">Price: ${item.price}</p>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Todos List */}
			<div>
				<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
					<ListTodo className="w-5 h-5" />
					Todos
				</h2>
				{todosQuery.data?.length === 0 ? (
					<p className="text-muted-foreground">No todos found.</p>
				) : (
					<div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-2">
						{todosQuery.data?.map((todo) => (
							<div
								key={todo.id}
								className="bg-card border border-border rounded-md p-3 flex items-start gap-2 shadow-sm"
							>
								<ListTodo className="w-4 h-4 mt-1 text-primary" />
								<span className="text-sm">{todo.todo}</span>
							</div>
						))}
					</div>
				)}

				<div className="mt-3">
					{todosQuery.hasNextPage ? (
						<Button variant="outline" onClick={() => todosQuery.fetchNextPage()}>
							Load More
						</Button>
					) : (
						<p className="text-muted-foreground text-xs italic">No more data...</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomeView;
