const path = require("path");
const express = require("express");
const {
  register,
  postlogin,
  updateuser,
  deleteuser,
  getalluser,
  getdetailuserbyid,
  checkUser,
  getCurrent,
} = require("../controllers/UserController");
const { authMiddleWareAdmin } = require("../middleware/authMiddleware");
const { verifyToken } = require("../middleware/verifytoken");
var router = express.Router();

router.post('/register',register);
router.post('/login',postlogin);
router.put('/update-user/:id',updateuser)
router.delete('/delete-user/:id',deleteuser)
router.get("/getall", authMiddleWareAdmin, getalluser);
router.get("/get-detail/:id", getdetailuserbyid);
router.get("/check-user", checkUser);
router.get("/get-current", verifyToken, getCurrent);
module.exports=router