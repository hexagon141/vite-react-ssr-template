import {App} from './app';
import {hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

hydrateRoot(
  document.getElementById('app')!,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
