import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReactNode } from 'react';

interface ChartWrapperProps {
	title: string;
	description?: string;
	height?: string;
	children: ReactNode;
}

const ChartWrapper = ({ title, description, height = 'h-[300px]', children }: ChartWrapperProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				{description && <p className="text-muted-foreground text-xs">{description}</p>}
			</CardHeader>
			<CardContent className={height}>{children}</CardContent>
		</Card>
	);
};

export default ChartWrapper;
