import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const PORT = 4000;

const app = express();

app.use(express.json()); // To make sure that the JSON data in the body of a request actually gets parsed, express.json() is used as middleware.
app.use(cors()); // Enable CORS for all requests.

// Cross-Origin Resource Sharing (CORS) is an HTTP-header based
// mechanism that allows a server to indicate any origins (domain, scheme, or port)
// other than its own from which a browser should permit loading resources.

// For this simple application, posts are stored in the memory.
const postsById = {}; // Stores posts by post id.

// Sends all the stored posts.
app.get('/posts', (req, res) => {
  res.send(postsById);
});

// Adds a post with a generated UUID.
app.post('/posts', async (req, res) => {
  const postId = uuidv4();
  const { postTitle } = req.body;

  postsById[postId] = { postId, postTitle };

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: {
        postId,
        postTitle,
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.status(201).send(postsById[postId]);
});

// Route to receive events. This route will be used if additional
// services to manipulate posts are added.
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  console.log('Event received:', type);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Posts Service listening on port: ${PORT}.`);
});
