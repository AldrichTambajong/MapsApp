import React from 'react'

function Login() {
    function login(){

    }

    function signUp(){

    }
  return (
    <div>
        <h1>login</h1>
        <form method="POST" onSubmit={e => login(e)}>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <input type="submit" value="Login"></input>
        </form>
        <form method="POST" onSubmit={e => signUp(e)}>
            <input type="text" placeholder="First name"></input>
            <input type="text" placeholder="Last name"></input>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <input type="submit" value="Sign Up"></input>
        </form>
    </div>
  )
}

export default Login