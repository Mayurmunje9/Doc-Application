const express=require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const { getAllUsers ,getAllDoctors,changeAccountStatus} = require("../controllers/adminController");
const router=express.Router();

//GET || Users
router.get('/getAllUsers',authMiddlewares,getAllUsers)

//Get|| Doctors
router.get('/getAllDoctors',authMiddlewares,getAllDoctors)

//POT ACCOUNT STATUS
router.post("/changeAccountStatus",authMiddlewares,changeAccountStatus)
module.exports=router