const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    // địa điểm
    name: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    latitude: { type: Number, required: true }, // Vĩ độ
    longitude: { type: Number, required: true }, // Kinh độ
    image_url: [{ type: String }],
    openingHours: { type: String },
    contact: { type: String },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    collection: "locations", // Tên collection trong MongoDB
    timestamps: true, 
  }
);

module.exports = mongoose.model("Location", LocationSchema);
