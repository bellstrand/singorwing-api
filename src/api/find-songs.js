import {Router} from 'express';
import FindSongs from '../models/find-songs';

export default function() {
	let api = Router();

	api.get('', (req, res) => {
		FindSongs.find().populate('song').then(data => {
			res.json(data);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.get('/:id', (req, res) => {
		FindSongs.findOne({ _id: req.params.id }).then(data => {
			res.json(data);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.post('', (req, res) => {
		FindSongs.create(req.body).then(data => {
			res.json(data);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.put('/:id', (req, res) => {
		FindSongs.findOne({ _id: req.params.id }).then(data => {
			for(let prop in req.body) {
				data[prop] = req.body[prop];
			}
			data.save().then(() => {
				res.json(data);
			}).catch(error => {
				res.status(500).send(error);
			});
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.delete('/:id', (req, res) => {
		FindSongs.remove({ _id: req.params.id }).then(data => {
			res.json({ message: 'Successfully deleted' });
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	return api;
}
