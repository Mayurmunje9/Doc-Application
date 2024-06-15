const transporter = require('../config/emailConfig');
const moment = require('moment'); // Ensure moment is imported here as well

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const sendAppointmentApprovedEmail = (user, doctor, appointment) => {
  const subject = 'Appointment Confirmed';
  const text = `Dear ${user.name},\n\nYour appointment with Dr. ${doctor.firstName} ${doctor.lastName} has been confirmed.\n\nDate: ${moment(appointment.date).format("DD-MM-YYYY")}\nTime: ${moment(appointment.time).format("HH:mm")}\n\nThank you for using our service.\n\nBest regards,\nYour Clinic`;

  sendEmail(user.email, subject, text);
};

const sendAppointmentRejectedEmail = (user, doctor) => {
  const subject = 'Appointment Rejected';
  const text = `Dear ${user.name},\n\nWe regret to inform you that your appointment with Dr. ${doctor.firstName} ${doctor.lastName} has been rejected.\n\nThank you for using our service.\n\nBest regards,\nYour Clinic`;

  sendEmail(user.email, subject, text);
};

module.exports = {
  sendAppointmentApprovedEmail,
  sendAppointmentRejectedEmail,
};
