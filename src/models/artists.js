import mongoose from 'mongoose';

let artists = new mongoose.Schema({
	name: { type: String, required: true, unique: true, trim: true },
	difficulty: { type: Number, required: true, min: 1, max: 10 },
	genre: String,
	decade: Number,
	image: String,
	language: String,
	members: String,
	biography: String
});

export default mongoose.model('Artists', artists);
