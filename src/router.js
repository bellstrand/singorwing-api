import {Router} from 'express';
import {auth, admin, sysadmin} from './middleware/auth';
import login from './api/login';
import games from './api/games';
import users from './api/users';
import artists from './api/artists';
import songs from './api/songs';
import findSongs from './api/find-songs';
import duelThemes from './api/duel-themes';
import intros from './api/intros';

export default function() {
	let api = Router();

	api.use('/api/', login());

	api.use('/api', admin, games());
	api.use('/api/users', sysadmin, users());
	api.use('/api/artists', admin, artists());
	api.use('/api/songs', admin, songs());
	api.use('/api/find-songs', admin, findSongs());
	api.use('/api/duel-themes', admin, duelThemes());
	api.use('/api/intros', admin, intros());

	api.get('/api', (req, res) => {
		res.json({
			version: '0.1'
		});
	});

	return api;
}
