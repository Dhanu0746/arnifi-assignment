const Application = require('../models/Application');
const Job = require('../models/Job');

// POST /api/jobs/:id/apply — user only
const applyToJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Check if already applied
        const existing = await Application.findOne({
            job: req.params.id,
            applicant: req.user._id
        });
        if (existing) {
            return res.status(400).json({ message: 'Already applied to this job' });
        }

        const application = await Application.create({
            job: req.params.id,
            applicant: req.user._id
        });

        res.status(201).json({ message: 'Applied successfully', application });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// GET /api/applications — logged in user's applications
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user._id })
            .populate('job', 'companyName position type location');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { applyToJob, getMyApplications };