const doctorModel = require("../models/doctorModel");

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
module.exports = {
  getDoctorInfoController,
  updateDocProfile,getDoctorById
};
