type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  role: string;
  company: {
    name: string;
    department: string;
    title: string;
  };
};

type UsersResponseType = {
  users: UserType[];
  total: number;
  skip: number;
  limit: number;
};