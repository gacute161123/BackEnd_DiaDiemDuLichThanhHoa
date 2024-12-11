const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const tagControllers = require("../controllers/tagController");

// Lấy tất cả các tag
router.get("/getall", tagControllers.getAllTag);

// Lấy tag theo ID
router.get("/findById/:id", tagControllers.getTagByID);

// Tạo mới tag
router.post(
  "/create",
  [
    check("name").notEmpty().withMessage("Tên tag không được để trống"),
    check("description")
      .notEmpty()
      .withMessage("Mô tả tag không được để trống"),
  ],
  tagControllers.createTag
);

// Cập nhật tag
router.put("/update/:id", tagControllers.updateTag);

// Xóa tag
router.delete("/delete/:id", tagControllers.deleteTag);

module.exports = router;
