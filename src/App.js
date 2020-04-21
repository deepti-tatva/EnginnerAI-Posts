import React, { Suspense} from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Routes } from './Routes';

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback ="">
      <Routes></Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
