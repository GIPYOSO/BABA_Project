const mongoose = require("mongoose");
const UserSchema = require("./schemas/user");
const NoteSchema = require("./schemas/note");
const FolderSchema = require("./schemas/folder");
const CalenderSchema = require("./schemas/calender");
const TodoSchema = require("./schemas/todo")



exports.User = mongoose.model("User", UserSchema);
exports.Note = mongoose.model("Note", NoteSchema);
exports.Folder = mongoose.model("Folder", FolderSchema);
exports.Calender = mongoose.model("Calender", CalenderSchema);
exports.Todo = mongoose.model("todo", TodoSchema);


