import api from '@/api';
import { Button } from '@/components/ui/button';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const HomeView = () => {
	const { t } = useTranslation();
	const changeLanguage = (lng: string) => {
		i18next.changeLanguage(lng);
	};
	const productsQuery = api.products.getProducts.useQuery();
	const todosQuery = api.todos.getTodos.useInfiniteQuery();
	return (
		<div>
			<h1 className="">Template: React-std</h1>
			<p>Tech Stack: React + Shadcn UI</p>
			<p>{t('common.hello')}</p>
			<div className="flex gap-2">
				<Button onClick={() => changeLanguage('en')}>English</Button>
				<Button onClick={() => changeLanguage('mm')}>Myanmar</Button>
			</div>

			<h2>Products</h2>
			{productsQuery.isLoading ? (
				<p>Loading...</p>
			) : (
				<div>{productsQuery.data?.map((item) => <div key={item.id}>{item.title}</div>)}</div>
			)}
			
			<hr className='my-5'></hr>

			<h2>Todos</h2>
			<div>{todosQuery.data?.map((todo,todoIndex) => <div key={todo.id}>{todoIndex+1} . {todo.todo}</div>)}</div>
			{todosQuery.hasNextPage && <Button
				onClick={() => {
					todosQuery.fetchNextPage();
				}}
			>Next</Button>}
		</div>
	);
};

export default HomeView;
