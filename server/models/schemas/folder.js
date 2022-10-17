const { Schema } = require("mongoose");

module.exports = new Schema({
    folder_id: Number,
    user_id: String,
    title: String,
    use_at: Boolean
}, {
    timestamps: true
});