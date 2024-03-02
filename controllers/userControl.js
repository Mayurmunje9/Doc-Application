const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerControl = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser)
      return res
        .status(200)
        .send({ success: false, message: "User already exist " });

    const password = req.body.password;
    //We will create a salt of upto 10 rouds by genSalt();
    const salt = await bcrypt.genSalt(10);
    //Adding that salt to the password using hash() and storing it in hashPassword;
    const hashPassword = await bcrypt.hash(password, salt);
    //now ew will use this hashPassword always
    req.body.password = hashPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ success: true, message: "Registered uccessfully" });
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({ success: true, message: "Login Successfull" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error in Login Control ${error.message}` });
  }
};
module.exports = { loginControl, registerControl };
