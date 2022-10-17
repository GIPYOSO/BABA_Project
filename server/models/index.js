const mongoose = require("mongoose");
const UserSchema = require("./schemas/user");
const NoteSchema = require("./schemas/note");
const FolderSchema = require("./schemas/folder");

exports.User = mongoose.model("User", UserSchema );
exports.Note = mongoose.model("Note", NoteSchema );
exports.Folder = mongoose.model("Folder", FolderSchema );