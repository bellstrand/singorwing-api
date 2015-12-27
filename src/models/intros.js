import mongoose from 'mongoose';

let intros = new mongoose.Schema({
	song: { type: mongoose.Schema.Types.ObjectId, ref: "Songs", required: true },
	videoId: { type: String, required: true, trim: true },
	start: { type: Number, required: true },
	end: { type: Number, required: true },
	chorus: { type: Number, required: true },
	difficulty: { type: Number, required: true, min: 1, max: 10 }
});

export default mongoose.model('Intros', intros);
