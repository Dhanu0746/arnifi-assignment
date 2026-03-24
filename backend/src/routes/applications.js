const express = require('express');
const { getMyApplications } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getMyApplications);

module.exports = router;