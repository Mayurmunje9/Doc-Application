const express=require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const { getAllUsers ,getAllDoctors} = require("../controllers/adminController");
const router=express.Router();

//GET || Users
router.get('/getAllUsers',authMiddlewares,getAllUsers)

//Get|| Doctors
router.get('/getAllDoctors',authMiddlewares,getAllDoctors)
module.exports=router