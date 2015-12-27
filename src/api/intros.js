import {Router} from 'express';
import Intros from '../models/intros';

export default function() {
	let api = Router();

	api.get('', (req, res) => {
		Intros.find().populate('song').then(intros => {
			res.json(intros);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.get('/:id', (req, res) => {
		Intros.findOne({ _id: req.params.id }).then(intro => {
			res.json(intro);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.post('', (req, res) => {
		Intros.create(req.body).then(intro => {
			res.json(intro);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.put('/:id', (req, res) => {
		Intros.findOne({ _id: req.params.id }).then(intro => {
			for(let prop in req.body) {
				intro[prop] = req.body[prop];
			}
			intro.save().then(() => {
				res.json(intro);
			}).catch(error => {
				res.status(500).send(error);
			});
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.delete('/:id', (req, res) => {
		Intros.remove({ _id: req.params.id }).then(intro => {
			res.json({ message: 'Successfully deleted' });
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	return api;
}
