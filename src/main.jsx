import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

/* Aktifkan mode scroll-reveal sebelum React me-render konten
   agar tidak terjadi flash konten tampak lalu menghilang. */
document.documentElement.classList.add('js-ready');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
