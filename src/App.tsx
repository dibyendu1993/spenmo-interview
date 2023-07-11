import React from 'react';
import './App.css';
import HomePage from './Screens/HomePage';
import {
  Routes, Route
} from "react-router-dom";
import ShowDetails from './Screens/Showdetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="showDetails/:id" element={<ShowDetails />} />
      </Routes>
    </div>
  );
}

export default App;
