import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GeneratePerson from './pages/GeneratePerson';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<GeneratePerson />} />
      </Routes>
    </>
  );
}

export default App;
