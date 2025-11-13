const express = require('express');
const ProgressController = require('../controllers/progressController');

const router = express.Router();

router.get('/', ProgressController.getSummary);

module.exports = router;
