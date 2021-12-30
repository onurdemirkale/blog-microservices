import express from 'express';
import axios from 'axios';
import cors from 'cors';

const PORT = 4002;

const app = express();

app.use(express.json()); // To make sure that the JSON data in the body of a request actually gets parsed, express.json() is used as middleware.
app.use(cors()); // Enable CORS for all requests.

// For this simple application posts are stored on the memory.
let feed = {}; // Stores posts by post id along with their comments.

// Sends all the stored posts which also contains relevant comments.
app.get('/feed', (req, res) => {
  res.send(feed);
});

// Route to receive events.
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  console.log('Event received:', type);

  handleEvent(type, data);

  res.send({});
});

app.listen(PORT, async () => {
  console.log(`Feed Service listening on port: ${PORT}.`);

  // Communicate with the event bus to sync events.
  console.log('Syncing events...');

  const response = await axios.get('http://event-bus-service:4005/events');

  for (let event of response.data) {
    console.log('Processing event:', event.type);

    handleEvent(event.type, event.data);
  }

  console.log('Events synced.');
});

/**
 * Peforms the required operation depending on the type of the event.
 * @param {*} type
 * @param {*} data
 */
const handleEvent = (type, data) => {
  // If a new post has been created, store the post in the memory with the given id.
  if (type === 'PostCreated') {
    const { postId, postTitle } = data;
    console.log(data);
    feed[postId] = { postId, postTitle, postComments: [] };
  }

  // If a new comment has been created, obtain the reference of the post
  // and push a new comment.
  if (type === 'CommentCreated') {
    const { commentId, commentContent, postId } = data;

    const post = feed[postId];

    const { postComments } = post;

    postComments.push({ commentId, commentContent });

    console.log(postComments);
  }
};
