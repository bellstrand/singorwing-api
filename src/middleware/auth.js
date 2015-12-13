export function auth(req, res, next) {
	if(req.user) {
		return next();
	} else {
		res.status(401).send('Unauthorized');
	}
}

export function admin(req, res, next) {
	if(req.user && req.user.hasAuthority('admin')){
		return next();
	} else {
		res.status(403).send('Forbidden');
	}
}

export function sysadmin(req, res, next) {
	if(req.user && req.user.hasAuthority('sysadmin')){
		return next();
	} else {
		res.status(403).send('Forbidden');
	}
}
