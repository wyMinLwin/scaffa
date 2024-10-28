import { TestType } from "@/shared/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const getTestData = {
	useQuery: (opt?: UseQueryOptions<unknown, Error, Array<TestType>>) => {
		return useQuery({
			queryKey: ["test"],
			queryFn: async () => {
				const request = await axios.get(`products`);
				return request.data.products;
			},
			...opt,
		});
	},
};
