
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    Summary: {
      type: String,
      required: true,
    },
    Content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
