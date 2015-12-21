import {Router} from 'express';
import Users from '../models/users';
import bcrypt from 'bcryptjs'

export default function() {
	let api = Router();

	api.get('', (req, res) => {
		Users.find().sort('username').then(users => {
			res.json(users);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.get('/:id', (req, res) => {
		Users.findOne({ _id: req.params.id }).then(user => {
			res.json(user);
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.post('', (req, res) => {
		Users.hashPassword(req.body.password).then(hash => {
			req.body.password = hash;
			Users.create(req.body).then(user => {
				res.json(user);
			}).catch(error => {
				res.status(500).send(error);
			});
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	api.put('/:id', (req, res) => {
		if(req.body.password) {
			Users.hashPassword(req.body.password).then(hash => {
				req.body.password = hash;
				update(req, res);
			}).catch(error => {
				res.status(500).send(error);
			});
		} else {
			delete req.body.password;
			update(req, res);
		}
	});

	api.delete('/:id', (req, res) => {
		Users.remove({ _id: req.params.id }).then(user => {
			res.json({ message: 'Successfully deleted' });
		}).catch(error => {
			res.status(500).send(error);
		});
	});

	return api;
}

function update(req, res) {
	Users.findOne({ _id: req.params.id }).then(user => {
		for(let prop in req.body) {
			user[prop] = req.body[prop];
		}
		user.save().then(() => {
			res.json(user);
		}).catch(error => {
			res.status(500).send(error);
		});
	}).catch(error => {
		res.status(500).send(error);
	});
}
