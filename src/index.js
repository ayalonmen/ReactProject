import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';

import App from './components/app';
import store from './store';
import Login from './components/Login';
import Home from './components/home';
import Register from './components/Register';
import Settings from './components/Settings';
import Article from './components/Article';
import Profile from './components/Profile';
import ProfileFavorite from './components/profileFavorites';





ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="login" component={Login} />
                <Route path="register" component={Register} />
                <Route path="settings" component={Settings} />
                <Route path="article/:id" component={Article} />
                <Route path="@:username" component={Profile} />
                <Route path="@:username/favorites" component={ProfileFavorite} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));
