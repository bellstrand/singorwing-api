import {Router} from 'express';
import Artists from '../models/artists';
import DuelThemes from '../models/duel-themes';
import FindSongs from '../models/find-songs';
import Intros from '../models/intros';
import Songs from '../models/songs';

export default function() {
	let api = Router();

	api.get('/start', (req, res) => {
		let promisses = [],
			games = {};

		promisses.push(Artists.find().distinct('_id').then(artists => {
			games.artists = {
				current: 0,
				list: artists
			};
		}).catch(() => {}));

		promisses.push(DuelThemes.find().distinct('_id').then(duelThemes => {
			games.duelThemes = {
				current: 0,
				list: duelThemes
			};
		}).catch(() => {}));

		promisses.push(FindSongs.find().distinct('_id').then(findSongs => {
			games.findSongs = {
				current: 0,
				list: findSongs
			};
		}).catch(() => {}));

		promisses.push(Intros.find().distinct('_id').then(intros => {
			games.intros = {
				current: 0,
				list: intros
			};
		}).catch(() => {}));

		promisses.push(Songs.find().distinct('_id').then(songs => {
			games.songs = {
				current: 0,
				songs: songs
			};
		}).catch(() => {}));

		Promise.all(promisses).then(() => {
			req.session.games = games;
			res.json({ success: true });
		}).catch(() => {})
	});

	api.get('/reset', (req, res) => {
		res.json({ success: true });
	})

	return api;
}
