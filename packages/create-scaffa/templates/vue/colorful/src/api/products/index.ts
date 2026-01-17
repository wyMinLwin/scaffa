import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from "@tanstack/vue-query"
import axios from "axios";

export const getProducts = {
    useQuery: (opt?: Partial<UseQueryOptions<Array<ProductType>,Error>>) => {
        return useQuery<ProductType[], Error>({
            queryKey: ['products'],
            queryFn: async () => {
                const request = await axios.get(`products`);
				return request.data.products;
            },
            ...opt
        })
    }
}

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