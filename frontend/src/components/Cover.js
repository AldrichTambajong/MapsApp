import {React,useEffect} from 'react';
import {useNavigate} from "react-router-dom"

function Cover(props) {
    let path = useNavigate()

    useEffect(()=> {
        fetch('/requestKey')
        .then(response => response.json())
        .then(data =>{
            sessionStorage.setItem("apiKey",data.accessKey)
            props.setApiKey(sessionStorage.getItem("apiKey",data.accessKey))
        })
    })
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
