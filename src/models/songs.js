import mongoose from 'mongoose';

let songs = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	difficulty: { type: Number, required: true, min: 1, max: 10 },
	artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artists", required: true },
	album: { type: String, trim: true },
	genre: { type: String, trim: true, required: true },
	released: { type: Number, required: true },
	lyrics: String,

	distortions: [{
		distortion: { type: String, required: true, trim: true },
		difficulty: { type: Number, required: true, min: 1, max: 10 }
	}],

	findSongs: [{
		phrase: { type: String, required: true, trim: true },
		difficulty: { type: Number, required: true, min: 1, max: 10 }
	}],

	intro: {
		videoId: { type: String, trim: true },
		start: { type: Number },
		end: { type: Number },
		chorus: { type: Number },
		difficulty: { type: Number, min: 1, max: 10 }
	}
});

export default mongoose.model('Songs', songs);
