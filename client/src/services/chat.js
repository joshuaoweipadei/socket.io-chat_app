import { handleResponse } from '../helpers/handle-response'

export const chatService = {
  sendMessage,
  getMessages
}

function sendMessage(userId, newMessage, receiverId) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, newMessage, receiverId })
  };
  return fetch('http://localhost:4000/api/chat/send-message', requestOptions).then(handleResponse)
}

function getMessages() {
  const requestOptions = {
      method: 'GET',
  };
  return fetch(`http://localhost:4000/api/chat/conversations`, requestOptions).then(handleResponse);
}