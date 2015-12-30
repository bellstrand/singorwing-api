import {Router} from 'express';
import Songs from '../models/songs';

export default function() {
	let api = Router();

	api.get('', (req, res) => {
		Songs.find().populate('artist').sort('name').then(songs => {
			res.json(songs);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.get('/intros', (req, res) => {
		Songs.find({ intro: { $ne: null } }).populate('artist').sort('name').then(songs => {
			res.json(songs);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.get('/distortions', (req, res) => {
		Songs.find({ distortions: { $ne: [] } }).populate('artist').sort('name').then(songs => {
			res.json(songs);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.get('/find-songs', (req, res) => {
		Songs.find({ findSongs: { $ne: [] } }).populate('artist').sort('name').then(songs => {
			res.json(songs);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.get('/:id', (req, res) => {
		Songs.findOne({ _id: req.params.id }).then(song => {
			res.json(song);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.post('', (req, res) => {
		Songs.create(req.body).then(song => {
			res.json(song);
		}).catch(error => {
			res.status(500).send(error);
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
				res.status(500).send(error);
			});
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.delete('/:id', (req, res) => {
		Songs.remove({ _id: req.params.id }).then(song => {
			res.json({ message: 'Successfully deleted' });
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	return api;
}
