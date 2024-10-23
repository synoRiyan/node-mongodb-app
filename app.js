const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/helloworldapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Sample MongoDB model for 'Message'
const messageSchema = new mongoose.Schema({
  content: String
});
const Message = mongoose.model('Message', messageSchema);

// Hello World route
app.get('/', (req, res) => {
  res.send('Hello World from Node.js and MongoDB');
});

// POST route to add a message to the database
app.post('/add', async (req, res) => {
  const newMessage = new Message({ content: req.body.content });
  await newMessage.save();
  res.send('Message added to MongoDB');
});


/// GET route to fetch all messages
app.get('/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
