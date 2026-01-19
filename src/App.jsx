import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SattvaPortal from './pages/SattvaPortal';
import { LanguageProvider } from './context/LanguageContext';
import ForkliftPortal from './pages/ForkliftPortal';
import AdminPortal from './pages/AdminPortal';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sattva" element={<SattvaPortal />} />
          <Route path="/forklift" element={<ForkliftPortal />} />
          <Route path="/admin" element={<AdminPortal />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
