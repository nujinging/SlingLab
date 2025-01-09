import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import memeReducer from "./memeReducer";

const rootReducer = combineReducers({
  meme: memeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
