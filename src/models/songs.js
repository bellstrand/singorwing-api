import mongoose from 'mongoose';

let songs = new mongoose.Schema({
	name: { type: String, required: true },
	artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artists" },
	album: String,
	released: String,
	lyrics: String
});

export default mongoose.model('Songs', songs);
