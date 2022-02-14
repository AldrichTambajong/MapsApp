import './App.css';
import {React,useState,useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Cover from './components/Cover';
import Home from './components/Home';
import Login from './components/Login';

function App({google}) {
  const [apiKey,setApiKey] = useState(sessionStorage.getItem("apiKey"))
  const [userCoords,setUserCoords] = useState(JSON.parse(sessionStorage.getItem("userCoords")))
  
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(
      function(position) {
          var userLoc = {'lat':position.coords.latitude,'lng':position.coords.longitude}
      console.log(userLoc)
      sessionStorage.setItem("userCoords",JSON.stringify(userLoc))
      setUserCoords(JSON.parse(sessionStorage.getItem("userCoords")))
      console.log("latitude is: ",position.coords.latitude)
      console.log("longitude is:",position.coords.longitude)
      }
  )
      fetch('/requestKey')
      .then(response => response.json())
      .then(data =>{
          sessionStorage.setItem("apiKey",data.accessKey)
          setApiKey(sessionStorage.getItem("apiKey",data.accessKey))
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="App">
      <Router>
        <nav>

        </nav>
        <Routes>
          <Route path='' element={<Navigate to="/login"></Navigate>}></Route>

          <Route path='/login' element={<Login></Login>}></Route>

          <Route path='/home' element={<Home google={google} apiKey={apiKey} userCoords={userCoords}></Home>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
