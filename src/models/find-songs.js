import mongoose from 'mongoose';

let findSongs = new mongoose.Schema({
	song: { type: mongoose.Schema.Types.ObjectId, ref: "Songs", required: true },
	phrase: { type: String, required: true, trim: true },
	difficulty: { type: Number, required: true, min: 1, max: 10 }
});

export default mongoose.model('FindSongs', findSongs);
