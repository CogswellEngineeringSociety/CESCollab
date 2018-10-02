import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');
const selectGlobal = state => state.get('CESCollabApp');

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectFirebase = () =>
  createSelector(selectGlobal, globalState => {
    if (globalState == null) return null;

    return globalState.get('firebase');
  });
const makeSelectProfile = () =>
  createSelector(selectGlobal, globalState => {
    if (globalState == null) return null;

    return globalState.get('profile');
  });

export { makeSelectLocation, makeSelectFirebase, makeSelectProfile };
