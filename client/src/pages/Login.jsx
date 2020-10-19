import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import Alerts from '../components/Alerts';
import AlertContext from '../components/ContextAlert/alertContext';

import { accountService } from '../services/account';

import '../styles/login.scss';

const Login = ({ history }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext

  useEffect(() => {
    let user = localStorage.getItem('user');
    if(user){
      history.push('/')
    }
  }, []);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => {
    accountService.login(values).then(() => {
      history.push('/');
    }).catch(err => {
      setAlert(err, 'error');
      console.log(err)
    })
  }
  return (
    <div className="login">
      <div className="login-container">
        <div className="form-container">
        <Alerts />
          <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
            <HiOutlineChatAlt2 className="chat-icon" />
            <h3>Chat App, Login</h3>
            <div className="input-field">
              <label htmlFor="email">Email Address</label>
              <input type="text" name="email" id="email"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })} />
                <small className="isError">{errors.email && errors.email.message}</small>
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" id="password"
                ref={register({
                  required: "Required",
                })} />
                <small className="isError">{errors.password && errors.password.message}</small>
            </div>
            <button type="submit" className="submit">Login</button>
            <div className="example">
              <b>User 1</b>
              <p>Email: test@example.com</p>
              <p>Password: password</p>
              <b>User 2</b>
              <p>Email: test2@example.com</p>
              <p>Password: password2</p>
              <b>User 3</b>
              <p>Email: test3@example.com</p>
              <p>Password: password3</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
