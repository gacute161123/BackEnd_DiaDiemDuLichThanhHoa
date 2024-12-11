const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const reviewControllers = require("../controllers/reviewController");

// Lấy tất cả đánh giá
router.get("/getall", reviewControllers.getAllReview);

// Lấy đánh giá theo ID
router.get("/findById/:id", reviewControllers.getReviewByID);

// Tạo mới đánh giá
router.post(
  "/create",
  [
    check("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Đánh giá phải là một số từ 1 đến 5"),
    check("comment").notEmpty().withMessage("Bình luận không được để trống"),
    check("location_id")
      .notEmpty()
      .withMessage("ID địa điểm không được để trống"),
  ],
  reviewControllers.createReview
);

// Cập nhật đánh giá
router.put("/update/:id", reviewControllers.updateReview);

// Xóa đánh giá
router.delete("/delete/:id", reviewControllers.deleteReview);

module.exports = router;
