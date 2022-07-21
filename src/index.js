import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import { store } from './app/store';
import { fetchCategories } from './features/quiz/quizSlice';
const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(fetchCategories())

root.render(
  <Provider store={store}>
    <App />
  </Provider>

);

