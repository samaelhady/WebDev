const express = require("express");

const PORT = 3001;
const app = express();

// Import all data from one file
let { users, posts, comments } = require("./data.js");

// Middleware

app.use(express.json());

app.use((req, res, next) => {
  req.body = req.body ?? {};

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

let postCounter = Math.max(0, ...posts.map(p => p.id)) + 1;
let commentCounter = Math.max(0, ...comments.map(c => c.id)) + 1;

const getPostById = (id) =>
  posts.find((p) => p.id === Number(id));

const readName = (body) => body.name ?? body.title;

const postNotFound = (res) =>
  res.status(404).json({ error: "Post not found" });

// Get all users

app.get("/users", (req, res) => {
  res.json(users);
});

// Get a specific user

app.get("/users/:id", (req, res) => {
  const user = users.find(
    (u) => u.id === Number(req.params.id)
  );

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  res.json(user);
});

// 1. Create a new post

app.post("/posts", (req, res) => {
  const name = readName(req.body);
  const { content } = req.body;

  if (!name || !content) {
    return res.status(400).json({
      error: "name and content are required"
    });
  }

  const user = users.find((u) => u.name === name);

  const post = {
    id: postCounter++,
    userId: user ? user.id : null,
    name,
    content
  };

  posts.push(post);

  res.status(201).json(post);
});

// 2. Get all posts

app.get("/posts", (req, res) => {
  res.json(posts);
});

// 3. Get a specific post

app.get("/posts/:id", (req, res) => {
  const post = getPostById(req.params.id);

  if (!post) return postNotFound(res);

  res.json(post);
});

// 4. Update a post

app.put("/posts/:id", (req, res) => {
  const post = getPostById(req.params.id);

  if (!post) return postNotFound(res);

  const name = readName(req.body);
  const { content } = req.body;

  if (name !== undefined) {
    post.name = name;

    const user = users.find((u) => u.name === name);

    post.userId = user ? user.id : null;
  }

  if (content !== undefined) {
    post.content = content;
  }

  res.json(post);
});

// 5. Delete a post and its comments

app.delete("/posts/:id", (req, res) => {
  const post = getPostById(req.params.id);

  if (!post) return postNotFound(res);

  posts = posts.filter((p) => p.id !== post.id);

  comments = comments.filter((c) => c.postId !== post.id);

  res.status(204).end();
});

// 6. Create a new comment

app.post("/posts/:id/comments", (req, res) => {
  const post = getPostById(req.params.id);

  if (!post) return postNotFound(res);

  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({
      error: "comment is required"
    });
  }

  const created = {
    id: commentCounter++,
    postId: post.id,
    comment
  };

  comments.push(created);

  res.status(201).json(created);
});

// 7. Get all comments belonging to a specific post

app.get("/posts/:id/comments", (req, res) => {
  const post = getPostById(req.params.id);

  if (!post) return postNotFound(res);

  res.json(comments.filter((c) => c.postId === post.id));
});

// ==================== Start Server ====================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});