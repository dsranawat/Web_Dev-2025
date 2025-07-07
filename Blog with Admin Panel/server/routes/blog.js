const express = require("express");
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");

const router = express.Router();

// Public - Get all blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// Public - Get single blog
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
});

// Admin - Create blog
router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;
  const newBlog = new Blog({ title, content });
  await newBlog.save();
  res.status(201).json(newBlog);
});

// Admin - Edit blog
router.put("/:id", auth, async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Admin - Delete blog
router.delete("/:id", auth, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

module.exports = router;
