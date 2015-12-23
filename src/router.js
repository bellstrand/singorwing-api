import {Router} from 'express';
import {auth, admin, sysadmin} from './middleware/auth';
import login from './api/login';
import users from './api/users';
import artists from './api/artists';
import songs from './api/songs';
import findSongs from './api/find-songs';

export default function() {
	let api = Router();

	api.use('/api/', login());

	api.use('/api/users', sysadmin, users());
	api.use('/api/artists', admin, artists());
	api.use('/api/songs', admin, songs());
	api.use('/api/find-songs', admin, findSongs());

	api.get('/api', (req, res) => {
		res.json({
			version: '0.1'
		});
	});

	return api;
}
