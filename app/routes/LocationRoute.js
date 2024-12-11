const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const locationControllers = require("../controllers/locationController");
var uploadController = require("../controllers/uploadController");

router.get("/getall", locationControllers.getAllLocation);

router.get("findById/:id", locationControllers.getLocationByID);

router.post(
  "/create",
  uploadController.upload.array("image_url",10),
  [
    check("name").notEmpty().withMessage("Tên địa điểm không được để trống"),
    check("latitude").notEmpty().withMessage("Vĩ độ không được để trống"),
    check("longitude").notEmpty().withMessage("Kinh độ không được để trống"),
    check("category_id").notEmpty().withMessage("Danh mục không được để trống"),
  ],
  locationControllers.createLocation
);

router.put("/update/:id", locationControllers.updateLocation);

router.delete("/delete/:id", locationControllers.deleteLocation);

module.exports = router;
