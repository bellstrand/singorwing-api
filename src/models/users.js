import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

let users = new mongoose.Schema({
	username: { type: String, unique: true, required: true, lowercase: true, trim: true },
	password: { type: String, required: true, select: false },
	name: { type: String, trim: true },
	email: { type: String, unique: true, trim: true },
	phone: { type: String, trim: true },
	authorities: [{ type: String, trim: true, lowercase: true }]
});

users.statics.hashPassword = password => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, 10, (error, hash) => {
			if(!error) {
				resolve(hash);
			} else {
				reject(error);
			}
		});
	});
}

users.methods.authenticate = function(password) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, this.password, (error, res) => {
	    	if(!error && res) {
				resolve(res);
	    	} else {
	    		reject(error);
	    	}
		});
	});
}

users.methods.hasAuthority = function(authority) {
	return this.authorities.indexOf(authority) !== -1;
}

export default mongoose.model('Users', users);
