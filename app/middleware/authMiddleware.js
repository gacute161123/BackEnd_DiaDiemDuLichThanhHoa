const jwt = require('jsonwebtoken')

// check xem có quyền admin =true mới có làm
const authMiddleWareAdmin = (req,res,next)=>{
    console.log("checkToken: ", req.headers.token);
    // const token = req.headers.token.split(' ')[1]
     let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "gacute", function (err, user) {
      if (err) {
        return res.status(404).json("Không có quyền bạn phải đăng nhập tài khoản admin");
      }
      const payload = user
      if (
        payload.role === "ADMIN" 
      ) {
        next();
      } else
        return res
          .status(404)
          .json("Không có quyền bạn phải đăng nhập tài khoản admin");
    });
}
module.exports = {
  authMiddleWareAdmin,
};