const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên thẻ
  },
  {
    collection: "tags",
    timestamps: true,
  }
);

module.exports = mongoose.model("Tag", TagSchema);
