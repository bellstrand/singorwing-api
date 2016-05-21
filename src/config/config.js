let argv = require('yargs').argv;

export default {
	port: 8000,

	mongodb: 'mongodb://' + (argv.db || 'localhost') + ':27017/singorwing',

	session: {
		name: 'singorwing-api-session',
		secret: 'singorwing-api-secret'
	},

	storage: 'storage'

}
