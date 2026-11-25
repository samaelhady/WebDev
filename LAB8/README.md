
# Lab 8 - Mini Twitter Backend

## Project Description

A REST API for a Mini Twitter application implemented
using Node.js and Express.js.

The API supports managing posts, retrieving users,
and creating and retrieving comments.

Data is stored in JavaScript arrays.

## Installation

npm install

## Run the Server

npm start

## Base URL

http://localhost:3001

## API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | Get all users |
| GET | /users/:id | Get a specific user |
| GET | /posts | Get all posts |
| GET | /posts/:id | Get a specific post |
| POST | /posts | Create a new post |
| PUT | /posts/:id | Update a post |
| DELETE | /posts/:id | Delete a post |
| GET | /posts/:id/comments | Get post comments |
| POST | /posts/:id/comments | Create a comment |

## 1. Get All Users

GET /users

Response: 200 OK

## 2. Get a Specific User

GET /users/1

Response: 200 OK

Example response:

```json
{
  "id": 1,
  "name": "Ahmed",
  "email": "ahmed@example.com"
}
```

## 3. Get All Posts

GET /posts

Response: 200 OK

Returns an array containing all posts.

## 4. Get a Specific Post

GET /posts/1

Response: 200 OK

Example response:

```json
{
  "id": 1,
  "userId": 1,
  "name": "Ahmed",
  "content": "Hello everyone!"
}
```

## 5. Create a New Post

POST /posts

Request body:

```json
{
  "name": "Ahmed",
  "content": "My new post"
}
```

Response: 201 Created

Example response:

```json
{
  "id": 5,
  "userId": 1,
  "name": "Ahmed",
  "content": "My new post"
}
```

## 6. Update a Post

PUT /posts/1

Request body:

```json
{
  "content": "Updated post content"
}
```

Response: 200 OK

## 7. Delete a Post

DELETE /posts/1

Response: 204 No Content

The post and its associated comments are deleted.

## 8. Get Post Comments

GET /posts/1/comments

Response: 200 OK

Returns an array of comments belonging to the post.

## 9. Create a Comment

POST /posts/1/comments

Request body:

```json
{
  "comment": "Nice post!"
}
```

Response: 201 Created

Example response:

```json
{
  "id": 1,
  "postId": 1,
  "comment": "Nice post!"
}
```

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 404 | Not Found |

## Technologies Used

- Node.js
- Express.js
- JavaScript
- REST API
- JSON

## Data Storage

Users, posts, and comments are stored in data.js.

Data is stored in memory and resets when the
server restarts.
