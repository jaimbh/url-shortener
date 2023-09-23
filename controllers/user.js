const service = require('../service/auth');
const User = require('../models/user');

async function handleUserSignup(req, res){
	const {name, email, password} = req.body;
	
	await User.create({
		name,
		email,
		password
	});
	
	return res.redirect('/');
}

async function handleUserLogin(req, res){
	const {email, password} = req.body;
	
	const user = await User.findOne({
		email,
		password
	});
	
	if(!user){
		return res.render('login', {
			error: 'Invalid username or password'
		});
	}
	
	const token = service.setUser(user);
	res.cookie('token', token);
	return res.redirect('/');
	//return res.json({token});
}

module.exports = {
	handleUserSignup,
	handleUserLogin
}
