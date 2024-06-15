const appointmentModel = require("../models/AppointmentBooking");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const { sendAppointmentApprovedEmail, sendAppointmentRejectedEmail } = require('./emailsController');
const moment = require('moment');
require('dotenv').config();

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({ success: true, message: "Doctor data fetched successfully", Docdata: doctor });
  } catch (error) {
    console.error("Error fetching doctor details: ", error);
    res.status(500).send({ success: false, message: "Error in fetching doctor details", error });
  }
};

const updateDocProfile = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body, { new: true });
    res.status(200).send({ success: true, message: "Updated successfully", Docdata: doctor });
  } catch (error) {
    console.error("Error updating doctor profile: ", error);
    res.status(500).send({ success: false, message: "Unable to update", error });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({ success: true, message: "Got the doctor", data: doctor });
  } catch (error) {
    console.error("Error getting doctor by ID: ", error);
    res.status(500).send({ success: false, message: "Unable to get the doctor", error });
  }
};

const docAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({ doctorId: doctor._id });
    res.status(200).send({ success: true, message: "Doctor Appointments Fetched Successfully", data: appointments });
  } catch (error) {
    console.error("Error fetching doctor appointments: ", error);
    res.status(500).send({ success: false, message: "Unable to get the Doctor Appointments", error });
  }
};

const appointmentStatusController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    if (!appointmentId || !status) {
      console.error("Appointment ID or status missing in request body");
      return res.status(400).send({ success: false, message: "Appointment ID and status are required" });
    }

    const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, { status }, { new: true });

    if (!appointment) {
      console.error("Appointment not found");
      return res.status(404).send({ success: false, message: "Appointment not found" });
    }

    const user = await userModel.findById(appointment.userId);
    if (!user) {
      console.error("User not found");
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const doctor = await doctorModel.findById(appointment.doctorId);
    if (!doctor) {
      console.error("Doctor not found");
      return res.status(404).send({ success: false, message: "Doctor not found" });
    }

    // Update user notifications
    const notification = user.notification || [];
    notification.push({
      type: "Status-UPDATED",
      message: `Your appointment has been updated to ${status}`,
      onClickPath: "/doctor-appointments",
    });
    user.notification = notification;
    await user.save();

    // Log before sending email
    console.log(`Sending email to: ${user.email}`);

    // Send email notification based on the status
    try {
      if (status === 'approve') {
        sendAppointmentApprovedEmail(user, doctor, appointment);
      } else if (status === 'reject') {
        sendAppointmentRejectedEmail(user, doctor);
      }
    } catch (emailError) {
      console.error("Error sending email: ", emailError);
    }

    res.status(200).send({ success: true, message: "Appointment status updated" });
  } catch (error) {
    console.error("Error in appointmentStatusController: ", error.message);
    res.status(500).send({ success: false, message: "Unable to change Appointment status", error: error.message });
  }
};

module.exports = {
  getDoctorInfoController,
  updateDocProfile,
  getDoctorById,
  docAppointmentsController,
  appointmentStatusController
};
