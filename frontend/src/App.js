import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Cover from './components/Cover';
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <nav>

        </nav>
        <Routes>
          <Route path='' element={<Navigate to="/cover"></Navigate>}></Route>

          <Route path='/cover' element={<Cover></Cover>}></Route>

          <Route path='/home' element={<Home ></Home>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
