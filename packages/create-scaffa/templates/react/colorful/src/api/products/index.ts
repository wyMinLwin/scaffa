import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

export const getProducts = {
	useQuery: (opt?: UseQueryOptions<Array<ProductType>, Error>) => {
		return useQuery<ProductType[], Error>({
			queryKey: ['products'],
			queryFn: async () => {
				const request = await axios.get(`products`);
				return request.data.products;
			},
			...opt
		});
	}
};

export const addProduct = {
    useMutation: (opt?: Partial<UseMutationOptions<ProductType, Error, CreateProductType>>) => {
        return useMutation<ProductType, Error, CreateProductType>({
            mutationFn: async (product) => {
                const request = await axios.post(`products/add`, product);
                return request.data;
            },
            ...opt
        })
    }
}

export const updateProduct = {
    useMutation: (opt?: Partial<UseMutationOptions<ProductType, Error, { id: number; data: Partial<CreateProductType> }>>) => {
        return useMutation<ProductType, Error, { id: number; data: Partial<CreateProductType> }>({
            mutationFn: async ({ id, data }) => {
                const request = await axios.put(`products/${id}`, data);
                return request.data;
            },
            ...opt
        })
    }
}

export const deleteProduct = {
    useMutation: (opt?: Partial<UseMutationOptions<ProductType, Error, number>>) => {
        return useMutation<ProductType, Error, number>({
            mutationFn: async (id) => {
                const request = await axios.delete(`products/${id}`);
                return request.data;
            },
            ...opt
        })
    }
}

export const searchProducts = {
    useQuery: (q: string, opt?: Omit<UseQueryOptions<Array<ProductType>, Error>, 'queryKey' | 'queryFn'>) => {
        return useQuery<ProductType[], Error>({
            queryKey: ['products', 'search', q],
            queryFn: async () => {
                const request = await axios.get(`products/search?q=${q}`);
                return request.data.products;
            },
            enabled: !!q,
            ...opt
        });
    }
};

export const getProductCategories = {
    useQuery: (opt?: Omit<UseQueryOptions<string[], Error>, 'queryKey' | 'queryFn'>) => {
        return useQuery<string[], Error>({
            queryKey: ['products', 'categories'],
            queryFn: async () => {
                const request = await axios.get<Array<{ slug: string; name: string; url: string }>>(
                    `products/categories`
                );
                return request.data.map((c) => c.slug || c.name);
            },
            ...opt
        });
    }
};
