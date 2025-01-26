import { useQuery, type UseQueryOptions } from "@tanstack/vue-query"
import axios from "axios";
import type { ProductType } from "./types";

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