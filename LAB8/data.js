const users = [
  {
    id: 1,
    name: "Ahmed",
    email: "ahmed@example.com"
  },
  {
    id: 2,
    name: "Ali",
    email: "ali@example.com"
  },
  {
    id: 3,
    name: "Omar",
    email: "omar@example.com"
  }
];

const posts = [
  {
    id: 1,
    userId: 1,
    name: "Ahmed",
    content: "Hello everyone!"
  },
  {
    id: 2,
    userId: 2,
    name: "Ali",
    content: "Learning Node.js and Express."
  },
  {
    id: 3,
    userId: 1,
    name: "Ahmed",
    content: "This is my second post."
  },
  {
    id: 4,
    userId: 3,
    name: "Omar",
    content: "Welcome to Mini Twitter!"
  }
];

const comments = [];

module.exports = { users, posts, comments };