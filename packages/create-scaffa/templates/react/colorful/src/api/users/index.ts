import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

export const getUsers = {
  useQuery: (opt?: UseQueryOptions<Array<UserType>, Error>) => {
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