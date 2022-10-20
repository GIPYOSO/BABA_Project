const { Schema } = require("mongoose");
// const shortId = require("./types/short-id");

module.exports = new Schema(
  {
    // shortId,
    note_id: Number,
    user_id: String,
    // folder_id: {
    //     type: Number,
    //     ref: "Folders",
    //     require: true
    // },
    title: String,
    contents: String,
    file_url: String,
    memo: String,
    favorites: String,
    use_at: Boolean,
    created_at: Date,
    updated_at: Date,
    // password: String,
  },
  {
    timestamps: true,
  }
);
