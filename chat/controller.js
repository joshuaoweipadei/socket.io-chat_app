const express = require('express');
const router = express.Router();

// routes
router.post('/send-message', sendMessage);
router.get('/conversations', getMessages);

module.exports = router;

let messages = [];

function sendMessage(req, res){
  const { userId, newMessage, receiverId } = req.body;
  let msgObj = {
    to: receiverId,
    from: userId,
    message: newMessage
  }
  messages.push(msgObj);

  res.io.sockets.emit('messages', messages);

  return res.status(200).json(messages)
}

function getMessages(req, res){
  return res.status(200).json(messages);
}