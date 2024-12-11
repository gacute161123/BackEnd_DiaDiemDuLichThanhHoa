const LocationModel = require("../models/LocationModel");
const { check, validationResult } = require("express-validator");

// Hiển thị tất cả các địa điểm
exports.getAllLocation = (req, res, next) => {
  LocationModel.find({})
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ message: "Không có địa điểm nào trong hệ thống." });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
          message: "Lỗi server khi lấy tất cả địa điểm",
          error: err.message,
        });
    });
};

// Tìm địa điểm theo ID
exports.getLocationByID = (req, res, next) => {
  const _id = req.params.id;
  LocationModel.findById(_id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Địa điểm không tồn tại" });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
          message: "Lỗi server khi tìm địa điểm theo ID",
          error: err.message,
        });
    });
};

// Tạo mới địa điểm
exports.createLocation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

     if (!req.files || req.files.length === 0) {
       return res
         .status(400)
         .json({ message: "Chưa upload hình ảnh địa điểm" });
     }

   // Lưu đường dẫn ảnh tương đối
  const image_url = req.files.map((file) => `/uploads/${file.filename}`);

  const {
    name,
    description,
    address,
    latitude,
    longitude,
    openingHours,
    contact,
    category_id,
  } = req.body;

  // Kiểm tra nếu địa điểm đã tồn tại với tên hoặc vĩ độ và kinh độ trùng
  LocationModel.findOne({
    $or: [{ name: name }, { latitude: latitude, longitude: longitude }],
  })
    .then((data) => {
      if (data) {
        if (data.name === name) {
          return res.status(409).json({ message: "Địa điểm với tên này đã tồn tại." });
        }
        if (data.latitude === latitude && data.longitude === longitude) {
          return res.status(409).json({ message: "Địa điểm với vĩ độ và kinh độ này đã tồn tại." });
        }
      } else {
        return LocationModel.create({
          name,
          description,
          address,
          latitude,
          longitude,
          image_url,
          openingHours,
          contact,
          category_id,
        });
      }
    })
    .then((data) => {
      if (data) {
        res.status(201).json({ message: "Tạo địa điểm thành công", location: data });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Tạo địa điểm thất bại", error: err.message });
    });
};

// Sửa thông tin địa điểm
exports.updateLocation = (req, res, next) => {
  const _id = req.params.id;
  const {
    name,
    description,
    address,
    latitude,
    longitude,
    image_url,
    openingHours,
    contact,
    category_id,
  } = req.body;

  // Cập nhật thông tin địa điểm
  LocationModel.findByIdAndUpdate(
    _id,
    {
      name,
      description,
      address,
      latitude,
      longitude,
      image_url,
      openingHours,
      contact,
      category_id,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Địa điểm không tìm thấy để cập nhật" });
      }
      res.status(200).json({ message: "Cập nhật địa điểm thành công", location: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
          message: "Lỗi server khi cập nhật địa điểm",
          error: err.message,
        });
    });
};

// Xóa địa điểm
exports.deleteLocation = (req, res, next) => {
  const id = req.params.id;
  LocationModel.deleteOne({ _id: id })
    .then((data) => {
      if (data.deletedCount === 0) { // số lượng tài liệu bị xóa
        return res.status(404).json({ message: "Địa điểm không tồn tại" });
      }
      res.status(200).json({ message: "Xóa địa điểm thành công" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Lỗi server khi xóa địa điểm", error: err.message });
    });
};
