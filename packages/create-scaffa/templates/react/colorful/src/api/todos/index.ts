import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

export const getTodos = {
	useInfiniteQuery: (opt?: UseInfiniteQueryOptions<TodoResponseType, Error, TodoType[]>) => {
		return useInfiniteQuery<TodoResponseType, Error, TodoType[]>({
			queryKey: ['todos'],
			queryFn: async ({ pageParam }) => {
				const request = await axios.get(`todos?limit=50&skip=${pageParam}`);
				return request.data;
			},
			initialPageParam: 0,
			getNextPageParam: (lastPage) => (lastPage.todos.length < 50 ? undefined : lastPage.skip + 50),
			select: (data) => data.pages.flatMap((page) => page.todos),
			...opt
		});
	}
};
