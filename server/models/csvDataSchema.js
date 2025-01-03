const mongoose = require('mongoose');

const csvDataSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Assumes you have a User model
      required: true 
    },
    templateId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Template', // If you're using templates, reference it here
      required: true 
    },
    fields: [String], // Stores dynamic field names from CSV
    data: [{ // Array of records from the CSV file
      email: { type: String, required: true, match: /\S+@\S+\.\S+/ }, // Email field, required and validated
      // other dynamic fields based on the CSV file
    }],
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  {
    timestamps: true,
  }
);

const CsvData = mongoose.model('CsvData', csvDataSchema);

module.exports = CsvData;
