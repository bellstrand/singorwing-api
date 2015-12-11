import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './router';
import passport from './middleware/passport';
import config from './config/config';

let app = express();

mongoose.connect(config.mongodb);
mongoose.Promise = global.Promise;

app.use(session({
	secret: config.session.secret,
	name: config.session.name,
	resave: false,
	rolling: true,
	saveUninitialized: false
}));

passport(app);

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router());

app.use('/images', express.static('images'));

app.set('port', config.port);

app.server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.server.address().port);
});

export default app;
