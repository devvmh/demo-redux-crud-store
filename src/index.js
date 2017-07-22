import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import store from './configure-store';

import App from './App';
import Posts from './Posts';
import Post from './Posts/show.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/posts" component={Posts} />
        <Route path="/posts/:id" component={Post} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
