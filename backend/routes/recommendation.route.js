const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendation.controller');

router.get('/suggest', recommendationController.getRecommendations);

module.exports = router;
