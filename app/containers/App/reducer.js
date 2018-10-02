import { fromJS } from 'immutable';
import firebase from 'firebase';
import {
  APP_LOADED,
  REGISTERED,
  LOGGED_IN,
  LOGGED_OUT,
  ERROR_OCCURED,
} from './constants';

const initialState = fromJS({
  firebase: null,
  // Profile will contain email, and links to code shares code shares.
  profile: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case APP_LOADED:
      return state.set('firebase', firebase);

    default:
      return state;
  }
}
