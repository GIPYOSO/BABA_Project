const { Schema } = require("mongoose");

module.exports = new Schema({
  user_id: String,
  title: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
});
