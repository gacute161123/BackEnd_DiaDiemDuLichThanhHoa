
// dufn 
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  let accessToken = req.headers.authorization.split(' ')[1];
  try {
    if (!accessToken) {
      return res.status(401).json({
        status: err,
        message: "không tìm thấy token",
      });
    }

    jwt.verify(accessToken, "gacute", (err, user) => {
      // decode mã hóa lại tt trước khi mã hóa trong th này là user
      if (err)
        return res.status(401).json({
          status: err,
          message:
            "access token đã hết hạn vui lòng đăng nhập lại: " + accessToken,
        });
      req.user = user;

      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};
module.exports = {
  verifyToken,
};
