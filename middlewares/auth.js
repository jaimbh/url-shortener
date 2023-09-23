const service = require('../service/auth');

function checkForAuthentication(req, res, next){
	const token = req.cookies?.token;
	req.user = null;
	
	if(!token){
		return next();
	}
	
	const user = service.getUser(token);
	
	req.user = user;
	next();
}

function restrictTo(roles){
	return function(req, res, next){
		if(!req.user) return res.redirect('/login');
		
		if(!roles.includes(req.user.role)) return res.end('Unauthorized');
		
		next();
	}
}

module.exports = {
	checkForAuthentication,
	restrictTo
}