const express = require('express');
const controllers = require('../controllers/user')
const router = express.Router();

router.post('/', controllers.handleUserSignup);
router.post('/login', controllers.handleUserLogin);

module.exports = router;