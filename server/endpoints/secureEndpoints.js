const express = require('express');

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Multer configuration

const {uploadCSV, createEmailTemplate, updateEmailTemplate, getEmailTemplates, deleteEmailTemplate} = require("./../controllers/secureController");

const validationMiddleware = require('./../middleware/validationMiddleware');
const sendEmail = require('./../config/transporter')
// Csv upload route
router.post("/upload-csv", upload.single('csv'), uploadCSV);

router.post("/test", (req,res)=>{
    sendEmail("jaswinder.4031@gmail.com","Test Email","This is a test email","<h1>This is a test email</h1>")
    res.send("Email sent");
});
// Template based routes
router.post("/create-email-template",validationMiddleware("createEmailTemplate"), createEmailTemplate);
router.patch("/update-email-template/:templateId",validationMiddleware("updateEmailTemplate"), updateEmailTemplate);
router.get("/get-email-templates",validationMiddleware("getEmailTemplates"), getEmailTemplates);
router.delete("/delete-email-template/:templateId",validationMiddleware("deleteEmailTemplate"), deleteEmailTemplate);

module.exports = router;