// emailConfig.js
const nodemailer = require('nodemailer');
const dotenv=require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another email provider
  auth: {
    user: process.env.EMAILID, // replace with your email
    pass: process.env.EMAIL_PASSWORD, // replace with your email password
  },
});
transporter.verify(function(error, success) {
    if (error) {
      console.error('Error with transporter setup:', error);
    } else {
      console.log('Transporter is ready to send emails');
    }
  });

module.exports = transporter;
