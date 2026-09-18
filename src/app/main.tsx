import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.scss';

import '@shared/lib/telegram';
import '@shared/config/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
