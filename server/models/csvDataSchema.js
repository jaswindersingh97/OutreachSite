const mongoose = require('mongoose');

const csvDataSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    templateId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Template',
      required: true 
    },
    fields: [String], 
    data: [{ 
      email: { type: String, required: true, match: /\S+@\S+\.\S+/ },
      record: { type: Object, required: true }, // Flexible field for dynamic data
      status: {
        type: String,
        enum: ['pending', 'sent', 'failed'],
        default: 'pending'
      },
      errorMessage: String 
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

const CsvData = mongoose.model('CsvData', csvDataSchema);

module.exports = CsvData;
