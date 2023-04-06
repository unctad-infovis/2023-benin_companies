import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './jsx/App.jsx';

let lang = 'en';
if (window.location.href.includes('/fr/')) {
  lang = 'fr';
}
if (window.location.href.includes('/es/')) {
  lang = 'es';
}

const container = document.getElementById('app-root-2023-benin_companies');
const root = createRoot(container);
root.render(<App lang={lang} />);
