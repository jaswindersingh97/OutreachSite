const express = require('express');

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Multer configuration

const {uploadCSV} = require("./../controllers/secureController");

const validationMiddleware = require('./../middleware/validationMiddleware');

// Csv upload route
router.post("/upload-csv", upload.single('csv'), uploadCSV);

// Template based routes
router.post("/create-email-template",validationMiddleware("createEmailTemplate"), createEmailTemplate);
router.patch("/update-email-template/:templateId",validationMiddleware("updateEmailTemplate"), updateEmailTemplate);
router.get("/get-email-templates",validationMiddleware("getEmailTemplates"), getEmailTemplates);
router.delete("/delete-email-template/:templateId",validationMiddleware("deleteEmailTemplate"), deleteEmailTemplate);

module.exports = router;