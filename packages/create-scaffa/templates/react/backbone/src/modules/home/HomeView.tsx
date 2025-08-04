import api from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQueryClient } from '@tanstack/react-query';
import i18next from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const HomeView = () => {
	const { t } = useTranslation();
	const changeLanguage = (lng: string) => {
		i18next.changeLanguage(lng);
		localStorage.setItem('scaffa-locale', lng);
	};
	const [input, setInput] = useState('');

	const queryClient = useQueryClient();
	const productsQuery = api.products.getProducts.useQuery();
	const todosQuery = api.todos.getTodos.useInfiniteQuery();
	const addProductMutation = api.products.addProduct.useMutation({
		onSuccess: (data) => {
			toast.success('Product added successfully');
			queryClient.setQueryData(['products'], (oldData: ProductType[]) => {
				return [...oldData, data];
			});
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
			weight: 0.3, // in kg
			dimensions: {
				width: 18, // in cm
				height: 20, // in cm
				depth: 8 // in cm
			}
		});
	};

	return (
		<div>
			<h1 className="">Template: react-backbone</h1>
			<p>Tech Stack: React + Shadcn UI</p>
			<p>{t('common.hello')}</p>
			<div className="flex gap-2">
				<Button onClick={() => changeLanguage('en')}>English</Button>
				<Button onClick={() => changeLanguage('mm')}>Myanmar</Button>
			</div>

			<div className="flex space-x-2  my-3 ">
				<Input
					disabled={addProductMutation.isPending}
					className="w-[200px]"
					placeholder="Product Name"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<Button disabled={addProductMutation.isPending} onClick={addProduct}>
					Add Product
				</Button>
			</div>

			<h2>Products</h2>
			{productsQuery.isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					{productsQuery.data?.map((item) => (
						<div key={item.id}>
							{item.id}. {item.title}
						</div>
					))}
				</div>
			)}

			<hr className="my-5"></hr>

			<h2>Todos</h2>
			<div>
				{todosQuery.data?.map((todo, todoIndex) => (
					<div key={todo.id}>
						{todoIndex + 1} . {todo.todo}
					</div>
				))}
			</div>
			{todosQuery.hasNextPage ? (
				<Button
					onClick={() => {
						todosQuery.fetchNextPage();
					}}
				>
					Next
				</Button>
			) : (
				'No more data...'
			)}
		</div>
	);
};

export default HomeView;
