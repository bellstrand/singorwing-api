import fs from 'fs-extra';
import {Router} from 'express';
import Artists from '../models/artists';
import config from '../config/config';

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
		if(req.body.base64Image) {
			let matches = req.body.base64Image.match(/^data:image\/([A-Za-z]+);base64,(.+)$/),
				filename = req.body.name + '-' + new Date().getTime() + '.' + matches[1];
			saveImage('artists/' + filename, matches[2]);
			req.body.image = 'artists/' + filename;
		}
		Artists.create(req.body).then(artist => {
			res.json(artist);
		}).catch(error => {
			res.send(error);
		});
	});

	api.put('/:id', (req, res) => {
		Artists.findOne({ _id: req.params.id }).then(artist => {
			if(req.body.base64Image) {
				let matches = req.body.base64Image.match(/^data:image\/([A-Za-z]+);base64,(.+)$/),
					filename = req.body.name + '-' + new Date().getTime() + '.' + matches[1];
				removeFile(artist.image);
				saveImage('artists/' + filename, matches[2]);
				artist.image = 'artists/' + filename;
			}
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
		Artists.findByIdAndRemove({ _id: req.params.id }).then(artist => {
			removeFile(artist.image);
			res.json({ message: 'Successfully deleted' });
		}).catch(error => {
			res.send(error);
		});
	});

	return api;
}

function saveImage(filename, data) {
	fs.outputFile(config.storage + '/' + filename, data, 'base64', error => {
		if(error) {
			console.log(error);
		}
	});
}

function removeFile(url) {
	if(url) {
		fs.remove(config.storage + '/' + url, error => {
			if(error) {
				console.log(error);
			}
		});
	}
}
