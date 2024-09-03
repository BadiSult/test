class Api {
	constructor() {
		 
	}

	/**
	 * Заполняет строковый шаблон template данными из объекта object
	 *
	 * @author		Sultanov Badrudin
	 * @version		v.1.0 (03/09/2024)
	 * @param		{object} object
	 * @param		{string} template
	 * @return		{string}
	 */
	get_api_path(object, template) {
		let result = template;

		 
		for (let key in object) {
			if (object.hasOwnProperty(key)) {
				let regex = new RegExp(`%${key}%`, 'g');
				result = result.replace(regex, encodeURIComponent(object[key]));
			}
		}

		return result;
	}
}

let user = {
	id: 20,
	name: 'John Dow',
	role: 'QA',
	salary: 100
};

let api_path_templates = [
	"/api/items/%id%/%name%",
	"/api/items/%id%/%role%",
	"/api/items/%id%/%salary%"
];

let api = new Api();

let api_paths = api_path_templates.map((api_path_template) => {
	return api.get_api_path(user, api_path_template);
});

console.log(JSON.stringify(api_paths));
 
let expected_result = ["/api/items/20/John%20Dow", "/api/items/20/QA", "/api/items/20/100"];
console.log(JSON.stringify(expected_result) === JSON.stringify(api_paths));  