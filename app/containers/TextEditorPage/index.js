import React, {Component} from 'react';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { compose} from 'redux';
import { connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import saga from './saga';
import reducer from './reducer';
import {

    makeSelectContent,
    makeSelectLanguage,
    makeSelectValidLanguages,
} from './selectors';
import {

    startedTypingWord,
    finishedTypingWord,
    updateEditorText,
    languageChanged,  
    validLanguagesUpdated,
} from './actions';


class TextEditorPage extends Component{


    constructor(props){

        super(props);

        this.state={

            settingsOpen:false,
            terminalOpen:false,
        };
    }

    render(){

        const {content, language, validLanguages} = this.props;

    }

}

//Actually don't really need selector for this.
const mapStateToProps = createStructuredSelector({
    content: makeSelectContent(),
    language : makeSelectLanguage(),
    validLanguages : makeSelectValidLanguages(),
    //Need selector for firebase instance, or could just put here

});

function mapDispatchToProps(dispatch){

    return {

        onLanguageChange : (language) => {

            return dispatch(languageChanged(language));
        },

        onTextUpdate : (text) => {

            return dispatch(updateEditorText(text));
        },

        onValidLanguagesUpdated : (languages) => {

            return dispatch(validLanguagesUpdated(languages));
        },

    };
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: "TextEditorPage", reducer });
const withSaga = injectSaga({key: "TextEditorPage", saga});

export default compose(

    withConnect,
    withReducer,
    withSaga,


)(TextEditorPage);