import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function handleSubmit (e){
    e.preventDefault();
    console.log(username, password)
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if(response.ok){
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        setRedirect(true)

      })
    }else{
      alert("wrong credentials")
    }
  }

  if(redirect) {
    return <Navigate to={'/'} />
  }
  return (

    <>
    <form className="login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="text" name="username" id="username" placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="password" name="password" id="password" placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button type="submit">Login</button>
    </form>
    </>
  )
}

export default LoginPage