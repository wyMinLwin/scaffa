import api from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
    DialogDescription
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { Package, Plus, Boxes, Loader2, Search, Filter, ArrowUpDown, Pencil, Trash2, Eye, Star } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const ProductsView = () => {
	const queryClient = useQueryClient();
	const productsQuery = api.products.getProducts.useQuery();

	const [input, setInput] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [categoryFilter, setCategoryFilter] = useState<string>('all');
	const [sortOption, setSortOption] = useState<string>('default');
	const [currentPage, setCurrentPage] = useState(1);

	// Dialog states
	const [viewProduct, setViewProduct] = useState<ProductType | null>(null);
	const [editProduct, setEditProduct] = useState<ProductType | null>(null);
	const [deleteProduct, setDeleteProduct] = useState<ProductType | null>(null);

	// Edit form states
	const [editForm, setEditForm] = useState<Partial<ProductType>>({});

	const addProductMutation = api.products.addProduct.useMutation({
		onSuccess: (data) => {
			toast.success('Product added successfully');
			queryClient.setQueryData(['products'], (oldData: ProductType[] | undefined) => [
				...(oldData ?? []),
				data
			]);
			setInput('');
		}
	});

	const updateProductMutation = api.products.updateProduct.useMutation({
		onSuccess: (data) => {
			toast.success('Product updated successfully');
			queryClient.setQueryData(['products'], (oldData: ProductType[] | undefined) => {
				if (!oldData) return [];
				return oldData.map((p) => (p.id === data.id ? { ...p, ...data } : p));
			});
			setEditProduct(null);
		}
	});

	const deleteProductMutation = api.products.deleteProduct.useMutation({
		onSuccess: (_, id) => {
			toast.success('Product deleted successfully');
			queryClient.setQueryData(['products'], (oldData: ProductType[] | undefined) => {
				if (!oldData) return [];
				return oldData.filter((p) => p.id !== id);
			});
			setDeleteProduct(null);
		}
	});

	const handleAddProduct = () => {
		if (!input) {
			toast.error('Please enter a product name');
			return;
		}
		addProductMutation.mutate({
			title: input,
			description: 'Test Description',
			category: 'Test Category',
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

	const handleUpdateProduct = () => {
		if (!editProduct) return;
		updateProductMutation.mutate({
			id: editProduct.id,
			data: editForm
		});
	};

	const handleDeleteProduct = () => {
		if (!deleteProduct) return;
		deleteProductMutation.mutate(deleteProduct.id);
	};

	// Client-side filtering, sorting, pagination
	const processedProducts = useMemo(() => {
		if (!productsQuery.data) return [];
		let result = [...productsQuery.data];

		if (searchQuery) {
			const lowerQ = searchQuery.toLowerCase();
			result = result.filter(
				(p) =>
					p.title.toLowerCase().includes(lowerQ) ||
					p.description.toLowerCase().includes(lowerQ) ||
					p.brand.toLowerCase().includes(lowerQ)
			);
		}

		if (categoryFilter !== 'all') {
			result = result.filter((p) => p.category === categoryFilter);
		}

		if (sortOption !== 'default') {
			result.sort((a, b) => {
				switch (sortOption) {
					case 'name-asc':
						return a.title.localeCompare(b.title);
					case 'name-desc':
						return b.title.localeCompare(a.title);
					case 'price-asc':
						return a.price - b.price;
					case 'price-desc':
						return b.price - a.price;
					case 'stock-asc':
						return a.stock - b.stock;
					case 'stock-desc':
						return b.stock - a.stock;
					default:
						return 0;
				}
			});
		}

		return result;
	}, [productsQuery.data, searchQuery, categoryFilter, sortOption]);

	const categories = useMemo(() => {
		if (!productsQuery.data) return [];
		const cats = new Set(productsQuery.data.map((p) => p.category));
		return Array.from(cats);
	}, [productsQuery.data]);

	const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE) || 1;
	const currentProducts = processedProducts.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handlePageChange = (page: number) => {
		setCurrentPage(Math.max(1, Math.min(page, totalPages)));
	};

	return (
		<div className="space-y-8 pb-8">
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
					<div className="p-4 border border-border rounded-lg bg-card shadow-sm space-y-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-3 w-24" />
					</div>
				</div>
			) : (
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
								<Boxes className="w-4 h-4 text-primary" />
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
				<CardHeader className="pb-4">
					<CardTitle className="flex items-center gap-2 text-base">
						<Plus className="w-4 h-4 text-primary" />
						Quick Add
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex gap-2 max-w-md">
						<Input
							disabled={addProductMutation.isPending}
							className="w-full"
							placeholder="Product Name"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
						<Button
							disabled={addProductMutation.isPending}
							onClick={handleAddProduct}
							className="flex items-center gap-2"
						>
							{addProductMutation.isPending ? (
								<Loader2 className="w-4 h-4 animate-spin" />
							) : (
								<Plus className="w-4 h-4" />
							)}
							Add
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Filters & Search */}
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search products..."
						className="pl-9"
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
							setCurrentPage(1);
						}}
					/>
				</div>
				<div className="flex gap-2">
					<div className="flex items-center gap-2 bg-card border rounded-md px-3 h-10">
						<Filter className="w-4 h-4 text-muted-foreground" />
						<Select
							value={categoryFilter}
							onValueChange={(val) => {
								setCategoryFilter(val);
								setCurrentPage(1);
							}}
						>
							<SelectTrigger className="w-[140px] border-none shadow-none h-8">
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Categories</SelectItem>
								{categories.map((c) => (
									<SelectItem key={c} value={c}>
										{c}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="flex items-center gap-2 bg-card border rounded-md px-3 h-10">
						<ArrowUpDown className="w-4 h-4 text-muted-foreground" />
						<Select
							value={sortOption}
							onValueChange={(val) => {
								setSortOption(val);
								setCurrentPage(1);
							}}
						>
							<SelectTrigger className="w-[160px] border-none shadow-none h-8">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="default">Default</SelectItem>
								<SelectItem value="name-asc">Name (A-Z)</SelectItem>
								<SelectItem value="name-desc">Name (Z-A)</SelectItem>
								<SelectItem value="price-asc">Price (Low-High)</SelectItem>
								<SelectItem value="price-desc">Price (High-Low)</SelectItem>
								<SelectItem value="stock-asc">Stock (Low-High)</SelectItem>
								<SelectItem value="stock-desc">Stock (High-Low)</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			{/* Products Grid */}
			{productsQuery.isLoading ? (
				<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, idx) => (
						<div
							key={idx}
							className="p-5 border border-border rounded-xl bg-card shadow-sm space-y-3"
						>
							<Skeleton className="h-5 w-3/4" />
							<Skeleton className="h-4 w-1/4" />
							<Skeleton className="h-4 w-1/2" />
							<div className="pt-4 flex justify-between">
								<Skeleton className="h-8 w-8 rounded-full" />
								<Skeleton className="h-8 w-8 rounded-full" />
							</div>
						</div>
					))}
				</div>
			) : (
				<>
					{currentProducts.length === 0 ? (
						<div className="text-center py-12 text-muted-foreground">
							No products found matching your criteria.
						</div>
					) : (
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{currentProducts.map((item) => (
								<Card
									key={item.id}
									className="group overflow-hidden transition-all hover:shadow-md hover:border-primary/50 flex flex-col"
								>
									<CardHeader className="pb-3 p-5">
										<div className="flex justify-between items-start gap-4">
											<CardTitle className="text-lg line-clamp-1" title={item.title}>
												{item.title}
											</CardTitle>
											<Badge variant="secondary" className="capitalize whitespace-nowrap">
												{item.category}
											</Badge>
										</div>
										<div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
											<Star className="w-3.5 h-3.5 fill-current" />
											<span className="font-medium">{item.rating}</span>
										</div>
									</CardHeader>
									<CardContent className="p-5 pt-0 flex-1 flex flex-col">
										<p className="text-sm text-muted-foreground line-clamp-2 mb-4">
											{item.description}
										</p>
										<div className="mt-auto space-y-1">
											<div className="flex justify-between items-center">
												<span className="text-sm text-muted-foreground">Price</span>
												<span className="font-semibold text-lg">${item.price}</span>
											</div>
											<div className="flex justify-between items-center">
												<span className="text-sm text-muted-foreground">Stock</span>
												<span
													className={`text-sm font-medium ${
														item.stock < 10 ? 'text-destructive' : 'text-emerald-500'
													}`}
												>
													{item.stock} in stock
												</span>
											</div>
										</div>

										<div className="flex gap-2 mt-5 opacity-0 group-hover:opacity-100 transition-opacity">
											<Button
												variant="outline"
												size="icon"
												className="flex-1"
												onClick={() => setViewProduct(item)}
											>
												<Eye className="w-4 h-4" />
											</Button>
											<Button
												variant="outline"
												size="icon"
												className="flex-1 hover:bg-primary hover:text-primary-foreground"
												onClick={() => {
													setEditProduct(item);
													setEditForm({
														title: item.title,
														description: item.description,
														price: item.price,
														stock: item.stock
													});
												}}
											>
												<Pencil className="w-4 h-4" />
											</Button>
											<Button
												variant="outline"
												size="icon"
												className="flex-1 hover:bg-destructive hover:text-destructive-foreground"
												onClick={() => setDeleteProduct(item)}
											>
												<Trash2 className="w-4 h-4" />
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					)}

					{/* Pagination */}
					{totalPages > 1 && (
						<Pagination className="mt-8">
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href="#"
										onClick={(e) => {
											e.preventDefault();
											handlePageChange(currentPage - 1);
										}}
										className={
											currentPage === 1 ? 'pointer-events-none opacity-50' : ''
										}
									/>
								</PaginationItem>
								{Array.from({ length: totalPages }).map((_, i) => {
									const page = i + 1;
									// Simple pagination logic for demo purposes
									if (
										page === 1 ||
										page === totalPages ||
										(page >= currentPage - 1 && page <= currentPage + 1)
									) {
										return (
											<PaginationItem key={page}>
												<PaginationLink
													href="#"
													onClick={(e) => {
														e.preventDefault();
														handlePageChange(page);
													}}
													isActive={page === currentPage}
												>
													{page}
												</PaginationLink>
											</PaginationItem>
										);
									}
									if (page === 2 || page === totalPages - 1) {
										return (
											<PaginationItem key={`ellipsis-${page}`}>
												<PaginationEllipsis />
											</PaginationItem>
										);
									}
									return null;
								})}
								<PaginationItem>
									<PaginationNext
										href="#"
										onClick={(e) => {
											e.preventDefault();
											handlePageChange(currentPage + 1);
										}}
										className={
											currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
										}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					)}
				</>
			)}

			{/* View Dialog */}
			<Dialog open={!!viewProduct} onOpenChange={(open) => !open && setViewProduct(null)}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>{viewProduct?.title}</DialogTitle>
                        <DialogDescription>Product details</DialogDescription>
					</DialogHeader>
					{viewProduct && (
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
									<p className="text-sm">{viewProduct.description}</p>
								</div>
								<div>
									<h4 className="text-sm font-medium text-muted-foreground mb-1">Details</h4>
									<ul className="text-sm space-y-1">
										<li>
											<span className="text-muted-foreground">Category:</span>{' '}
											<span className="capitalize">{viewProduct.category}</span>
										</li>
										<li>
											<span className="text-muted-foreground">Brand:</span> {viewProduct.brand}
										</li>
										<li>
											<span className="text-muted-foreground">SKU:</span> {viewProduct.sku}
										</li>
										<li>
											<span className="text-muted-foreground">Price:</span> ${viewProduct.price}
										</li>
										<li>
											<span className="text-muted-foreground">Stock:</span> {viewProduct.stock}
										</li>
										<li>
											<span className="text-muted-foreground">Rating:</span> {viewProduct.rating} /
											5
										</li>
										<li>
											<span className="text-muted-foreground">Discount:</span>{' '}
											{viewProduct.discountPercentage}%
										</li>
									</ul>
								</div>
							</div>
							<div>
								<h4 className="text-sm font-medium text-muted-foreground mb-2">Tags</h4>
								<div className="flex gap-2">
									{viewProduct.tags?.map((t) => (
										<Badge key={t} variant="outline">
											{t}
										</Badge>
									))}
								</div>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>

			{/* Edit Dialog */}
			<Dialog open={!!editProduct} onOpenChange={(open) => !open && setEditProduct(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>Modify product details</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								value={editForm.title || ''}
								onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								value={editForm.description || ''}
								onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="price">Price ($)</Label>
								<Input
									id="price"
									type="number"
									value={editForm.price || 0}
									onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="stock">Stock</Label>
								<Input
									id="stock"
									type="number"
									value={editForm.stock || 0}
									onChange={(e) => setEditForm({ ...editForm, stock: Number(e.target.value) })}
								/>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setEditProduct(null)}>
							Cancel
						</Button>
						<Button
							disabled={updateProductMutation.isPending}
							onClick={handleUpdateProduct}
							className="flex items-center gap-2"
						>
							{updateProductMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
							Save Changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<Dialog open={!!deleteProduct} onOpenChange={(open) => !open && setDeleteProduct(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Product</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete <span className="font-semibold">{deleteProduct?.title}</span>?
							This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="mt-4">
						<Button variant="outline" onClick={() => setDeleteProduct(null)}>
							Cancel
						</Button>
						<Button
							variant="destructive"
							disabled={deleteProductMutation.isPending}
							onClick={handleDeleteProduct}
							className="flex items-center gap-2"
						>
							{deleteProductMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
							Delete Product
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ProductsView;
