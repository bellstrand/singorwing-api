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
		Users.findOne({username: username}).select('password').then(user => {
			if(user) {
				user.authenticate(password).then(() => {
					return done(null, user);
				}).catch(error => {
					return done(error);
				});
			} else {
				return done(null, false);
			}
		}).catch(error => {
			return done(error);
		});
	}));

	app.use(passport.initialize());
	app.use(passport.session());
}
