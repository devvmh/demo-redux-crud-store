import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import store from './configure-store';

import App from './App';
import PostIndex from './Posts';
import PostShow from './Posts/show.js';
import PostEdit from './Posts/edit.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/posts/:id/edit" component={PostEdit} />
        <Route path="/posts/:id" component={PostShow} />
        <Route path="/posts" component={PostIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
