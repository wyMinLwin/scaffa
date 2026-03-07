import * as products from "./products";
import * as todos from "./todos";
import * as users from "./users";

class API {
	products: typeof products;
	todos: typeof todos;
	users: typeof users;

	constructor() {
		this.products = products;
		this.todos = todos;
		this.users = users;
	}
}

const api = new API();

export default api;
