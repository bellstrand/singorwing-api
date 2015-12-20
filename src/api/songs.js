import {Router} from 'express';
import Songs from '../models/songs';

export default function() {
	let api = Router();

	api.get('', (req, res) => {
		Songs.find().populate('artist').then(songs => {
			res.json(songs);
		}).catch(error => {
			res.send(error);
		});
	});

	api.get('/:id', (req, res) => {
		Songs.findOne({ _id: req.params.id }).then(song => {
			res.json(song);
		}).catch(error => {
			res.send(error);
		});
	});

	api.post('', (req, res) => {
		Songs.create(req.body).then(song => {
			res.json(song);
		}).catch(error => {
			res.send(error);
		});
	});

	api.put('/:id', (req, res) => {
		Songs.findOne({ _id: req.params.id }).then(song => {
			for(let prop in req.body) {
				song[prop] = req.body[prop];
			}
			song.save().then(() => {
				res.json(song);
			}).catch(error => {
				res.send(error);
			});
		}).catch(error => {
			res.send(error);
		});
	});

	api.delete('/:id', (req, res) => {
		Songs.remove({ _id: req.params.id }).then(song => {
			res.json({ message: 'Successfully deleted' });
		}).catch(error => {
			res.send(error);
		});
	});

	return api;
}
