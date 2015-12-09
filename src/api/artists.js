import {Router} from 'express';
import Artists from '../models/artists';

export default function() {
	let api = Router();

	api.get('', (req, res) => {
		Artists.find().then(artists => {
			res.json(artists);
		}).catch(error => {
			res.send(error);
		});
	});

	api.get('/:id', (req, res) => {
		Artists.findOne({ _id: req.params.id }).then(artist => {
			res.json(artist);
		}).catch(error => {
			res.send(error);
		});
	});

	api.post('', (req, res) => {
		Artists.create(req.body).then(artist => {
			res.json(artist);
		}).catch(error => {
			res.send(error);
		});
	});

	api.put('/:id', (req, res) => {
		Artists.findOne({ _id: req.params.id }).then(artist => {
			for(let prop in req.body) {
				artist[prop] = req.body[prop];
			}
			artist.save().then(() => {
				res.json(artist);
			}).catch(error => {
				res.send(error);
			});
		}).catch(error => {
			res.send(error);
		});
	});

	api.delete('/:id', (req, res) => {
		Artists.remove({ _id: req.params.id }).then(artist => {
			res.json({ message: 'Successfully deleted' });
		}).catch(error => {
			res.send(error);
		});
	});

	return api;
}
