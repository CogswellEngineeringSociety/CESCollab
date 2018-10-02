import { takeLatest, put, call } from 'redux-saga/effects';

import { UPDATE_EDITOR_TEXT, LANGUAGE_CHANGED } from './constants';
import { updateEditorText } from './actions';
import firebase from 'firebase';

function* updateRoomLanguage(payload) {
  const { language, roomId, uid } = payload;

  const firestoreRef = firebase.firestore();
  // Okay, instead of two collections public and uid, there will instead be owner property for the document.
  const roomRef = firestore.collection('CESCollabs').doc(roomId);

  // Updates server
  const response = yield call(
    roomRef.update({
      language,
    }),
  );
}

function* updateRoomText(payload) {
  const { newText, roomId, uid } = payload;

  // Then this updates text, might have to be call to server side to use admin privelege.
  // Nah editing the room's text is public to all.

  const firestore = firebase.firestore();
  // If no uid provided, then not logged in so not saved one, so public room.
  const roomRef = firestore
    .collection('CESCollabs')
    .doc('Collabs')
    .collection(uid || 'public')
    .doc(roomId);

  // Updates server
  const response = yield call(
    roomRef.update({
      content: newText,
    }),
  );

  console.log('response', response);
}

export default function* saga() {
  yield takeLatest(UPDATE_EDITOR_TEXT, updateRoomText);
  yield takeLatest(LANGUAGE_CHANGED, updateRoomLanguage);
}
