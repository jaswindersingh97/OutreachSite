const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const asynHandler = require('./../utils/asyncHandler');
const CsvData = require('./../models/csvDataSchema');  // Import the CSV model
// const User = require('./../models/UserModel'); // Assuming you have a User model
const Template = require('./../models/emailTemplateSchema'); // Assuming you have a Template model
const asyncHandler = require('./../utils/asyncHandler');

const saveCSVData = async (userId, templateId, parsedData, fields) => {
  const csvData = new CsvData({
      userId,
      templateId,
      fields,
      data: parsedData,
  });

  await csvData.save();
  return csvData;  
};

const uploadCSV = async (req, res) => {
  const file = req.file;
  const { templateId } = req.body;
  const {userId} = req.user;  

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const template = await Template.findById(templateId);
  if (!template) {
    return res.status(400).send('Invalid template ID');
  }

  const filePath = path.join(__dirname, '../uploads', file.filename);
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      results.push(row); 
    })
    .on('end', async () => {
      const fields = Object.keys(results[0]);

      await saveCSVData(userId, templateId, results, fields);
    })
    .on('error', (err) => {
      console.error('Error parsing CSV:', err);
      return res.status(500).send('Error processing the CSV file.');
    });
};

// Create a new email template
const createEmailTemplate = async (req, res) => {
    const { subject, textBody, htmlBody, placeholders } = req.body;
    const {userId} = req.user; 

    const newTemplate = new Template({
      userId,
      subject,
      textBody,
      htmlBody,
      placeholders: placeholders || [],
    });

    await newTemplate.save();
    return res.status(201).json({ message: 'Email template created successfully!', template: newTemplate });
};

// Update an existing email template
const updateEmailTemplate = async (req, res) => {
    const {templateId} = req.params;
    const { subject, textBody, htmlBody, placeholders } = req.body;

    const updatedTemplate = await Template.findByIdAndUpdate(
      templateId,
      {
        subject,
        textBody,
        htmlBody,
        placeholders: placeholders || [],
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedTemplate) {
      return res.status(404).send('Template not found.');
    }
    return res.status(200).json({ message: 'Email template updated successfully!', template: updatedTemplate });
};

// Get all email templates for a user
const getEmailTemplates = async (req, res) => {
    const {userId} = req.user;
    const templates = await Template.find({ userId });

    if (templates.length === 0) {
      return res.status(404).send('No templates found.');
    }

    return res.status(200).json(templates);
};

// Delete an email template
const deleteEmailTemplate = async (req, res) => {
    const {templateId} = req.params;
    const deletedTemplate = await Template.findByIdAndDelete(templateId);

    if (!deletedTemplate) {
      return res.status(404).send('Template not found.');
    }

    return res.status(200).json({ message: 'Email template deleted successfully!' });
};

module.exports = {
  uploadCSV:asynHandler(uploadCSV),
  createEmailTemplate:asyncHandler(createEmailTemplate),
  updateEmailTemplate:asyncHandler(updateEmailTemplate),
  getEmailTemplates:  asyncHandler(getEmailTemplates),
  deleteEmailTemplate: asyncHandler(deleteEmailTemplate),

};
