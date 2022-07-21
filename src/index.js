import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import { store } from './app/store';
import { fetchCategories } from './features/quiz/quizSlice';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient(QueryClientProvider);
const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(fetchCategories())

root.render(
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <App />
  </Provider>
  </QueryClientProvider>

);

