const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const blog_content = JSON.parse(
  fs.readFileSync(`${__dirname}/data/blogs.json`)
);
const registered_users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/registeredUsers.json`)
);
app.get("/blogs", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      blog_content,
    },
  });
});
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});
app.post("/registeredUsers", (req, res) => {
  const update_registered_users = Object.assign(req.body);
  registered_users.push(update_registered_users);
  fs.writeFile(
    `${__dirname}/data/registeredUsers.json`,
    JSON.stringify(registered_users),
    (err = () => {
      res.status(201).json({
        status: "success",
        data: {
          registered_users: update_registered_users,
        },
      });
    })
  );
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

const port = 8000;
app.listen(port, () => {
  console.log("Backend chal rha hai");
});
