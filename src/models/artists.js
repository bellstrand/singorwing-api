import mongoose from 'mongoose';

let artists = new mongoose.Schema({
	name: { type: String, required: true },
	genres: [String],
	origin: String,
	active: String,
	images: [String]
});

export default mongoose.model('Artists', artists);
