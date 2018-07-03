let mongoose = require("mongoose");

let Schema = mongoose.Schema;

const WordCountSchema = new Schema({
  token: String,
  date: String,
  counter: Number
});

WordCountSchema.index({ token: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Wordcount", WordCountSchema);
