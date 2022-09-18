const express = require("express");
const app = express();
require("dotenv").config();
var mongoose = require("mongoose");

const DB = process.env.DATABASE;
console.debug(process.env.DATABASE);
app.use(express.json());

const cors = require("cors");

const corsOption = {
	origin: ["http://localhost:3000"]
};
app.use(cors(corsOption));
//if you want in every domain then
app.use(cors());

mongoose
	.connect(DB, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(con => {
		console.log("DB connection successful!");
	});

const userSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: [true, "A user must have an email"]
	},
	password: {
		type: String,
		required: [true, "A user must have a password"]
	}
});

const blogSchema = new mongoose.Schema({
	blog_title: {
		type: String,
		requried: [true, "It must require a password"]
	},
	blog_content: {
		type: String,
		required: [true, "It must have a content"]
	},
	author_name: {
		type: String,
		requried: [true, "Author must have a name"]
	},
	author_email: {
		type: String,
		required: [true, "Author's email is required"]
	},
	likes: {
		type: Number,
		required: [true, "Number of likes are required"]
	},
	upvotes: {
		type: Number,
		required: [true, "Number of upvotes is required"]
	},
	downvotes: {
		type: Number,
		required: [true, "Number of downvotes is required"]
	},
	comments: {
		type: Array,
		required: [true, "Comments are required"]
	}
});

//Schemas
const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);

app.get("/", (req, res) => {
	res.status(200).json({
		status: "success"
	});
	res.status(404).json({
		status: "Not Found!"
	});
});
app.get("/blogs", (req, res) => {
	res.status(200).json({
		status: "success",
		data: {
			blog_content
		}
	});
});

app.get("/users", async (req, res) => {
	let all_users = await User.find();
	console.log(all_users);
	res.status(200).json({
		status: "success",
		data: {
			all_users
		}
	});
});

app.post("/users", (req, res) => {
	console.log("Yha tk agye");
	const update_registered_users = Object.assign(req.body);
	registered_users.push(update_registered_users);
	const user = new User({
		email: `${req.body.data.email}`,
		password: `${req.body.data.password}`
	});

	user.save()
		.then(doc => console.log(doc))
		.catch(err => console.log("Error" + err));

	res.send("Done");
});

app.post("/blogs", (req, res) => {
	const updated_blog_content = Object.assign(req.body);
	blog_content.push(updated_blog_content);
	const blog = new Blog({
		blog_title: `${req.title}`,
		blog_content: `${req.blog_content}`,
		author_name: `${req.author_name}`,
		author_email: `${req.author_email}`,
		likes: `${req.likes}`,
		upvotes: `${req.upvote}`,
		downvotes: `${req.downvote}`,
		comments: `${req.comments}`
	});

	blog.save()
		.then(doc => console.log(doc))
		.catch(err => console.log("Error" + err));

	res.send("Done");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Backend chal rha hai port ${port} par`);
});
