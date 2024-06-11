const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/AppointmentBooking");
const moment=require('moment')

// Register Control
const registerControl = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser)
      return res
        .status(200)
        .send({ success: false, message: "User already exist " });

    //We will create a salt of upto 10 rouds by genSalt();
    const salt = await bcrypt.genSalt(10);
    //Adding that salt to the password using hash() and storing it in hashPassword;
    const securePassword = await bcrypt.hash(req.body.password, salt);
    //now ew will use this hashPassword always

    const newUser = await userModel.create({
      name: req.body.name,
      password: securePassword,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    console.log(authToken);
    await newUser.save();
    return res
      .status(201)
      .send({ success: true, message: "Registered uccessfully" + authToken });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in Registering ${error.message} `,
    });
  }
};
// Login Control

const loginControl = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(201)
        .send({ success: false, message: "User not found" });
    }
    //comparing the password of the entered and the user using bycrypt
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(201)
        .send({ success: false, message: "Invalid Password" });
    }

    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // console.log(token)
    res
      .status(200)
      .send({ success: true, message: "Login Successfull", authToken });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error in Login Control ${error.message}` });
  }
};
// Auth Controller
const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }
    res.status(200).send({ success: true, Data: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Auth Failed", error });
  }
};

// Apply Doctor Controller
const applyDoctorController = async (req, res) => {
  try {
    const existingDoctor = await doctorModel.findOne({ email: req.body.email });
    if (existingDoctor) {
      return res
        .status(400)
        .send({ success: false, message: "Doctor already exists" });
    }

    const newDoc = new doctorModel({
      ...req.body,
      status: "pending",
    });

    await newDoc.save();
    //Finding the admin here and pussing the notification of the doctor
    const admin = await userModel.findOne({ isAdmin: true });

    const notification = admin.notification || [];
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoc.firstName} ${newDoc.lastName} has applied for a Doctor Account`,
      data: {
        doctorId: newDoc._id,
        name: `${newDoc.firstName} ${newDoc.lastName}`,
        onClickPath: "/admin/doctors",
      },
    });

    await userModel.findByIdAndUpdate(admin._id, { notification });

    res
      .status(200)
      .send({ success: true, message: "Doctor registered successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        success: false,
        error,
        message: "Error while applying for doctor",
      });
  }
};

// Get Notifications Controller
const getNotificationsController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "Notifications marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Unable to Read", error });
  }
};

// Delete Notifications Controller
const deleteNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    res
      .status(200)
      .send({ success: true, message: "Messages deleted", data: updatedUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Unable to delete", error });
  }
};

//GET ALL Doctors ||GET
const getAllDoctorsController=async (req,res)=>{
try {
  const doctors=await doctorModel.find({status:"approved"})
  res
  .status(200)
  .send({ success: true, message: "Got Doctors", data:doctors });
} catch (error) {
  console.log("Unable to Get Doctors"+ error);
  res
    .status(500)
    .send({ success: false, message: "Unable to Get Doctors", error });
}
}

//Book Appointment
const bookAppointmentController = async (req, res) => {
  try {
    req.body.status = "pending";
    console.log("Time at backend " + req.body.time, "date ", req.body.date);
    req.body.date = moment(req.body.date).toISOString();
    req.body.time = moment(req.body.time).toISOString();

    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();

    res.status(200).send({ status: true, message: "Appointment Booked", success: true });
  } catch (error) {
    console.log("Can't Book Appointment:", error);
    res.status(500).send({ success: false, message: "Can't Book Appointment", error });
  }
};


module.exports = {
  loginControl,
  registerControl,
  authController,
  applyDoctorController,
  getNotificationsController,
  deleteNotificationController,getAllDoctorsController,bookAppointmentController
};
