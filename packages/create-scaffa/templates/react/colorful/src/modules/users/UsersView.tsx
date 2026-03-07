'use client';

import api from '@/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Search, Eye, Mail, Phone, Building2, User } from 'lucide-react';
import { useState, useMemo } from 'react';

const UsersView = () => {
	const [search, setSearch] = useState('');
	const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

	const usersQuery = api.users.getUsers.useQuery({
		staleTime: 5 * 60 * 1000,
	});

	const users = usersQuery.data ?? [];

	const filteredUsers = useMemo(() => {
		return users.filter((user) => {
			const searchTerm = search.toLowerCase();
			return (
				user.firstName.toLowerCase().includes(searchTerm) ||
				user.lastName.toLowerCase().includes(searchTerm) ||
				user.email.toLowerCase().includes(searchTerm) ||
				user.username.toLowerCase().includes(searchTerm)
			);
		});
	}, [users, search]);

	const handleViewUser = (user: UserType) => {
		setSelectedUser(user);
	};

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold flex items-center gap-2">
						<Users className="w-6 h-6 text-primary" />
						Users Management
					</h1>
					<p className="text-muted-foreground text-sm">
						Manage your users, view their details, and monitor activity.
					</p>
				</div>
			</div>

			{usersQuery.isLoading ? (
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{Array.from({ length: 3 }).map((_, idx) => (
						<div
							key={idx}
							className="p-4 border border-border rounded-lg bg-card shadow-sm space-y-2"
						>
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-3 w-24" />
							<Skeleton className="h-3 w-20" />
						</div>
					))}
				</div>
			) : (
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-sm font-medium">
								<Users className="w-4 h-4 text-muted-foreground" />
								Total Users
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">{users.length}</div>
							<p className="text-xs text-muted-foreground mt-1">
								Registered users in platform
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-sm font-medium">
								<User className="w-4 h-4 text-muted-foreground" />
								Active Users
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">{users.filter((u) => u.role !== 'guest').length}</div>
							<p className="text-xs text-muted-foreground mt-1">
								Non-guest user accounts
							</p>
						</CardContent>
					</Card>
				</div>
			)}

			<Card>
				<CardHeader>
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Search className="w-5 h-5 text-primary" />
							Directory
						</CardTitle>
						<div className="w-full sm:w-auto">
							<Input
								placeholder="Search by name, email or username..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full sm:w-[320px]"
							/>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="rounded-lg border bg-card shadow-sm overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead className="border-b bg-muted/50">
									<tr className="text-muted-foreground">
										<th className="px-4 py-3 text-left">User</th>
										<th className="px-4 py-3 text-left">Contact</th>
										<th className="px-4 py-3 text-left">Role</th>
										<th className="px-4 py-3 text-left">Company</th>
										<th className="px-4 py-3 text-right">Actions</th>
									</tr>
								</thead>
								<tbody>
									{usersQuery.isLoading ? (
										Array.from({ length: 5 }).map((_, i) => (
											<tr key={i} className="border-b">
												<td className="px-4 py-3">
													<div className="flex items-center gap-3">
														<Skeleton className="h-10 w-10 rounded-full" />
														<div className="space-y-2">
															<Skeleton className="h-4 w-24" />
															<Skeleton className="h-3 w-16" />
														</div>
													</div>
												</td>
												<td className="px-4 py-3">
													<div className="space-y-2">
														<Skeleton className="h-4 w-32" />
														<Skeleton className="h-3 w-24" />
													</div>
												</td>
												<td className="px-4 py-3"><Skeleton className="h-5 w-16" /></td>
												<td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
												<td className="px-4 py-3 text-right"><Skeleton className="h-8 w-8 ml-auto" /></td>
											</tr>
										))
									) : filteredUsers.length > 0 ? (
										filteredUsers.map((user) => (
											<tr key={user.id} className="border-b hover:bg-muted/40 transition group">
												<td className="px-4 py-3">
													<div className="flex items-center gap-3">
														<Avatar className="h-10 w-10 border">
															<AvatarImage src={user.image} alt={user.firstName} />
															<AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium text-foreground">{user.firstName} {user.lastName}</p>
															<p className="text-xs text-muted-foreground">@{user.username}</p>
														</div>
													</div>
												</td>
												<td className="px-4 py-3">
													<div className="flex flex-col gap-1">
														<span className="flex items-center gap-1 text-xs text-muted-foreground">
															<Mail className="w-3 h-3" /> {user.email}
														</span>
														<span className="flex items-center gap-1 text-xs text-muted-foreground">
															<Phone className="w-3 h-3" /> {user.phone}
														</span>
													</div>
												</td>
												<td className="px-4 py-3">
													<Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
														{user.role}
													</Badge>
												</td>
												<td className="px-4 py-3">
													<div className="flex items-center gap-1 text-sm text-muted-foreground">
														<Building2 className="w-4 h-4" />
														<span className="truncate max-w-[150px]">{user.company.name}</span>
													</div>
												</td>
												<td className="px-4 py-3 text-right">
													<Button 
														variant="ghost" 
														size="icon" 
														onClick={() => handleViewUser(user)}
														className="opacity-0 group-hover:opacity-100 transition-opacity"
													>
														<Eye className="w-4 h-4" />
													</Button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={5} className="text-center text-muted-foreground py-8">
												<div className="flex flex-col items-center justify-center gap-2">
													<Search className="w-8 h-8 text-muted-foreground/50" />
													<p>No users found matching "{search}"</p>
												</div>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</CardContent>
			</Card>

			<Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>User Profile</DialogTitle>
					</DialogHeader>
					{selectedUser && (
						<div className="space-y-6 pt-4">
							<div className="flex flex-col items-center gap-4">
								<Avatar className="h-24 w-24 border-4 border-background shadow-sm">
									<AvatarImage src={selectedUser.image} alt={selectedUser.firstName} />
									<AvatarFallback className="text-2xl">{selectedUser.firstName.charAt(0)}{selectedUser.lastName.charAt(0)}</AvatarFallback>
								</Avatar>
								<div className="text-center space-y-1">
									<h3 className="font-semibold text-xl">{selectedUser.firstName} {selectedUser.lastName}</h3>
									<p className="text-sm text-muted-foreground">@{selectedUser.username}</p>
									<Badge variant={selectedUser.role === 'admin' ? 'default' : 'secondary'} className="mt-2 capitalize">
										{selectedUser.role}
									</Badge>
								</div>
							</div>

							<div className="grid gap-4 bg-muted/50 p-4 rounded-lg">
								<div className="flex items-center gap-3">
									<Mail className="w-4 h-4 text-muted-foreground" />
									<div className="flex-1 space-y-1">
										<p className="text-sm font-medium leading-none">Email</p>
										<p className="text-sm text-muted-foreground">{selectedUser.email}</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Phone className="w-4 h-4 text-muted-foreground" />
									<div className="flex-1 space-y-1">
										<p className="text-sm font-medium leading-none">Phone</p>
										<p className="text-sm text-muted-foreground">{selectedUser.phone}</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Building2 className="w-4 h-4 text-muted-foreground" />
									<div className="flex-1 space-y-1">
										<p className="text-sm font-medium leading-none">Company</p>
										<p className="text-sm text-muted-foreground">{selectedUser.company.name}</p>
										<p className="text-xs text-muted-foreground">{selectedUser.company.title} • {selectedUser.company.department}</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default UsersView;
