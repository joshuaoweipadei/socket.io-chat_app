import React, { useState, useEffect } from 'react'
import { FaBars, FaRegWindowClose, FaSnapchat } from 'react-icons/fa';

import { accountService } from '../../services/account';

const Members = ({ userId, receiver, setReceiver }) => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    accountService.getAll().then(users => {
      setUsers(users)
    });

    window.addEventListener("resize", handleResize)
  }, []);

  const handleResize = () => {
    if(window.innerWidth >= 769){
      setIsOpen(false)
    }
  }

  const handleUser = (id) => setReceiver(id);

  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <div className="users-container">
      <div className="users-wrap">
        <div className="users-list">
          <h3>Chat Members</h3>
            {users &&
            <ul>
              {users.filter(user => user.id !== userId).map((user, i) => (
                <li onClick={() => handleUser(user)} key={i} className={receiver.id === user.id ? "active" : ""}><FaSnapchat className="user-icon" /> {user.name}</li>
              ))}
            </ul>
            }
        </div>
        <div className="mobile-users">
          <FaBars onClick={toggle} className="bar-icon" /> <h3 onClick={toggle}>Chat Members</h3>
        </div>
        <Sidebar receiver={receiver} users={users} userId={userId} isOpen={isOpen} toggle={toggle} handleUser={handleUser} />
      </div>
    </div>
  )
}


const Sidebar = ({ receiver, users, userId, isOpen, toggle, handleUser }) => {
  return (
    <div className={isOpen ? 'sidebar active' : 'sidebar'}>
      <ul className='side-wrapper' onClick={toggle}>
        <li className="close-toggle">
          <FaRegWindowClose className="close-icon" />
        </li>
        {users.filter(user => user.id !== userId).map((user, i) => {
          return (
            <li key={i} className={receiver.id === user.id ? "member active" : "member"} onClick={() => handleUser(user)}>
              <a href={(e) => e.preventDefault()}><FaSnapchat className="user-icon" /> {user.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default Members
