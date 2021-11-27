const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema({
  user: { type: String, required: true },
  snippetId: { type: String, required: true },
  comment: { type: String, required: true },
  commentId: { type: String, required: true },
});

module.exports = mongoose.model("comments", commentSchema);
