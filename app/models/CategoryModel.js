const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String },
    size: { type:Number}
  },
  {
    collection: "categories",
    timestamps: true, 
  }
);

module.exports = mongoose.model("Category", CategorySchema);
