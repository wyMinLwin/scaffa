export type TodoStatus = 'Todo' | 'In Progress' | 'Done' | 'Backlog' | 'Canceled';
export type TodoPriority = 'Low' | 'Medium' | 'High';

export interface TodoType {
	id: number;
	todo: string;
	status: TodoStatus;
	priority: TodoPriority;
}
