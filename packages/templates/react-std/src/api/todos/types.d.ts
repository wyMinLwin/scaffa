export type TodoType = {
	id: number;
	todo: string;
	completed: boolean;
	userId: number;
};

export type TodoResponseType = {
	todos: TodoType[];
	total: number;
	skip: number;
	limit: number;
};
