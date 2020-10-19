import React from 'react'

const Messages = (props) => {

  let msgClass = [''];
  if(props.from === props.userId){
    msgClass = [...msgClass, 'message-wrap-right']
  } else{
    msgClass = [...msgClass, 'message-wrap']
  }

  return (
    <div className={msgClass.join(' ')}>
      <div className="message-area">
        <div className="message-box">
          <p className="message">
              {props.message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Messages
