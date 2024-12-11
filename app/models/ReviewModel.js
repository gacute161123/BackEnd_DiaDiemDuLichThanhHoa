const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Điểm đánh giá (1 đến 5)
    comment: { type: String }, // Bình luận chi tiết
    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
  },
  {
    collection: "reviews",
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
