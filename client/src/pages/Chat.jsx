import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
import Navbar from '../components/Navbar';
import ChatBox from '../components/Chat/ChatBox';
import Members from '../components/Chat/Members';
import Alerts from '../components/Alerts';

import { accountService } from '../services/account';
import { chatService } from '../services/chat';

import '../styles/chat.scss';

const Chat = ({ history }) => {
  let user = JSON.parse(localStorage.getItem('user'))

  const [receiver, setReceiver] = useState({});
  const [messages, setMessages] = useState([])
  const [lastMessage, setLastMessage] = useState([])

  const socket = io('http://localhost:4000');
  
  const logout = () => {
    accountService.logout();
    history.push('/login')
  }

  useEffect(() => {
    chatService.getMessages().then((msg) => {
      setMessages(msg)
    });
  }, [lastMessage, receiver]);

  useEffect(() => {
    socket.on('messages', data => setLastMessage(data));
  }, []);

  return (
    <>
      <Navbar logout={logout} />
      <div className="chat-container">
        <div className="welcome-wrap">
          <h2><span>Welcome,</span> {user.name}</h2>
        </div>
        <Alerts/>
        <div className="chat-wrapper">
          <Members messages={messages} userId={user.id} receiver={receiver} setReceiver={setReceiver} />
          <ChatBox messages={messages} userId={user.id} receiver={receiver} />
        </div>
      </div>
    </>
  )
}

export default Chat
