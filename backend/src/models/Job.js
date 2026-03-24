const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
        trim: true
    },
    type: {
        type: String,
        enum: ['Full Time', 'Part Time'],
        required: [true, 'Job type is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);