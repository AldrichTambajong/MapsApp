import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ='' element={<Navigate to="/cover"></Navigate>}></Route>

          <Route path='/cover' element={
            <div>
              <h1>Test Page</h1>
            </div>
          }></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
