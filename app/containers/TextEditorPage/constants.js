const prefix = 'app/TextEditorPage';

const OWNER_UPDATED = `${prefix}/OWNER_UPDATED`;

// This action is triggered if logged in and either new collab, or one that already exists but has expiry date.
// If had expiry date, just sets it to null, so real quick and nice yo.
const SAVE_COLLAB = `${prefix}/SAVE_NEW_COLLAB`;

// When new text added to field, then needs to update database.
const UPDATE_EDITOR_TEXT = `${prefix}/UPDATE_EDITOR_TEXT`;

// When listener to db for specific room is triggered, and for local changes if one typing.
const EDITOR_TEXT_UPDATED = `${prefix}/EDITOR_TEXT_UPDATED`;

// This is really only needed here, but the language changed into is needed for what is considered key word.
const LANGUAGE_CHANGED = `${prefix}/LANGUAGE_CHANGED`;

// Need to keep track of the word so far, so this also needed here.
const STARTED_TYPING_WORD = `${prefix}/STARTED_TYPING_WORD`;

// For seeing if key word or already used variable, so will need to do some interpreting.
const FINISHED_TYPING_WORD = `${prefix}/FINISHED_TYPING_WORD`;

// Okay, it automatically saves, which makes sense, need reference to room to update it's text.

// This can stay in local state, tbh, this only one to stay local, because the window just pops up
const SHARE_CLICKED = `${prefix}/SHARE_CLICKED`;

const VALID_LANGUAGES_UPDATED = `${prefix}/VALID_LANGUAGES_UPDATED`;
export {
  STARTED_TYPING_WORD,
  FINISHED_TYPING_WORD,
  LANGUAGE_CHANGED,
  UPDATE_EDITOR_TEXT,
  EDITOR_TEXT_UPDATED,
  VALID_LANGUAGES_UPDATED,
  SAVE_COLLAB,
  OWNER_UPDATED,
};
