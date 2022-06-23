import {persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import info from './reducers/info';


const persistConfig = {key : 'root',storage}

const rootReducer = combineReducers({
  info
})



const store =  configureStore({
  reducer : persistReducer(
    persistConfig,
    rootReducer,
  )
})

export {store}
