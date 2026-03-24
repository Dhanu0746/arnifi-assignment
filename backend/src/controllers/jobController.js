const Job = require('../models/Job');

// GET /api/jobs — all users & admins
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('postedBy', 'name email');
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// POST /api/jobs — admin only
const createJob = async (req, res) => {
    const { companyName, position, type, location } = req.body;
    try {
        const job = await Job.create({
            companyName,
            position,
            type,
            location,
            postedBy: req.user._id
        });
        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// PUT /api/jobs/:id — admin only (own jobs)
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Only the admin who posted it can edit
        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to edit this job' });
        }

        const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// DELETE /api/jobs/:id — admin only (own jobs)
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this job' });
        }

        await job.deleteOne();
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { getJobs, createJob, updateJob, deleteJob };