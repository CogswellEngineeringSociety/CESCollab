/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

const PREFIX = 'CESCollab/App';

// For initializing state with firebase
const APP_LOADED = `${PREFIX}/APP_LOADED`;

const REGISTER = `${PREFIX}/REGISTER`;
const REGISTERED = `${PREFIX}/REGISTER`;

const LOG_IN = `${PREFIX}/LOG_IN`;
const LOGGED_IN = `${PREFIX}/LOGGED_IN`;

const LOG_OUT = `${PREFIX}/LOG_OUT`;
const LOGGED_OUT = `${PREFIX}/LOGGED_OUT`;

// Or is it just error occured fine?

export {
  APP_LOADED,
  REGISTER,
  REGISTERED,
  LOG_IN,
  LOGGED_IN,
  LOG_OUT,
  LOGGED_OUT,
};
