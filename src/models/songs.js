import mongoose from 'mongoose';

let songs = new mongoose.Schema({
	name: { type: String, required: true },
	released: String,
	lyrics: String,
	artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artists" }
});

export default mongoose.model('Songs', songs);
