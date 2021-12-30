// Real event bus approaches are way more complex.
// This event bus is made for the sake of learning and
// understanding the underlying technology and should
// not be used in a production environment.

const PORT = 4005;

import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json()); // To make sure that the JSON data in the body of a request actually gets parsed, express.json() is used as middleware.

// For this simple application, events are stored in the memory.
const events = []; // Events data store used to synchronize events.

// Route to receive events and update all of the routes with the events.
app.post('/events', async (req, res) => {
  const event = req.body;

  console.log('Event received:', event.type);

  events.push(event);

  await axios.post('http://posts-service:4000/events', event);

  await axios.post('http://comments-service:4001/events', event);

  await axios.post('http://feed-service:4002/events', event);

  res.send({ status: 'OK' });
});

// Sends all events stored in the memory.
app.get('/events', async (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Event Bus listening on port: ${PORT}.`);
});
