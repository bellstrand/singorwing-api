import mongoose from 'mongoose';

let songs = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	difficulty: { type: Number, required: true, min: 1, max: 10 },
	artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artists", required: true },
	album: { type: String, trim: true },
	released: Number,
	lyrics: String,
	genre: String
});

export default mongoose.model('Songs', songs);
