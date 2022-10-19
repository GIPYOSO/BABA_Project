const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    user_id: String,
    content: String,
    date: String,
  },
  {
    timestamps: true,
  }
);
