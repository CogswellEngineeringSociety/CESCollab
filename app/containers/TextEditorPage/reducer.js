import { fromJS } from 'immutable';

// Add this to saga too.
import {
  STARTED_TYPING_WORD,
  FINISHED_TYPING_WORD,
  LANGUAGE_CHANGED,
  VALID_LANGUAGES_UPDATED,
  EDITOR_TEXT_UPDATED,
  OWNER_UPDATED,
} from './constants';

const initialState = fromJS({
  // I could store the entire doc as whole object
  // but then will overwrite content too whe don't need to.
  content: '',
  // Should be an enum.
  language: '',
  // Owner of room set here, if null won't have priveleges in settings.
  owner: null,
  validLanguages: [],
  shareWindowOpen: false,
  // The word they are currently typing.
  // High lightning maybe an issue with this, unless each word in list has a color tag to it.
  // which could work, could make the docs like that, keep that in mind.
  currentWord: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OWNER_UPDATED:
      return state.set('owner', action.owner);

    // Only options are valid in terms of user given, so check not needed
    case LANGUAGE_CHANGED:
      return state.set('language', action.language);

    case VALID_LANGUAGES_UPDATED:
      return state.set('validLanguages', action.languages);

    // Saga and reducer will react to this.
    // reducer will update on client side and saga will update on backend site
    // wait but there will always be listener to it, so updates here and updates there,
    // unless check to make sure the changes weren't made by this person, but how hard would that be?
    case EDITOR_TEXT_UPDATED:
      return state.set('content', action.newText);

    default:
      return state;
  }
}
