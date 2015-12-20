import mongoose from 'mongoose';

let songs = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	difficulty: { type: Number, required: true, min: 1, max: 10 },
	artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artists", required: true },
	album: { type: String, trim: true },
	genre: { type: String, trim: true, required: true },
	released: { type: Number, required: true },
	lyrics: String
});

export default mongoose.model('Songs', songs);
