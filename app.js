const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const USER_NAME = "divya112";
const PASSWORD = "vishnoi09";
const DATABASE_NAME = "mern-blog";

const DB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.cmzcblz.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(3099, () => {
      console.log("Server is running on port 3099");
    });
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

const Blog = require("./Models/BlogPost");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//fetch all the blog from the database
app.get("/blog", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//fetch a blog by id from the database
app.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//creating blog in mongodb
app.post("/blog", (req, res) => {
  const newBlog = new Blog(req.body);
  newBlog
    .save()
    .then((res) => {
      console.log(res);
      res.send(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
     

//delete the blog by id from mongodb
app.delete("/blog/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((res) => {
      res.send(res);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Error route

app.use((req, res) => {
  res.status(404).send("page not found");
});
