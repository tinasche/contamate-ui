import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import EditContact from './EditContact.jsx';

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <StrictMode>
    <main className='container my-4'>
    <Routes>
        <Route path="/" element={<App />} title="Home" />
        <Route path="/edit/:contactId" element={<EditContact />} title="Edit Contact" />
    </Routes>
    </main>
  </StrictMode>
  </BrowserRouter>
);
