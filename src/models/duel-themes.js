import mongoose from 'mongoose';

let duelThemes = new mongoose.Schema({
	theme: { type: String, required: true, unique: true, trim: true },
	difficulty: { type: Number, required: true, min: 1, max: 10 }
});

export default mongoose.model('DuelThemes', duelThemes);
