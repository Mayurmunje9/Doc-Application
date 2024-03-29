const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const doctorModel = require("../models/doctorModel");
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

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    // user.password=undefined
    if (!user) {
      console.log(error);
      res
        .status(201)
        .send({ success: false, message: "User Not Found", error });
    } else {
      res.status(200).send({
        success: true,
        Data: user,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(201)
      .send({ success: false, message: "Auth Failed", error });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const existingDoctor = await doctorModel.findOne({ email: req.body.email });
    if (existingDoctor) {
      return res.status(400).send({ success: false, message: "Doctor already exists" });
    }

    const newDoc = new doctorModel({
      ...req.body,
      status: "pending",
    });
    
    await newDoc.save();

    const admin = await userModel.findOne({ isAdmin: true });

    const notification = admin.notification || [];
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoc.firstName} ${newDoc.lastName} has applied for a Doctor Account`,
      data: {
        doctorId: newDoc._id,
        name: newDoc.firstName + " " + newDoc.lastName,
        onClickPath: "/admin/doctors",
      },
    });

    await userModel.findByIdAndUpdate(admin._id, { notification });

    res.status(200).send({ success: true, message: "Doctor registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error, message: "Error while applying for doctor" });
  }
};

//Notifications Controller
const getNotificationsController=async(req,res)=>{
try {
  const user=await userModel.findOne({_id:req.body.userId})
  const  seenNotification=user.seenNotification;
  const notification=user.notification;
  seenNotification.push(...notification);
  user.notification=[];
  user.seenNotification=notification;
  const updatedUser=await user.save()
  res.status(200).send({
    success:true,message:"Notifications marked as read", data:updatedUser
  })
} catch (error) {
  console.log(error)
  res.status(500).send({success:false,message:"Unable to Read",error})
}

//Deete Notofication
const deleteNotificationsController = async () => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    res.status(200).send({ success: true, message: "Messages deleted", data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Unable to delete", error });
  }
};
}

module.exports = {
  loginControl,
  registerControl,
  authController,
  applyDoctorController,
  getNotificationsController,
  deleteNotificationsController
};
