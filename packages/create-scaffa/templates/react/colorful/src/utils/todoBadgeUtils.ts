export function getStatusBadgeVariant(status: string): 'default' | 'secondary' | 'destructive' {
	switch (status) {
		case 'Pending':
			return 'default';
		case 'In Progress':
			return 'secondary';
		case 'Completed':
			return 'destructive';
		default:
			return 'default';
	}
}

export function getPriorityBadgeVariant(priority: string): 'default' | 'secondary' | 'destructive' {
	switch (priority) {
		case 'Low':
			return 'default';
		case 'Medium':
			return 'secondary';
		case 'High':
			return 'destructive';
		default:
			return 'default';
	}
}
