import auth from 'src/reducers/auth';
import app from 'src/reducers/app';
import { combineReducers } from 'redux';

export default combineReducers({auth, app});