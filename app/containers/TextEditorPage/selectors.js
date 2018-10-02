import { createSelector } from 'reselect';

const selectTextEditor = state => state.get('TextEditorPage');

const makeSelectOwner = () =>
  createSelector(selectTextEditor, textEditor => {
    if (textEditor == null) return null;

    return textEditor.get('owner');
  });

const makeSelectContent = () =>
  createSelector(selectTextEditor, textEditor => {
    if (textEditor == null) return '';

    return textEditor.get('content');
  });

const makeSelectValidLanguages = () =>
  createSelector(selectTextEditor, textEditor => {
    if (textEditor == null) return [];

    return textEditor.get('validLanguages');
  });

const makeSelectLanguage = () =>
  createSelector(selectTextEditor, textEditor => {
    if (textEditor == null) return null;

    if (textEditor.language == '') {
      return textEditor.get('validLanguages')[0];
    }

    return textEditor.get('language');
  });

export {
  makeSelectContent,
  makeSelectLanguage,
  makeSelectValidLanguages,
  makeSelectOwner,
};
