const mongoose = require("mongoose");
const doctorchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone no is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required "],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required "],
    },
    specialization: {
      type: String,
      required: [true, "Specilization is required "],
    },
    experience: {
      type: String,
      required: [true, "Expreience is required"],
    },
    fessPerConsultation: { 
      type: Number,
      required: [true, "Fees is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "Timming is required"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorchema);
module.exports = doctorModel;
