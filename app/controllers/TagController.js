const TagModel = require("../models/TagModel");
const { check, validationResult } = require("express-validator");

// Hiển thị tất cả các thẻ
exports.getAllTag = (req, res, next) => {
  TagModel.find({})
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ message: "Không có thẻ nào." });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "Lỗi server khi lấy tất cả thẻ", error: err.message });
    });
};

// Tìm thẻ theo ID
exports.getTagByID = (req, res, next) => {
  const _id = req.params.id;

  TagModel.findById(_id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Thẻ không tồn tại" });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({
          message: "Lỗi server khi tìm thẻ theo ID",
          error: err.message,
        });
    });
};

// Tạo mới thẻ
exports.createTag = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;

  // Kiểm tra nếu thẻ đã tồn tại
  TagModel.findOne({ name })
    .then((data) => {
      if (data) {
        return res.status(409).json({ message: "Thẻ này đã tồn tại." });
      } else {
        return TagModel.create({ name, description });
      }
    })
    .then((data) => {
      res.status(201).json({ message: "Tạo thẻ thành công", tag: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Tạo thẻ thất bại", error: err.message });
    });
};

// Cập nhật thông tin thẻ
exports.updateTag = (req, res, next) => {
  const _id = req.params.id;
  const { name, description } = req.body;

  TagModel.findByIdAndUpdate(_id, { name, description }, { new: true })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ message: "Thẻ không tồn tại để cập nhật" });
      }
      res.status(200).json({ message: "Cập nhật thẻ thành công", tag: data });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "Lỗi server khi cập nhật thẻ", error: err.message });
    });
};

// Xóa thẻ
exports.deleteTag = (req, res, next) => {
  const id = req.params.id;

  TagModel.deleteOne({ _id: id })
    .then((data) => {
      if (data.deletedCount === 0) {
        return res.status(404).json({ message: "Thẻ không tồn tại" });
      }
      res.status(200).json({ message: "Xóa thẻ thành công" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "Lỗi server khi xóa thẻ", error: err.message });
    });
};
