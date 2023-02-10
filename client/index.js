import React from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import App from './Components/App.jsx';
import './public/styles.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
