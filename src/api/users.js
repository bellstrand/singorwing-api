import {Router} from 'express';
import Users from '../models/users';

export default function() {
	let api = Router();

	api.get('', (req, res) => {
		Users.find().then(users => {
			res.json(users);
		}).catch(error => {
			res.send(error);
		});
	});

	api.get('/:id', (req, res) => {
		Users.findOne({ _id: req.params.id }).then(user => {
			res.json(user);
		}).catch(error => {
			res.send(error);
		});
	});

	api.post('', (req, res) => {
		Users.create(req.body).then(user => {
			res.json(user);
		}).catch(error => {
			res.send(error);
		});
	});

	api.put('/:id', (req, res) => {
		Users.findOne({ _id: req.params.id }).then(user => {
			for(let prop in req.body) {
				user[prop] = req.body[prop];
			}
			user.save().then(() => {
				res.json(user);
			}).catch(error => {
				res.send(error);
			});
		}).catch(error => {
			res.send(error);
		});
	});

	api.delete('/:id', (req, res) => {
		Users.remove({ _id: req.params.id }).then(user => {
			res.json({ message: 'Successfully deleted' });
		}).catch(error => {
			res.send(error);
		});
	});

	return api;
}
