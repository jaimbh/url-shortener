const express = require('express');
const middleware = require('../middlewares/auth');
const router = express.Router();
const URL = require('../models/url');

router.get('/admin/urls', middleware.restrictTo(['ADMIN']), async (req, res)=>{	
	const allurls = await URL.find({});
	
	return res.render('home', {
		urls: allurls
	});
})

router.get('/', middleware.restrictTo(['NORMAL', 'ADMIN']), async (req, res)=>{	
	const allurls = await URL.find({createdBy: req.user._id});
	
	return res.render('home', {
		urls: allurls
	});
})

router.get('/signup', (req, res)=>{
	return res.render('signup');
})

router.get('/login', (req, res)=>{
	return res.render('login');
})

module.exports = router;