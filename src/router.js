import {Router} from 'express';
import {auth, admin, sysadmin} from './middleware/auth';
import login from './api/login';
import users from './api/users';
import artists from './api/artists';
import songs from './api/songs';


export default function() {
	let api = Router();

	api.use('/', login());

	api.use('/users', sysadmin, users());
	api.use('/artists', admin, artists());
	api.use('/songs', admin, songs());

	api.get('/', (req, res) => {
		res.json({
			version: '0.1'
		});
	});

	return api;
}
