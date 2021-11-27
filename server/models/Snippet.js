const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let snippetSchema = new Schema({
  user: { type: String, required: true },
  snippet: { type: String, required: true },
  snippetId: { type: String, required: true },
});

module.exports = mongoose.model("snippets", snippetSchema);
