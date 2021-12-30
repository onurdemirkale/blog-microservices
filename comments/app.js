import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const PORT = 4001;

const app = express();

app.use(express.json()); // To make sure that the JSON data in the body of a request actually gets parsed, express.json() is used as middleware.
app.use(cors()); // Enable CORS for all requests.

// Cross-Origin Resource Sharing (CORS) is an HTTP-header based
// mechanism that allows a server to indicate any origins (domain, scheme, or port)
// other than its own from which a browser should permit loading resources.

// For this simple application comments are stored on the memory.
const commentsByPostId = {}; // Stores comments by post id. Every post has an array of comments.

// Sends all the posts of a comment, empty array if none.
app.get('/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;

  res.send(commentsByPostId[postId] || []);
});

// Adds a new comment to a post with a generated UUID.
app.post('/posts/:postId/comments', async (req, res) => {
  const commentId = uuidv4(); // Generate a UUID for the comment.
  const { commentContent } = req.body;
  const { postId } = req.params;

  const postComments = commentsByPostId[postId] || [];

  postComments.push({ commentId, commentContent });

  commentsByPostId[postId] = postComments;

  // Emit an event signifying that a new comment has been created.
  try {
    await axios.post('http://event-bus-service:4005/events', {
      type: 'CommentCreated',
      data: {
        commentId,
        commentContent,
        postId,
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.status(201).send();
});

// Route to receive events. This route will be used if additional
// services to manipulate posts are added.
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  console.log('Event received:', type);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Comments Service listening on port: ${PORT}.`);
});
