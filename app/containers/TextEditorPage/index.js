import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectFirebase } from 'containers/App/selectors';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';
import reducer from './reducer';


import {
  makeSelectContent,
  makeSelectLanguage,
  makeSelectValidLanguages,
  makeSelectOwner,
} from './selectors';
import {
  startedTypingWord,
  finishedTypingWord,
  updateEditorText,
  editorTextUpdated,
  languageChanged,
  validLanguagesUpdated,
  saveCollab,
  ownerUpdated,
} from './actions';

class TextEditorPage extends Component {
  constructor(props) {
    super(props);

    //Could just add this shit whne needed, but it's fine.
    this.state = {
      settingsOpen: false,
      terminalOpen: false,
    };
  }

  componentDidMount() {
    // So params need to be given to establish if making new room.

    const newRoom = this.props.newRoom;
    const firebaseRef = this.props.firebase;
    // Uid will be generated in route if new.
    const roomId = this.props.match.params.roomId;

    const roomRef = null;
    // If new room then make new room in public or under uid of logge din user.

    // If not new room, just go straight to setting listener.
    if (newRoom) {
      const currentUser = firebaseRef.auth().currentUser;

      const roomRef = firebaseRef
        .firestore()
        .collection('CESCollabs')
        .doc(roomId);

      if (!currentUser) {
        const tomorrow = new Date();
        tomorrow.setDate(Date.now() + 1);

        // No owner variable.
        roomRef
          .set({
            content: '',
            language: 'Plain Text',
            expiryDate: tomorrow,
          })
          .then(res => {
            console.log('room set');
          })
          .catch(err => {
            console.log('err', err);
          });
      } else {
        roomRef.set({
          content: '',
          language: 'Plain Text',
          owner: currentUser.uid,
        });
      }
    }

    const options = {
      // For changes to alrady added posts.
      includeMetadataChanges: true,
    };

    // Sets listener to room document.
    roomRef.onSnapshot(options, doc => {
      if (doc.exists) {
        // Compares content, cause if only owner changed no need to render.

        const data = doc.data();

        // If either of these fields change, then trigger update for that respective field.
        // But see now gotta reupdate this listener.
        if (data.content != this.props.content) {
          this.props.onTextUpdated(data.content);
        } else if (data.language != this.props.content) {
          this.props.onLanguageChange(data.language);
        } else if (data.owner != this.props.owner) {
          this.props.onOwnerUpdated(data.owner);
        }
        // This means I do need to re-render if  owner changed though, which doesn't make sense.
        // Actually is fine because settings and such would change.
      } else {
        // If doesn't exist that means the update was that it was deleted.
        // So should either throw out of room, or set expiry date on it.
      }
    });

    const validLanguageRef = firebaseRef
      .firestore()
      .collection('CESCollabs')
      .doc('Languages');

    // sets listenter to update valid languages.

    validLanguageRef.onSnapshot(options, doc => {
      if (doc.exists) {
        // Then update the array there with array here.
        const languages = doc.data().languages;

        this.props.onValidLanguagesUpdated(languages);
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // If wasn't logged in before but is now, then save room, if not already saved, can check owner for that, so
    // need to keep that in state. This is key what happens, when this happens. Should it always expire if created
    // while logged out? Actually I'll have login and log out go to new page. That way only need to check currentUser
    // v.s owner.
    if (
      prevProps.firebase.auth().currentUser == null &&
      this.props.firebase.auth().currentUser
    ) {
    }
    // What if other way around? Owner of room you're in shouldn't actually change just cause logged out, but you do lose priveleges.
    // Either way do need to store owner in state, but unless transfer ownership wit wouldn't get updated.
  }
  render() {
    const {
      content,
      language,
      validLanguages,
      owner,
      onTextUpdate,
      onTextUpdated,
    } = this.props;

    // Will have save button, that will have them log in, otherwise auto saves.
    return (
      <div>
        <p> Owner: {owner} </p>
        {/* Putting these for testing real time */}
        <label htmlFor="textEditor"> Editor </label>
        <input
          id="textEditor"
          type="text"
          onChange={evt => {
            onTextUpdate(evt.target.value);
          }}
          value={content}
        />
      </div>
    );
  }
}

TextEditorPage.propTypes = {
  owner: PropTypes.string,
  content: PropTypes.string,
  language: PropTypes.string,
  validLanguages: PropTypes.array,
  firebase: PropTypes.object,
};

// Actually don't really need selector for this.
const mapStateToProps = createStructuredSelector({
  owner: makeSelectOwner(),
  content: makeSelectContent(),
  language: makeSelectLanguage(),
  validLanguages: makeSelectValidLanguages(),
  firebase: makeSelectFirebase(),
});

function mapDispatchToProps(dispatch) {
  return {
    onOwnerUpdated: owner => dispatch(ownerUpdated(owner)),
    onLanguageChange: language => dispatch(languageChanged(language)),

    // Dispatches when onChange on textField happens to update database.
    onTextUpdate: text => dispatch(updateEditorText(text)),

    onTextUpdated: text => dispatch(editorTextUpdated(text)),

    onValidLanguagesUpdated: languages =>
      dispatch(validLanguagesUpdated(languages)),

    onSaveCollab: (roomId, owner, content) =>
      dispatch(saveCollab(roomId, owner, content)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'TextEditorPage', reducer });
const withSaga = injectSaga({ key: 'TextEditorPage', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(TextEditorPage);
