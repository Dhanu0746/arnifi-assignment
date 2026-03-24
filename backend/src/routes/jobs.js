const express = require('express');
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { applyToJob } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', protect, getJobs);
router.post('/', protect, adminOnly, createJob);
router.put('/:id', protect, adminOnly, updateJob);
router.delete('/:id', protect, adminOnly, deleteJob);
router.post('/:id/apply', protect, applyToJob);

module.exports = router;