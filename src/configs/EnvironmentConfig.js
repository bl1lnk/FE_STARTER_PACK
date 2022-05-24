const dev = {
  API_ENDPOINT_URL: 'https://api.newvegas216.com/api/'
};

const prod = {
  API_ENDPOINT_URL: 'https://api.newvegas216.com/api/'
};

const test = {
  API_ENDPOINT_URL: 'https://api.test.com'
};


export const currency = "TND"
const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		default:
			break;
	}
}

export const env = getEnv()
