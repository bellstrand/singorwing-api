import passport from 'passport';
import passportLocal from 'passport-local';
import Users from '../models/users';

export default function(app) {
	passport.serializeUser((user, done) => {
		done(null, user.id)
	});

	passport.deserializeUser((id, done) => {
		Users.findOne({ _id: id }, (err, user) => {
			done(err, user)
		});
	});

	passport.use(new passportLocal.Strategy((username, password, done) => {
		Users.findOne({username: username}, (err, user) => {
			if(err) {
				return done(err);
			} else if(!user || !user.authenticate(password)) {
				return done(null, false);
			} else {
				return done(null, user);
			}
		});
	}));

	app.use(passport.initialize());
	app.use(passport.session());
}
