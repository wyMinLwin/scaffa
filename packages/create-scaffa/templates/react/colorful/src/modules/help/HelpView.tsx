import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleHelp, ChevronDown, ChevronUp, ExternalLink, Code2, Bug, Users, Mail } from 'lucide-react';

const faqs = [
	{
		question: 'How do I get started?',
		answer: 'Begin by cloning the repository and running pnpm install. Then start the development server with pnpm dev to see the template in action.'
	},
	{
		question: 'How do I change the theme?',
		answer: 'You can change the theme from the Settings page. It uses Zustand for state management and persists your preference in localStorage.'
	},
	{
		question: 'How do I switch languages?',
		answer: 'Use the language selector on the Settings or Home page. We use react-i18next for internationalization support.'
	},
	{
		question: 'What APIs does this template use?',
		answer: 'This template comes pre-configured with Axios and TanStack Query for data fetching, with example endpoints in the api/ directory.'
	},
	{
		question: 'How do I add new pages?',
		answer: 'Create a new view component in the modules/ directory and add its route to the Router.ts configuration file.'
	},
	{
		question: 'How do I deploy this app?',
		answer: 'You can easily deploy this Vite-based application to Vercel, Netlify, or any static hosting provider of your choice.'
	}
];

const HelpView = () => {
	const [openFaq, setOpenFaq] = useState<number | null>(0);

	const toggleFaq = (index: number) => {
		setOpenFaq(openFaq === index ? null : index);
	};

	return (
		<div className="space-y-8 max-w-4xl">
			<div>
				<h1 className="text-2xl font-bold flex items-center gap-2">
					<CircleHelp className="w-7 h-7 text-primary" />
					Help Center
				</h1>
				<p className="text-muted-foreground mt-1">Find answers to common questions</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="hover:border-primary cursor-pointer transition-colors">
					<CardContent className="pt-6 flex flex-col items-center text-center gap-2">
						<div className="bg-primary/10 p-3 rounded-full text-primary">
							<ExternalLink className="w-6 h-6" />
						</div>
						<a href="#" className="font-medium stretched-link">
							Documentation
						</a>
						<p className="text-xs text-muted-foreground">Detailed guides</p>
					</CardContent>
				</Card>

				<Card className="hover:border-primary cursor-pointer transition-colors">
					<CardContent className="pt-6 flex flex-col items-center text-center gap-2">
						<div className="bg-primary/10 p-3 rounded-full text-primary">
							<Code2 className="w-6 h-6" />
						</div>
						<a href="#" className="font-medium stretched-link">
							GitHub Repository
						</a>
						<p className="text-xs text-muted-foreground">Source code</p>
					</CardContent>
				</Card>

				<Card className="hover:border-primary cursor-pointer transition-colors">
					<CardContent className="pt-6 flex flex-col items-center text-center gap-2">
						<div className="bg-primary/10 p-3 rounded-full text-primary">
							<Bug className="w-6 h-6" />
						</div>
						<a href="#" className="font-medium stretched-link">
							Report an Issue
						</a>
						<p className="text-xs text-muted-foreground">Found a bug?</p>
					</CardContent>
				</Card>

				<Card className="hover:border-primary cursor-pointer transition-colors">
					<CardContent className="pt-6 flex flex-col items-center text-center gap-2">
						<div className="bg-primary/10 p-3 rounded-full text-primary">
							<Users className="w-6 h-6" />
						</div>
						<a href="#" className="font-medium stretched-link">
							Community
						</a>
						<p className="text-xs text-muted-foreground">Join the discussion</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Frequently Asked Questions</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{faqs.map((faq, index) => (
						<div key={index} className="border rounded-lg overflow-hidden">
							<button
								className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-muted/50 transition-colors"
								onClick={() => toggleFaq(index)}
							>
								{faq.question}
								{openFaq === index ? (
									<ChevronUp className="w-5 h-5 text-muted-foreground" />
								) : (
									<ChevronDown className="w-5 h-5 text-muted-foreground" />
								)}
							</button>
							{openFaq === index && (
								<div className="p-4 pt-0 text-sm text-muted-foreground border-t">
									<div className="pt-3">{faq.answer}</div>
								</div>
							)}
						</div>
					))}
				</CardContent>
			</Card>

			<Card className="bg-primary/5 border-primary/20">
				<CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="bg-primary/10 p-3 rounded-full text-primary hidden md:block">
							<Mail className="w-6 h-6" />
						</div>
						<div>
							<h3 className="font-bold text-lg">Still need help?</h3>
							<p className="text-muted-foreground text-sm">
								Our support team is here for you at support@scaffa.dev
							</p>
						</div>
					</div>
					<Button className="w-full md:w-auto">Contact Support</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default HelpView;
