const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const categoryControllers = require("../controllers/CategoryController");
var uploadController = require("../controllers/uploadController");

// Lấy tất cả danh mục
router.get("/getall", categoryControllers.getAllCategory);

// Lấy danh mục theo ID
router.get("/findById/:id", categoryControllers.getCategoryByID);

// Tạo mới danh mục
router.post(
  "/create",
  uploadController.upload.single("icon"),
  [check("name").notEmpty().withMessage("Tên danh mục không được để trống")],
  categoryControllers.createCategory
);

// Cập nhật danh mục
router.put("/update/:id", categoryControllers.updateCategory);

// Xóa danh mục
router.delete("/delete/:id", categoryControllers.deleteCategory);

module.exports = router;
