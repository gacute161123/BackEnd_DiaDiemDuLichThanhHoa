const express = require("express");
var app = express();
const path = require("path");
var cors = require("cors"); // xử lý dư liệu dạng json
const { dbconnect } = require("./app/configs/dbConfig");

app.use(express.json()); // để xử lý dạng dữ liệu json
app.use(express.urlencoded({ extended: true })); // để xử lý dữ liệu url encoded
app.use(cors({ credentials: true, origin: "*" })); // chấp thuận cors từ mọi u

dbconnect();
var userRouter = require("./app/routes/UserRoute");
app.use("/api/user", userRouter);

var categoryRouter = require("./app/routes/CategoryRoute");
app.use("/api/category", categoryRouter);

var locationRouter = require("./app/routes/LocationRoute");
app.use("/api/location", locationRouter);

app.use("/", express.static(path.join("./app/public")));
app.use("/api/product", express.static(path.join("./app/public")));
app.use("/uploads", express.static(path.join("./app/public")));

app.get("/", (req, res, next) => {
  res.send("Vui ve");
});

app.listen(3002, () => {
  console.log(`Server srtarted on port`);
});
