import mongoose from 'mongoose';

let users = new mongoose.Schema({
	username: { type: String, unique: true, required: true, lowercase: true, trim: true },
	password: { type: String, required: true },
	name: String,
	email: String,
	phone: String,
	authorities: [String]
});

users.methods.authenticate = function(password) {
	return this.password === password;
}

users.methods.hasAuthority = function(authority) {
	return this.authorities.indexOf(authority) !== -1;
}

export default mongoose.model('Users', users);
