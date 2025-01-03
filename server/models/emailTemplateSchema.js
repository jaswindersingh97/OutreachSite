const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  textBody: {
    type: String,
    required: true,  // Plain text version of the email body
  },
  htmlBody: {
    type: String,
    required: true,  // HTML version of the body for formatted content
  },
  placeholders: {
    type: [String],
    default: [],  // List of placeholders used in the template (e.g., {first_name})
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);

module.exports = EmailTemplate;
