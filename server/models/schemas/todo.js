const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    user_id: String,
    todo_title: String,
    date: String,
  },
  {
    timestamps: true,
  }
);
