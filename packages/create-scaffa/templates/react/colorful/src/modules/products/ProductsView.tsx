import api from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { Package, Plus, Boxes, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// #TODO: We need to add pagination in this page
// #TODO: We need to add search in this page
// #TODO: We need to add filter in this page
// #TODO: We need to add sort in this page
// #TODO: We need to add delete in this page
// #TODO: We need to add edit in this page
// #TODO: We need to add view in this page

const ProductsView = () => {
	const [input, setInput] = useState('');
	const queryClient = useQueryClient();

	const productsQuery = api.products.getProducts.useQuery();

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
			dimensions: { width: 18, height: 20, depth: 8 }
		});
	};

	return (
		<div className="space-y-8">
			{/* Page Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold flex items-center gap-2">
						<Package className="w-6 h-6 text-primary" />
						Products Management
					</h1>
					<p className="text-muted-foreground text-sm">
						Manage your products efficiently from here.
					</p>
				</div>
			</div>

			{/* Metrics Section */}
			{productsQuery.isLoading ? (
				<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
					{Array.from({ length: 1 }).map((_, idx) => (
						<div
							key={idx}
							className="p-4 border border-border rounded-lg bg-card shadow-sm space-y-2"
						>
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-3 w-24" />
							<Skeleton className="h-3 w-20" />
							<Skeleton className="h-3 w-16" />
						</div>
					))}
				</div>
			) : (
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Boxes className="w-5 h-5 text-primary" />
								Total Products
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">{productsQuery.data?.length ?? '—'}</div>
						</CardContent>
					</Card>
				</div>
			)}

			{/* Add Product */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Plus className="w-5 h-5 text-primary" />
						Add New Product
					</CardTitle>
				</CardHeader>
				<CardContent>
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
							Add
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Products List */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Package className="w-5 h-5 text-primary" />
						Products
					</CardTitle>
				</CardHeader>
				<CardContent>
					{productsQuery.isLoading ? (
						<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
							{Array.from({ length: 6 }).map((_, idx) => (
								<div
									key={idx}
									className="p-4 border border-border rounded-lg bg-card shadow-sm space-y-2"
								>
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-3 w-24" />
									<Skeleton className="h-3 w-20" />
									<Skeleton className="h-3 w-16" />
								</div>
							))}
						</div>
					) : (
						<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
							{productsQuery.data?.map((item) => (
								<div
									key={item.id}
									className="bg-card border border-border rounded-lg p-4 shadow-sm space-y-1"
								>
									<h3 className="font-medium">{item.title}</h3>
									<p className="text-xs text-muted-foreground">SKU: {item.sku || 'N/A'}</p>
									<p className="text-xs">Stock: {item.stock}</p>
									<p className="text-xs">Price: ${item.price}</p>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default ProductsView;
