import * as test from "./test";

class API {
	test: typeof test;

	constructor() {
		this.test = test;
	}
}

const api = new API();

export default api;
