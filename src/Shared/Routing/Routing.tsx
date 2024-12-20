export const baseUrl = "";

export const Routing = {
	Login: {
		path: () => `${baseUrl}/login`,
	},
	Register: {
		path: () => `${baseUrl}/register`,
	},
	Dashboard: {
		path: () => `${baseUrl}/dashboard`,
	},
	Post: {
		route: `${baseUrl}/post/:id`,
		path: (id: number) => {
			return `${baseUrl}/post/${id}`;
		},
	},
};
