const ReviewModel = require("../models/ReviewModel");
const { check, validationResult } = require("express-validator");

// Hiển thị tất cả các đánh giá
exports.getAllReview = (req, res, next) => {
  ReviewModel.find({})
    .then((data) => {
      if (data.length === 0) {
        return res
          .status(404)
          .json({ message: "Không có đánh giá nào trong hệ thống." });
      }
      res.status(200).json({ message: "Danh sách đánh giá", reviews: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Lỗi server khi lấy tất cả đánh giá",
        error: err.message,
      });
    });
};

// Tìm đánh giá theo ID
exports.getReviewByID = (req, res, next) => {
  const _id = req.params.id;

  ReviewModel.findById(_id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Đánh giá không tồn tại." });
      }
      res.status(200).json({ message: "Thông tin đánh giá", review: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Lỗi server khi tìm đánh giá theo ID",
        error: err.message,
      });
    });
};

// Tạo mới đánh giá
exports.createReview = [
  // Kiểm tra tính hợp lệ
  check("location_id").notEmpty().withMessage("Địa điểm là bắt buộc."),
  check("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Đánh giá phải từ 1 đến 5 sao."),
  check("comment")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Nhận xét phải có ít nhất 5 ký tự."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { location_id, rating, comment, user_id } = req.body;

    // Kiểm tra nếu đánh giá đã tồn tại cho địa điểm này
    ReviewModel.findOne({ location_id, user_id })
      .then((data) => {
        if (data) {
          return res
            .status(409)
            .json({ message: "Bạn đã đánh giá địa điểm này rồi." });
        } else {
          return ReviewModel.create({ location_id, rating, comment, user_id });
        }
      })
      .then((newReview) => {
        res
          .status(201)
          .json({ message: "Tạo đánh giá thành công", review: newReview });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ message: "Tạo đánh giá thất bại", error: err.message });
      });
  },
];

// Cập nhật đánh giá
exports.updateReview = (req, res, next) => {
  const _id = req.params.id;
  const { rating, comment } = req.body;

  // Kiểm tra tính hợp lệ
  if (rating && (rating < 1 || rating > 5)) {
    return res.status(400).json({ message: "Đánh giá phải từ 1 đến 5 sao." });
  }

  // Cập nhật đánh giá
  ReviewModel.findByIdAndUpdate(_id, { rating, comment }, { new: true })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ message: "Đánh giá không tồn tại để cập nhật" });
      }
      res
        .status(200)
        .json({ message: "Cập nhật đánh giá thành công", review: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Lỗi server khi cập nhật đánh giá",
        error: err.message,
      });
    });
};

// Xóa đánh giá
exports.deleteReview = (req, res, next) => {
  const id = req.params.id;

  ReviewModel.deleteOne({ _id: id })
    .then((data) => {
      if (data.deletedCount === 0) {
        return res.status(404).json({ message: "Đánh giá không tồn tại" });
      }
      res.status(200).json({ message: "Xóa đánh giá thành công" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "Lỗi server khi xóa đánh giá", error: err.message });
    });
};

// Xóa tất cả đánh giá của một địa điểm
exports.deleteReviewsByLocation = (req, res, next) => {
  const location_id = req.params.location_id;
  ReviewModel.deleteMany({ location_id })
    .then((data) => {
      if (data.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "Không có đánh giá nào cho địa điểm này." });
      }
      res.status(200).json({
        message: `Xóa ${data.deletedCount} đánh giá của địa điểm thành công`,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Lỗi server khi xóa đánh giá của địa điểm",
        error: err.message,
      });
    });
};
