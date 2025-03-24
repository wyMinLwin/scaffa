import { ProductType } from '@/shared/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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
