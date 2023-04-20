import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./containers/store/store";
// import fetchArticles from './containers/store/thunks';


// store.subscribe(()=>{console.log(store.getState())})
// store.dispatch(fetchArticles());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

