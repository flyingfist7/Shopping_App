import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Store } from './Context';
import { Page1, Page2 } from './Pages';
import './App.css';

function App() {
  return (
    <Store>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/cart" element={<Page2 />} />
        </Routes>
      </BrowserRouter>
    </Store>
  );
}

export default App;