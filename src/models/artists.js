import mongoose from 'mongoose';

let artists = new mongoose.Schema({
	name: { type: String, required: true, unique: true, trim: true },
	difficulty: { type: Number, required: true, min: 1, max: 10 },
	genre: { type: String, trim: true, required: true },
	decade: { type: Number, required: true },
	image: { type: String, trim: true },
	language: { type: String, trim: true, required: true },
	members: String,
	biography: String
});

export default mongoose.model('Artists', artists);
