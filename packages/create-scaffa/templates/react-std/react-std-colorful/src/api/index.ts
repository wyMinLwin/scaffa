import * as products from "./products";
import * as todos from "./todos";
class API {
	products: typeof products;
	todos: typeof todos;

	constructor() {
		this.products = products;
		this.todos = todos;
	}
}

const api = new API();

export default api;
