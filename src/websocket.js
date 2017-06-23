import ws from 'ws';

let wss;

export function create(server, sessionParser) {
	wss = new ws.Server({ server: server, path: '/api/websocket' });
	wss.on('connection', ws => {
		sessionParser(ws.upgradeReq, {}, () => {
			ws.session = ws.upgradeReq.session;
			ws.sessionID = ws.upgradeReq.sessionID;
		});
	});
};

export function send(req, action) {
	wss.clients.forEach(client => {
		if(req.user._id.toString() === client.session.passport.user && req.sessionID !== client.sessionID) {
			client.send(action);
		}
	});
}
