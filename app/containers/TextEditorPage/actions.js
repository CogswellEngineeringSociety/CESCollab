import {

    STARTED_TYPING_WORD,
    FINISHED_TYPING_WORD,
    LANGUAGE_CHANGED,
    VALID_LANGUAGES_UPDATED,
    UPDATE_EDITOR_TEXT,
    EDITOR_TEXT_UPDATED,
} from './constants';



function validLanguagesUpdated(languages){

    return {
        type: VALID_LANGUAGES_UPDATED,
        languages,
    };
}
//While doing this, this triggers to update in database
//and check for key word.
function startedTypingWord(word){


    return {
        type: STARTED_TYPING_WORD,
        word,
    };
}

//this is to store the words in this file, so later interprety.
//this just triggers then, the word in state is sent to database.
function finishedTypingWord(){

    return {
        type:FINISHED_TYPING_WORD,
    }

}

function updateEditorText(newText){

    return {
        type: UPDATE_EDITOR_TEXT,
        newText,
    };

}

function editorTextUpdated(newText){

    return {
        type: EDITOR_TEXT_UPDATED,
        text: newText,
    };
}

function languageChanged(language){

    return {
        type: LANGUAGE_CHANGED,
        language,
    };
}

export{

    startedTypingWord,
    finishedTypingWord,
    editorTextUpdated,
    updateEditorText,
    languageChanged,  
    validLanguagesUpdated,
};

