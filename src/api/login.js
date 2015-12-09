import {Router} from 'express';
import passport from 'passport';

export default function() {
	let api = Router();

	api.post('/login', passport.authenticate('local'), (req, res) => {
		res.json({success: true});
	});

	return api;
}
