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
    res
      .status(200)
      .send({ success: true, message: "Doctors Data", data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error fetching Doctors" });
  }
};
module.exports = {
  getAllUsers,
  getAllDoctors,
};
