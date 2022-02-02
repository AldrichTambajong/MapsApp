import {React,useEffect,useRef} from 'react';
import {useNavigate} from "react-router-dom"

function Cover() {
    let path = useNavigate()
  return (
      <div>
          <div>
              <h1>Sample Test Page</h1>
              <h3>Click button to redirect to home page</h3>
              <button onClick={() => path("/home")}>Click</button>
            </div>
      </div>
  );
}

export default Cover;
