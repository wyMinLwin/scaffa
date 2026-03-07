import { useInfiniteQuery, UseInfiniteQueryOptions, useMutation, UseMutationOptions } from '@tanstack/react-query';
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

export const addTodo = {
	useMutation: (opt?: Partial<UseMutationOptions<TodoType, Error, CreateTodoType>>) => {
		return useMutation<TodoType, Error, CreateTodoType>({
			mutationFn: async (todo) => {
				const request = await axios.post(`todos/add`, todo);
				return request.data;
			},
			...opt
		});
	}
};

export const updateTodo = {
	useMutation: (opt?: Partial<UseMutationOptions<TodoType, Error, { id: number; data: UpdateTodoType }>>) => {
		return useMutation<TodoType, Error, { id: number; data: UpdateTodoType }>({
			mutationFn: async ({ id, data }) => {
				const request = await axios.put(`todos/${id}`, data);
				return request.data;
			},
			...opt
		});
	}
};

export const deleteTodo = {
	useMutation: (opt?: Partial<UseMutationOptions<TodoType, Error, number>>) => {
		return useMutation<TodoType, Error, number>({
			mutationFn: async (id) => {
				const request = await axios.delete(`todos/${id}`);
				return request.data;
			},
			...opt
		});
	}
};
