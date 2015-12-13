import mongoose from 'mongoose';

let artists = new mongoose.Schema({
	name: { type: String, required: true },
	genre: String,
	origin: String,
	active: String,
	image: String
});

export default mongoose.model('Artists', artists);
