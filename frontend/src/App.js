import './App.css';
import {React,useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Cover from './components/Cover';
import Home from './components/Home'

function App({google}) {
  const [apiKey,setApiKey] = useState(sessionStorage.getItem("apiKey"))
  
  return (
    <div className="App">
      <Router>
        <nav>

        </nav>
        <Routes>
          <Route path='' element={<Navigate to="/cover"></Navigate>}></Route>

          <Route path='/cover' element={<Cover setApiKey={setApiKey}></Cover>}></Route>

          <Route path='/home' element={<Home google={google} apiKey={apiKey}></Home>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
