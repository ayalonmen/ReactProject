import { applyMiddleware,createStore,combineReducers } from 'redux';
import { promiseMiddleware,localStorageMiddleware } from './middleware';

//Reducers
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';
import article from './reducers/article';
import articleList from './reducers/articleList';
import profile from './reducers/profile';


const reducer = combineReducers ({
    common,
    auth,
    home,
    settings,
    article,
    articleList,
    profile
});
const store = createStore(reducer,applyMiddleware(promiseMiddleware,localStorageMiddleware));

export default store;