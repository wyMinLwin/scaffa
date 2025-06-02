type TodoType = {
	id: number;
	todo: string;
	completed: boolean;
	userId: number;
};

type TodoResponseType = {
	todos: TodoType[];
	total: number;
	skip: number;
	limit: number;
};
