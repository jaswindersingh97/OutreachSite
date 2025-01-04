const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
// Create a transporter using Brevo SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587, // Use 465 for SSL
  secure: false, // True for 465, false for other ports
  auth: {
    user: "jaswinder.4031@gmail.com", // Your Brevo email address
    pass: process.env.PASSWORD_KEY // Your Brevo API key
  }
});
console.log(process.env.LOGIN_KEY,process.env.PASSWORD_KEY)

const sendEmail = async (toEmail, subject, textContent, htmlContent) => {
    try {
      const info = await transporter.sendMail({
        from: '"Jaswinder Singh" <jaswinder.4031@gmail.com>', // Sender's email
        to: toEmail, // Receiver's email
        subject: subject, // Subject of the email
        text: textContent, // Plain-text content
        html: htmlContent, // HTML content
      });
      console.log('Email sent: ', info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  };
  
  module.exports = sendEmail;