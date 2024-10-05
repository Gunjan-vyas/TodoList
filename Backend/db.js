const mongoose = require("mongoose");
const config = require("./config");
mongoose.connect(config.db.url);

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
});

const todo = mongoose.model("todos", TodoSchema);

module.exports = {
  todo,
};
