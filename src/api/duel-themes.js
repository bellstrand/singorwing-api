import {Router} from 'express';
import DuelThemes from '../models/duel-themes';

export default function() {
	let api = Router();

	api.get('', (req, res) => {
		DuelThemes.find().sort('theme').then(data => {
			res.json(data);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.get('/:id', (req, res) => {
		DuelThemes.findOne({ _id: req.params.id }).then(data => {
			res.json(data);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.post('', (req, res) => {
		DuelThemes.create(req.body).then(data => {
			res.json(data);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.put('/:id', (req, res) => {
		DuelThemes.findOne({ _id: req.params.id }).then(data => {
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
		DuelThemes.remove({ _id: req.params.id }).then(data => {
			res.json({ message: 'Successfully deleted' });
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	return api;
}
