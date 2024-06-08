const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({ success: true, message: "Users Data", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error fetching users" });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({ success: true, message: "Doctors Data", data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error fetching Doctors" });
  }
};

// Doctor Account status
const changeAccountStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });

    if (!doctor) {
      return res.status(404).send({ success: false, message: "Doctor not found" });
    }

    const user = await userModel.findOne({ _id: doctor.userId });
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const notification = user.notification || [];
    notification.push({
      type: "Account-req-updated",
      message: `Your account request has been ${status}`,
      onClickPath: '/notification',
    });

    user.isdoctor = status === 'approved'?true:false;
    user.notification = notification;
    await user.save();

    res.status(201).send({ success: true, message: "Account status Updated", data: doctor });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in account status update" });
  }
};

module.exports = {
  getAllUsers,
  getAllDoctors,
  changeAccountStatus,
};
