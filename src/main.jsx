import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer position='top center' />
  </Provider>
);
