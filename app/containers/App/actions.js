import {
  APP_LOADED,
  REGISTER,
  REGISTERED,
  LOG_IN,
  LOGGED_IN,
  LOG_OUT,
  LOGGED_OUT,
} from './constants';

function appLoaded() {
  return {
    type: APP_LOADED,
  };
}

function register(credentials) {
  return {
    type: REGISTER,
    credentials,
  };
}

function registered() {
  return {
    type: REGISTERED,
  };
}

function login(credentials) {
  return {
    type: LOG_IN,
    credentials,
  };
}

function loggedIn() {
  return {
    type: LOGGED_IN,
  };
}

function logout() {
  return {
    type: LOG_OUT,
  };
}

function loggedOut() {
  return {
    type: LOGGED_OUT,
  };
}

export { appLoaded, register, registered, login, loggedIn, logout, loggedOut };
