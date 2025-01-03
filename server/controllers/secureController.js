const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Controller function to handle CSV upload and parsing
const uploadCSV = (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, '../uploads', file.filename);
  const results = [];

  // Parse the CSV file using csv-parser
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      results.push(row); // Each row is an object, push it to results array
    })
    .on('end', () => {
      // Here you can process the parsed data (e.g., save to database)
      console.log(results);

      // Clean up the uploaded file after processing
      fs.unlinkSync(filePath);  // Delete the file after use

      return res.status(200).send('CSV file uploaded and parsed successfully!');
    })
    .on('error', (err) => {
      console.error('Error parsing CSV:', err);
      return res.status(500).send('Error processing the CSV file.');
    });
};

module.exports = {
  uploadCSV,
};
