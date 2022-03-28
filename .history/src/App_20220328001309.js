import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import FirstPage from './pages/firstPage/firstPage';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route exact path='/' element={<FirstPage />} />
      </Routes>
    </div>
  );
}

export default App;
