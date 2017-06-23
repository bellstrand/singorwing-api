import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import cors from 'cors';
import router from './router';
import passport from './middleware/passport';
import config from './config/config';
import * as websocket from './websocket';

let server, wss,
	app = express(),
	MongoStore = connectMongo(session),
	sessionParser = session({
		secret: config.session.secret,
		name: config.session.name,
		resave: false,
		rolling: true,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	});

mongoose.connect(config.mongodb);
mongoose.Promise = global.Promise;

app.use(sessionParser);

passport(app);

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(router());

app.use('/images', express.static(__dirname + '/../' + config.storage));

app.set('port', config.port);

server = http.createServer(app);

wss = websocket.create(server, sessionParser);

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});

export default app;
