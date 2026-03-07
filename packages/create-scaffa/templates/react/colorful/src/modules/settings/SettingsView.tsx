import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useThemeStore } from '@/lib/theme';
import i18next from 'i18next';
import { Settings, Sun, Moon, Languages, User, Info } from 'lucide-react';

const SettingsView = () => {
	const { theme, toggleTheme } = useThemeStore();

	const changeLanguage = (lng: string) => {
		i18next.changeLanguage(lng);
		localStorage.setItem('scaffa-locale', lng);
	};

	return (
		<div className="space-y-8 max-w-4xl">
			<div>
				<h1 className="text-2xl font-bold flex items-center gap-2">
					<Settings className="w-7 h-7 text-primary" />
					Settings
				</h1>
				<p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
			</div>

			<div className="grid gap-6">
				{/* Appearance Section */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							{theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
							Appearance
						</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-between">
						<div>
							<p className="font-medium">Theme</p>
							<p className="text-sm text-muted-foreground">
								Customize the look and feel of your workspace.
							</p>
						</div>
						<Button variant="outline" onClick={toggleTheme}>
							{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
						</Button>
					</CardContent>
				</Card>

				{/* Language Section */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Languages className="w-5 h-5" />
							Language
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<div>
							<p className="font-medium">Current Language: {i18next.language === 'mm' ? 'Myanmar' : 'English'}</p>
							<p className="text-sm text-muted-foreground">
								Select your preferred language for the interface.
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant={i18next.language === 'en' ? 'default' : 'outline'}
								onClick={() => changeLanguage('en')}
							>
								English
							</Button>
							<Button
								variant={i18next.language === 'mm' ? 'default' : 'outline'}
								onClick={() => changeLanguage('mm')}
							>
								Myanmar
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Profile Section */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="w-5 h-5" />
							Profile
						</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center gap-4">
						<Avatar className="w-16 h-16 border-2 border-primary/20">
							<AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Profile avatar" />
							<AvatarFallback>SC</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-lg font-semibold">Demo User</p>
							<p className="text-sm text-muted-foreground">demo@scaffa.dev</p>
							<div className="mt-2">
								<span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
									Pro Member
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* About Section */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Info className="w-5 h-5" />
							About
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<p className="text-muted-foreground">App Name</p>
								<p className="font-medium">Scaffa Colorful</p>
							</div>
							<div>
								<p className="text-muted-foreground">Version</p>
								<p className="font-medium">1.0.0</p>
							</div>
							<div className="col-span-2">
								<p className="text-muted-foreground">Tech Stack</p>
								<p className="font-medium">React + ShadCN UI + TypeScript</p>
							</div>
						</div>
						<div className="pt-2 border-t">
							<a
								href="#"
								className="text-sm text-primary hover:underline flex items-center gap-1"
							>
								View on GitHub
							</a>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default SettingsView;
