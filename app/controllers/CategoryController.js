const CategoryModel = require("../models/CategoryModel");
const { check, validationResult } = require("express-validator");

// Hiển thị tất cả các danh mục
exports.getAllCategory = (req, res, next) => {
  CategoryModel.find({})
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ message: "Không có danh mục nào." });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
          message: "Lỗi server khi lấy tất cả danh mục",
          error: err.message,
        });
    });
};

// Tìm danh mục theo ID
exports.getCategoryByID = (req, res, next) => {
  const _id = req.params.id;
  CategoryModel.findById(_id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Danh mục không tồn tại" });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
          message: "Lỗi server khi tìm danh mục theo ID",
          error: err.message,
        });
    });
};

// Tạo mới danh mục
exports.createCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
   if (!req.file) {
     return res.status(400).json({ message: "Chưa upload file ảnh" });
   }

   // Lưu đường dẫn ảnh tương đối
   const icon = `/uploads/${req.file.filename}`;

  const { name } = req.body;
  // Kiểm tra nếu danh mục đã tồn tại
  CategoryModel.findOne({ name })
    .then((data) => {
      if (data) {
        return res.status(409).json({ message: "Danh mục này đã tồn tại." });
      } else {
        return CategoryModel.create({ name ,icon});
      }
    })
    .then((data) => {
      res
        .status(201)
        .json({ message: "Tạo danh mục thành công", category: data });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "Tạo danh mục thất bại", error: err.message });
    });
};

// Cập nhật thông tin danh mục
exports.updateCategory =  (req, res, next) => {
  const _id = req.params.id;
  const { name, icon,size } = req.body;

  CategoryModel.findByIdAndUpdate(_id, { name, icon, size }, { new: true })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ message: "Danh mục không tồn tại để cập nhật" });
      }
      res
        .status(200)
        .json({ message: "Cập nhật danh mục thành công", category: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Lỗi server khi cập nhật danh mục",
        error: err.message,
      });
    });
};

// Xóa danh mục
exports.deleteCategory = (req, res, next) => {
  const id = req.params.id;

  CategoryModel.deleteOne({ _id: id })
    .then((data) => {
     if (data) {
       res.status(200).json({ message: "Xóa danh mục thành công" });
     } else {
       res.status(404).json({ message: "Xóa danh mục thất bại" });
     }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Lỗi server khi xóa danh mục", error: err.message });
    });
};
