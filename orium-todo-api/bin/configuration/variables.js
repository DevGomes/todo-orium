const variables = {
    API: {
        port: process.env.port || 3001
    },
    Database: {
		conection: process.env.conection || {
            user: 'postgres',
            password: 'root123',
            host: 'localhost',
            port: 5432,
            database: 'orium'
        }
	},
    Security: {
		rateLimit: {
			window: 20 * 60 * 1000, // ms
			maxRequest: 200,
			message: 'You have exceeded the maximum request limit'
		},
		slowDown: {
			window: 15 * 60 * 1000, // ms
			delayAfter: 100,
			delayMs: 250
		}
	}
};

module.exports = variables;
