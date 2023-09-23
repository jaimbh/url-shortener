const express = require('express');
const controllers = require('../controllers/url');
const router = express.Router();

router.post('/', controllers.generateShortURL);
router.get('/analytics/:shortId', controllers.getAnalytics);

module.exports = router;