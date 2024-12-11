const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      enum: ["ADMIN", "CONSUMER"],
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: false,
    },
  },
  {
    collection: "User",
    timestamps: true, // thời gian tạo và update
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
