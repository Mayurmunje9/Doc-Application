const appointmentModel = require("../models/AppointmentBooking");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({ success: true, message: "Doctor data fetched successfully", Docdata: doctor });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in fetching doctor details", error });
  }
};

const updateDocProfile = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body, { new: true });
    res.status(200).send({ success: true, message: "Updated successfully", Docdata: doctor });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Unable to update", error });
  }
};

const getDoctorById =async(req,res)=>{
  try {
    const doctor=await doctorModel.findOne({_id:req.body.doctorId})
 
    res.status(200).send({ success: true, message: "Got the doctor", data:doctor });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Unable to get the doctor ", error });
  }
}

//Get appointments
const docAppointmentsController=async(req,res)=>{
  try {
    const doctor=await doctorModel.findOne({userId:req.body.userId})
    const appointments=await appointmentModel.find({doctorId:doctor._id})
    res.status(200).send({ success: true, message: "Doctor Appointments Fetched Successfully", data:appointments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Unable to get the Doctor Appointments ", error });
  }
}

const appointmentStatusController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(appointmentId, { status });

    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification || [];
    notification.push({
      type: "Status-UPATED",
      message: `Your appointment has been updated to ${status}`,
      onClickPath: "/doctor-appointments",
    });
    user.notification = notification;
    await user.save();

    res.status(200).send({ success: true, message: "Appointment status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Unable to change Appointment status", error });
  }
};

module.exports = {
  getDoctorInfoController,
  updateDocProfile,getDoctorById,docAppointmentsController,appointmentStatusController
};
