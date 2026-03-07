'use client';

import api from '@/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { ListTodo, Trash2, Pencil, Plus, CheckCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { TodoModal, TaskForm } from '@/components/TodoModal';
import { Select } from '@/components/ui/select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getPriorityBadgeVariant, getStatusBadgeVariant } from '@/utils/todoBadgeUtils';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

type StatusType = 'Pending' | 'In Progress' | 'Completed';
type PriorityType = 'Low' | 'Medium' | 'High';

const TodosView = () => {
	const [search, setSearch] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [editingTodo, setEditingTodo] = useState<TaskForm | null>(null);
	const [filterStatus, setFilterStatus] = useState<StatusType | 'All'>('All');
	const [filterPriority, setFilterPriority] = useState<PriorityType | 'All'>('All');

	const queryClient = useQueryClient();
	const todosQuery = api.todos.getTodos.useInfiniteQuery();
	const addMutation = api.todos.addTodo.useMutation();
	const updateMutation = api.todos.updateTodo.useMutation();
	const deleteMutation = api.todos.deleteTodo.useMutation();

	const todos = useMemo(
		() =>
			todosQuery.data?.map((todo, index) => ({
				...todo,
				status: ['Pending', 'In Progress', 'Completed'][index % 3] as StatusType,
				priority: ['Low', 'Medium', 'High'][index % 3] as PriorityType
			})) ?? [],
		[todosQuery.data]
	);

	const filteredTodos = useMemo(() => {
		return todos.filter((todo) => {
			const matchesSearch = todo.todo.toLowerCase().includes(search.toLowerCase());
			const matchesStatus = filterStatus === 'All' || todo.status === filterStatus;
			const matchesPriority = filterPriority === 'All' || todo.priority === filterPriority;
			return matchesSearch && matchesStatus && matchesPriority;
		});
	}, [todos, search, filterStatus, filterPriority]);

	const statusToFormStatus = (status: StatusType): TaskForm['status'] => {
		const map: Record<StatusType, TaskForm['status']> = {
			'Pending': 'Todo',
			'In Progress': 'In Progress',
			'Completed': 'Done'
		};
		return map[status];
	};

	const handleEdit = (todo: (typeof todos)[number]) => {
		setEditingTodo({
			id: todo.id.toString(),
			title: todo.todo,
			description: '',
			status: statusToFormStatus(todo.status),
			priority: todo.priority
		});
		setModalOpen(true);
	};

	const handleDelete = (id: number) => {
		if (confirm('Are you sure you want to delete this task?')) {
			deleteMutation.mutate(id, {
				onSuccess: () => {
					toast.success('Task deleted successfully');
					queryClient.invalidateQueries({ queryKey: ['todos'] });
				},
				onError: () => {
					toast.error('Failed to delete task');
				}
			});
		}
	};

	const handleToggleComplete = (todo: (typeof todos)[number]) => {
		const isCompleted = todo.status === 'Completed';
		updateMutation.mutate(
			{ id: todo.id, data: { completed: !isCompleted } },
			{
				onSuccess: () => {
					toast.success(`Task marked as ${!isCompleted ? 'completed' : 'pending'}`);
					queryClient.invalidateQueries({ queryKey: ['todos'] });
				},
				onError: () => {
					toast.error('Failed to update task status');
				}
			}
		);
	};

	const handleSubmit = (task: TaskForm) => {
		if (editingTodo && task.id) {
			updateMutation.mutate(
				{
					id: parseInt(task.id, 10),
					data: { todo: task.title, completed: task.status === 'Completed' }
				},
				{
					onSuccess: () => {
						toast.success('Task updated successfully');
						queryClient.invalidateQueries({ queryKey: ['todos'] });
						setModalOpen(false);
						setEditingTodo(null);
					},
					onError: () => {
						toast.error('Failed to update task');
					}
				}
			);
		} else {
			addMutation.mutate(
				{ todo: task.title, completed: task.status === 'Completed', userId: 1 },
				{
					onSuccess: () => {
						toast.success('Task created successfully');
						queryClient.invalidateQueries({ queryKey: ['todos'] });
						setModalOpen(false);
						setEditingTodo(null);
					},
					onError: () => {
						toast.error('Failed to create task');
					}
				}
			);
		}
	};

	const handleOpenNewTask = () => {
		setEditingTodo(null);
		setModalOpen(true);
	};

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="space-y-1">
				<h2 className="text-2xl font-bold flex items-center gap-2">
					<ListTodo className="w-6 h-6 text-primary" />
					Tasks
				</h2>
				<p className="text-muted-foreground text-sm">Here’s a list of your tasks this month</p>
			</div>

			{/* Top Filters */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex gap-2 w-full sm:w-auto">
					<Input
						placeholder="Search tasks..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full sm:w-[240px]"
					/>
					<Select onValueChange={(v) => setFilterStatus(v as StatusType | 'All')}>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All Statuses</SelectItem>
							<SelectItem value="Pending">Pending</SelectItem>
							<SelectItem value="In Progress">In Progress</SelectItem>
							<SelectItem value="Completed">Completed</SelectItem>
						</SelectContent>
					</Select>
					<Select onValueChange={(v) => setFilterPriority(v as PriorityType | 'All')}>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Priority" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All Priorities</SelectItem>
							<SelectItem value="Low">Low</SelectItem>
							<SelectItem value="Medium">Medium</SelectItem>
							<SelectItem value="High">High</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Button onClick={handleOpenNewTask}>
					<Plus className="w-4 h-4 mr-2" />
					New Task
				</Button>
			</div>

			{/* Task Table */}
			<div className="rounded-lg border bg-card shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="border-b bg-muted/50">
							<tr className="text-muted-foreground">
								<th className="px-4 py-3 text-left">ID</th>
								<th className="px-4 py-3 text-left">Title</th>
								<th className="px-4 py-3 text-left">Status</th>
								<th className="px-4 py-3 text-left">Priority</th>
								<th className="px-4 py-3 text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{todosQuery.isLoading ? (
								Array.from({ length: 6 }).map((_, i) => (
									<tr key={i} className="border-b">
										<td colSpan={5} className="px-4 py-3">
											<Skeleton className="h-4 w-full" />
										</td>
									</tr>
								))
							) : filteredTodos.length > 0 ? (
								filteredTodos.map((todo) => (
									<tr key={todo.id} className="border-b hover:bg-muted/40 transition">
										<td className="px-4 py-3 text-primary font-medium">TASK-{todo.id}</td>
										<td className="px-4 py-3">{todo.todo}</td>
										<td className="px-4 py-3">
											<Badge variant={getStatusBadgeVariant(todo.status)}>{todo.status}</Badge>
										</td>
										<td className="px-4 py-3">
											<Badge variant={getPriorityBadgeVariant(todo.priority)}>
												{todo.priority}
											</Badge>
										</td>
										<td className="px-4 py-3 text-right flex justify-end gap-2">
											<Button variant="ghost" size="icon" onClick={() => handleToggleComplete(todo)}>
												<CheckCircle className={`w-4 h-4 ${todo.status === 'Completed' ? 'text-green-500' : 'text-gray-400'}`} />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleEdit(todo)}>
												<Pencil className="w-4 h-4" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleDelete(todo.id)}>
												<Trash2 className="w-4 h-4 text-red-500" />
											</Button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5} className="text-center text-muted-foreground py-6">
										No tasks found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Load More */}
			{todosQuery.hasNextPage && (
				<div className="flex justify-center pt-4">
					<Button onClick={() => todosQuery.fetchNextPage()} variant="outline">
						Load More
					</Button>
				</div>
			)}

			{/* Modal */}
			<TodoModal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setEditingTodo(null);
				}}
				initialData={editingTodo || undefined}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default TodosView;
