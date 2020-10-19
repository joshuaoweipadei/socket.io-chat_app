import React from 'react'
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import { BiLogIn } from 'react-icons/bi'

import '../styles/navbar.scss'

const Navbar = ({ logout }) => {
  return (
    <>
      <div className="nav-container">
        <div className="nav-wrapper">
          <div className="nav-logo-container">
            <HiOutlineChatAlt2 className="nav-logo" />
            <h1>Chat App</h1>
          </div>
          <div className="nav-items">
            <BiLogIn onClick={logout} className="logout" title="logout" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
