type TodoType = {
	id: number;
	todo: string;
	completed: boolean;
	userId: number;
};

type CreateTodoType = {
	todo: string;
	completed: boolean;
	userId: number;
};

type UpdateTodoType = Partial<CreateTodoType>;

type TodoResponseType = {
	todos: TodoType[];
	total: number;
	skip: number;
	limit: number;
};
