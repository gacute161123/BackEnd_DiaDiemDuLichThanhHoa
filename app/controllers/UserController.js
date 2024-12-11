const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
  const { name, password, comfirmpassword, email, phone, image } = req.body;
   let encryptedPassword = "";
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const isCheckEmail = emailRegex.test(email)
   if (!name || !email || !password || !comfirmpassword || !phone || !image) {
     return res.json("input đầu vào thiếu trường bắt buộc");
   } else if (!isCheckEmail) {
     return res.json("chuỗi email đầu vào không đúng định dạng");
   }
  if(password!=comfirmpassword){
    return res.status(200).json("Mật khẩu nhập lại không trùng khớp với mật khẩu")
  }
   bcrypt.genSalt(saltRounds, (err, salt) => {
     bcrypt.hash(password, salt, (err, hash) => {
       encryptedPassword = hash;
       UserModel.findOne({ email: email, phone: phone  })
         .then((data) => {
           if (data) {
             res.json("Email hoặc phone này đã tồn tại");
           } else {
             return UserModel.create({
               name: name,
               email: email,
               password: encryptedPassword,
               phone: phone,
               image:image,
               role: "CONSUMER",
             });
           }
         })
         .then((data) => {
           if (data) {
             res.json("tạo tài khoản thành công");
           }
         })
         .catch((err) => {
           res.status(500).json(err);
         });
     });
   }); 
};

// đăng nhập
const postlogin = async(req,res,next)=>{
  const {email,password} = req.body
  try{
      var user = await UserModel.findOne({
        email :email  
      })
      if(!user){
        return res.status(501).json({status:"ERRTK",message:"tài khoản không chính xác"})
      }
      const checkPassword = bcrypt.compareSync(password, user.password);
      if(!checkPassword){
        return res
          .status(501)
          .json({ status: "ERRMK", message: "mật khẩu không chính xác" });
      }
      else{
           var token = jwt.sign(
             {
               _id: user._id,
               role: user.role,
             },
             "gacute",
             { expiresIn: "365d" }
           );
           
           return res.json({
              status:"OKE",
             message: "Đăng nhập thành công",
             access_token:  token,
           });
      }
  }
 catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// sửa thông tin user
const updateuser = async(req,res,next)=>{
  try{
     const userId= req.params.id
     const data= req.body
     var checkUserId = await UserModel.findOne({
       _id: userId,
     });
     if(checkUserId ==null){
      res.json("user ko tồn tại")
     }
     const updateUser = await UserModel.findByIdAndUpdate(userId,data,{new:true});
     res.json(updateUser)
  }
 catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//xóa user
const deleteuser=(req,res,next)=>{
  var userId = req.params.id;
  UserModel.deleteOne({
    _id: userId,
  })
    .then((data) => {
      res.json("Xoa User thanh cong");
    })
    .catch((err) => {
      res.status(500).json("Loi server");
    });
}

const getalluser=(req,res,next)=>{
     UserModel.find({})
       .then((data) => {
         res.json(data);
       })
       .catch((err) => {
         res.status(500).json("Loi server");
       });
}

const getdetailuserbyid  = (req,res,next)=>{
   var _id = req.params.id;
   UserModel.findById({ _id })
     .then((data) => {
       res.json(data);
     })
     .catch((err) => {
       res.status(500).json("Loi server");
     });
}

const checkUser = (req,res,next)=>{
 var phone = req.query.phone;
 var email = req.query.email;
 UserModel.find({ 
     phone: phone,
     email: email
 })
   .then((data) => {
     if (data.length > 0) {
       res.json({data: true}); // Dữ liệu đã tồn tại
     } else {
        res.json({data:false});  // Dữ liệu không tồn tại
     }
   })
   .catch((err) => {
     res.status(500).json("Loi server");
   });
}


// lấy ra thằng user đang đăng nhập 
const getCurrent = async (req,res,next)=>{
  try{
   var _id = req.user._id;
   UserModel.findById({ _id })
     .then((data) => {
    return res.json({
      status: "OKE",
      message: {
        _id: data._id,
        name: data.name,
        email: data.email,
        image: data.image,
        phone: data.phone,
        role: data.role
      },
    });
     })
     .catch((err) => {
       res.status(500).json("Loi server");
     });
  }
  catch(err){
    res.status(500).json("Loi server");
  }
}
module.exports = {
  register,
  postlogin,
  updateuser,
  deleteuser,
  getalluser,
  getdetailuserbyid,
  checkUser,
  getCurrent,
};
