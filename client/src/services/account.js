import { handleResponse } from '../helpers/handle-response'

export const accountService = {
  login,
  logout,
  getAll
}

function login(values){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  };
  return fetch('http://localhost:4000/api/account/login', requestOptions).then(handleResponse)
    .then((user) => {
      // store user details and in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    })
}

function logout() {
  // remove user from local storage
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
      method: 'GET',
  };
  return fetch('http://localhost:4000/api/account', requestOptions).then(handleResponse);
}