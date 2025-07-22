import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	PointElement,
	LineElement,
	Tooltip,
	Filler,
	Legend
} from 'chart.js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import api from '@/api';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	PointElement,
	LineElement,
	Tooltip,
	Filler,
	Legend
);

// Chart Data
const barData = {
	labels: [
		'Apr 8',
		'Apr 17',
		'Apr 26',
		'May 5',
		'May 14',
		'May 24',
		'Jun 2',
		'Jun 11',
		'Jun 20',
		'Jun 30'
	],
	datasets: [
		{
			label: 'Visitors',
			data: [30, 45, 25, 60, 40, 70, 50, 65, 55, 75],
			backgroundColor: 'rgba(99, 102, 241, 0.7)',
			borderRadius: 4
		}
	]
};

const areaData = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
	datasets: [
		{
			label: 'Visitors',
			data: [1000, 1500, 1200, 1700, 1400, 1800],
			fill: true,
			backgroundColor: 'rgba(99, 102, 241, 0.3)',
			borderColor: 'rgba(99, 102, 241, 1)',
			tension: 0.4
		},
		{
			label: 'Returning Visitors',
			data: [400, 700, 500, 800, 600, 900],
			fill: true,
			backgroundColor: 'rgba(16, 185, 129, 0.3)',
			borderColor: 'rgba(16, 185, 129, 1)',
			tension: 0.4
		}
	]
};

const donutData = {
	labels: ['Chrome', 'Firefox', 'Safari', 'Others'],
	datasets: [
		{
			data: [48, 24, 20, 8],
			backgroundColor: ['#4F46E5', '#10B981', '#6366F1', '#F43F5E'],
			borderWidth: 0
		}
	]
};

const recentSales = [
	{
		name: 'Olivia Martin',
		email: 'olivia.martin@email.com',
		amount: '$1,999.00',
		avatar: 'https://i.pravatar.cc/150?img=1'
	},
	{
		name: 'Jackson Lee',
		email: 'jackson.lee@email.com',
		amount: '$39.00',
		avatar: 'https://i.pravatar.cc/150?img=2'
	},
	{
		name: 'Isabella Nguyen',
		email: 'isabella.nguyen@email.com',
		amount: '$299.00',
		avatar: 'https://i.pravatar.cc/150?img=3'
	},
	{
		name: 'William Kim',
		email: 'will@email.com',
		amount: '$99.00',
		avatar: 'https://i.pravatar.cc/150?img=4'
	},
	{
		name: 'Sofia Davis',
		email: 'sofia.davis@email.com',
		amount: '$39.00',
		avatar: 'https://i.pravatar.cc/150?img=5'
	}
];

const DashboardView = () => {
	// const productsQuery = api.products.getProducts.useQuery()
	return (
		<div className="space-y-8">
			<h1 className="text-2xl font-bold">Hi, Welcome back 👋</h1>

			{/* Metric Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>Total Revenue</CardTitle>
							<span className="text-xs bg-muted px-2 py-1 rounded-md text-foreground/70">
								+12.5%
							</span>
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">$1,250.00</div>
						<p className="text-sm font-medium mt-2 flex items-center gap-1">
							Trending up this month ↗️
						</p>
						<p className="text-xs text-muted-foreground">Visitors for the last 6 months</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>New Customers</CardTitle>
							<span className="text-xs bg-muted px-2 py-1 rounded-md text-foreground/70">-20%</span>
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">1,234</div>
						<p className="text-sm font-medium mt-2 flex items-center gap-1">
							Down 20% this period ↘️
						</p>
						<p className="text-xs text-muted-foreground">Acquisition needs attention</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>Active Accounts</CardTitle>
							<span className="text-xs bg-muted px-2 py-1 rounded-md text-foreground/70">
								+12.5%
							</span>
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">45,678</div>
						<p className="text-sm font-medium mt-2 flex items-center gap-1">
							Strong user retention ↗️
						</p>
						<p className="text-xs text-muted-foreground">Engagement exceed targets</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>Growth Rate</CardTitle>
							<span className="text-xs bg-muted px-2 py-1 rounded-md text-foreground/70">
								+4.5%
							</span>
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">4.5%</div>
						<p className="text-sm font-medium mt-2 flex items-center gap-1">
							Steady performance increase ↗️
						</p>
						<p className="text-xs text-muted-foreground">Meets growth projections</p>
					</CardContent>
				</Card>
			</div>

			{/* Bar Chart + Recent Sales */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Bar Chart - Interactive</CardTitle>
					</CardHeader>
					<CardContent className="h-[300px]">
						<Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Recent Sales</CardTitle>
					</CardHeader>
					<CardContent className="divide-y">
						{recentSales.map((sale, idx) => (
							<div key={idx} className="flex items-center py-2 gap-4">
								<Avatar>
									<AvatarImage src={sale.avatar} />
									<AvatarFallback>{sale.name[0]}</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<p className="font-medium">{sale.name}</p>
									<p className="text-xs text-muted-foreground">{sale.email}</p>
								</div>
								<div className="font-medium">{sale.amount}</div>
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			{/* Area Chart + Donut */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Area Chart - Stacked</CardTitle>
						<p className="text-muted-foreground text-xs">
							Showing total visitors for the last 6 months
						</p>
					</CardHeader>
					<CardContent className="h-[300px]">
						<Line data={areaData} options={{ responsive: true, maintainAspectRatio: false }} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Pie Chart - Donut with Text</CardTitle>
					</CardHeader>
					<CardContent className="h-[300px] flex flex-col items-center justify-center">
						<Doughnut
							data={donutData}
							options={{ responsive: true, maintainAspectRatio: false, cutout: '70%' }}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
export default DashboardView;
