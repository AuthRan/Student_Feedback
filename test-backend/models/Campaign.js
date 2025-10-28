const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  targetDepartment: {
    type: String,
    required: true,
  },
  targetYear: {
    type: String, // Using String to accommodate values like "3rd" or "Final"
    required: true,
  },
  questions: [{
    type: String,
    required: true,
  }],
  status: {
    type: String,
    enum: ['draft', 'open', 'closed'],
    default: 'draft',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute', // This links the campaign to the institute that created it
    required: true,
  },
  deadline: {
    type: Date,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Campaign', CampaignSchema);
