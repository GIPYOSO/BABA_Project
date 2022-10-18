const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    user_id: String,
    password: String,
    name: String,
    profile_nick: String,
    profile_img: String,
  },
  {
    timestamps: true,
  }
);
