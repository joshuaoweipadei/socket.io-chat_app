import React, { useState, useContext } from 'react'
import Messages from './Messages'
import AlertContext from '../ContextAlert/alertContext';

import { chatService } from '../../services/chat';

const ChatBox = ({ messages, userId, receiver }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext
  const [newMessage, setNewMessage] = useState('');

  let messageBox
  if(!receiver.id){
    messageBox = (
            <div className="empty-message">
              CHAT NOT FOUND
            </div>
    )
  } else{
    const userConversation = messages.filter(msg => (msg.to === receiver.id && msg.from === userId) || (msg.from === receiver.id && msg.to === userId));
    if(userConversation.length === 0){
      messageBox = (
              <div className="empty-message">
                Start a conversation with {receiver.name}
              </div>
      )
    } else{
      messageBox = messages.filter(msg => (msg.to === receiver.id && msg.from === userId) || (msg.from === receiver.id && msg.to === userId))
                  .map((msg, i) => {
                    return <Messages key={i} to={msg.to} from={msg.from} message={msg.message} userId={userId} />
                  });
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if(newMessage !== ''){
      chatService.sendMessage(userId, newMessage, receiver.id)
        .then(() => {
          setNewMessage('')
        })
    } else{
      setAlert('Text field is empty', 'warn');
    }
  }
  
  return (
    <div className="chat-box">
      <div className="chat-wrap">
        <h1>Message</h1>
        {receiver.id && <h5>Chatting with <span>{receiver.name}</span></h5>}
        <div className="chat-messages-container">
          {messageBox}
        </div>

        {receiver.id && 
        <form onSubmit={handleSendMessage} className="chat-form-container">
          <div className="input-field">
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button type="submit">Send Message</button>
          </div>
        </form>
        }

      </div>
    </div>
  )
}

export default ChatBox
