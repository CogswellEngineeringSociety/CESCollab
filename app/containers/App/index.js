/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import TextEditorPage from 'containers/TextEditorPage/Loadable';
import { TEXT_EDITOR_PAGE } from 'paths.js';
import reducer from './reducer';
import { appLoaded } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.onAppLoaded();
    console.log(process.env);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path={TEXT_EDITOR_PAGE}
            render={props => {
              // Passing in as new room, an id, and props for url params
              //So it will pass in argument to link if new or whatever
              //Could be state passed in
              console.log("props", props);
              return <TextEditorPage newRoom = {props.location.state? props.location.state.isNew : false} {...props} />
            }
            }
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  onAppLoaded: PropTypes.func,
  profile: PropTypes.object,
};

function mapStateToProps(state) {
  if (state.get('CESCollabApp') == null) return {};
  console.log('state', state);
  return {
    profile: state.get('CESCollabApp').get('profile'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAppLoaded: () => dispatch(appLoaded()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


const withReducer = injectReducer({ key: 'CESCollabApp', reducer });

export default compose(
  withConnect,
  withReducer,
)(App);
