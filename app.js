const express = require("express");
const app = express();
require("dotenv").config();
const fs = require("fs");
var mongoose = require("mongoose");

const DB = process.env.DATABASE;
console.debug(process.env.DATABASE);
app.use(express.json());

const cors = require("cors");

const corsOption = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
//if you want in every domain then
app.use(cors());

// console.log(DB);
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection successful!");
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
});

const User = mongoose.model("User", userSchema);
const blog_content = JSON.parse(
  fs.readFileSync(`${__dirname}/data/blogs.json`)
);
const registered_users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`)
);
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});
app.get("/blogs", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      blog_content,
    },
  });
});

app.get("/users", async (req, res) => {
  let all_users = await User.find();
  console.log(all_users);
  res.status(200).json({
    status: "success",
    data: {
      all_users,
    },
  });
});

app.post("/users", (req, res) => {
  console.log("Yha tk agye");
  const update_registered_users = Object.assign(req.body);
  registered_users.push(update_registered_users);
  // fs.writeFile(
  //   `${__dirname}/data/users.json`,
  //   JSON.stringify(registered_users),
  //   (err = () => {
  //     res.status(201).json({
  //       status: "success",
  //       data: {
  //         registered_users: update_registered_users,
  //       },
  //     });
  //   })
  // );
  const user = new User({
    email: `${req.body.data.email}`,
    password: `${req.body.data.password}`,
  });

  user
    .save()
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.log("Error" + err);
    });

  res.send("Done");
});

app.post("/blogs", (req, res) => {
  const updated_blog_content = Object.assign(req.body);
  blog_content.push(updated_blog_content);
  fs.writeFile(
    `${__dirname}/data/blogs.json`,
    JSON.stringify(blog_content),
    (err = () => {
      res.status(201).json({
        status: "success",
        data: {
          blog_content: updated_blog_content,
        },
      });
    })
  );

  res.send("Done");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Backend chal rha hai port ${port} par`);
});
