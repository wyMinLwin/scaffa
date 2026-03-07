import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

export const getUsers = {
	useQuery: (opt?: Omit<UseQueryOptions<Array<UserType>, Error>, 'queryKey' | 'queryFn'>) => {
		return useQuery<UserType[], Error>({
			queryKey: ['users'],
			queryFn: async () => {
				const request = await axios.get('users?limit=30');
        return request.data.users;
      },
      ...opt
    });
  }
};
