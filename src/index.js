import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import cors from 'cors';
import router from './router';
import passport from './middleware/passport';
import config from './config/config';

let app = express(),
	MongoStore = connectMongo(session);

mongoose.connect(config.mongodb);
mongoose.Promise = global.Promise;

app.use(session({
	secret: config.session.secret,
	name: config.session.name,
	resave: false,
	rolling: true,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

passport(app);

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(router());

app.use('/' + config.storage, express.static('images'));

app.set('port', config.port);

app.server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.server.address().port);
});

export default app;
