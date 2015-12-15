import mongoose from 'mongoose';

let artists = new mongoose.Schema({
	name: { type: String, required: true },
	genre: String,
	decade: String,
	origin: String,
	image: String,
	language: String,
	members: String,
	biography: String
});

export default mongoose.model('Artists', artists);
