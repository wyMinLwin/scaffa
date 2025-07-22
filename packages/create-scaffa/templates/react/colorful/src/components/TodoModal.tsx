'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

const statusColors = {
	Todo: 'bg-gray-500',
	'In Progress': 'bg-blue-500',
	Done: 'bg-green-500',
	Canceled: 'bg-red-500'
};

const priorityColors = {
	Low: 'bg-green-500',
	Medium: 'bg-yellow-500',
	High: 'bg-red-500'
};

export type TaskForm = {
	id?: string;
	title: string;
	description: string;
	status: 'Todo' | 'In Progress' | 'Done' | 'Canceled';
	priority: 'Low' | 'Medium' | 'High';
};

interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (task: TaskForm) => void;
	initialData?: TaskForm;
}

export const TodoModal = ({ isOpen, onClose, onSubmit, initialData }: TaskModalProps) => {
	const [form, setForm] = useState<TaskForm>({
		title: '',
		description: '',
		status: 'Todo',
		priority: 'Medium'
	});

	useEffect(() => {
		if (initialData) setForm(initialData);
	}, [initialData]);

	const handleChange = (field: keyof TaskForm, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = () => {
		if (!form.title) return;
		onSubmit(form);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{initialData ? 'Edit Task' : 'Create Task'}</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-2">
					<div className="space-y-1">
						<Label>Title</Label>
						<Input value={form.title} onChange={(e) => handleChange('title', e.target.value)} />
					</div>
					<div className="space-y-1">
						<Label>Description</Label>
						<Textarea
							value={form.description}
							onChange={(e) => handleChange('description', e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label>Status</Label>
							<Select value={form.status} onValueChange={(v) => handleChange('status', v)}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(statusColors).map(([status, color]) => (
										<SelectItem key={status} value={status}>
											<Badge className={`${color} text-white`}>{status}</Badge>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label>Priority</Label>
							<Select value={form.priority} onValueChange={(v) => handleChange('priority', v)}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(priorityColors).map(([priority, color]) => (
										<SelectItem key={priority} value={priority}>
											<Badge className={`${color} text-white`}>{priority}</Badge>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSubmit}>{initialData ? 'Update' : 'Create'}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
