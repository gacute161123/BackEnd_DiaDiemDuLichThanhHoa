const mongoose = require("mongoose");
const MONGO_URI = "mongodb://127.0.0.1/BanDoDuLichThanhHoa";
mongoose.Promise = global.Promise;
const dbconnect = () =>
  mongoose
    .connect(MONGO_URI, {})
    .then(() => {
      console.log("Kết nối MongoDB thành công!");
    })
    .catch((err) => {
      console.log("Kết nối MongoDB thất bại");
      setTimeout(dbconnect, 5000);
    });
module.exports = { dbconnect };
