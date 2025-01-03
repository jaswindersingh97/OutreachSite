const express = require('express');

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Multer configuration

const {uploadCSV} = require("./../controllers/secureController");

router.post("/upload-csv", upload.single('csv'), uploadCSV);

module.exports = router;