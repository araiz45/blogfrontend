import React, { useState } from 'react'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  async function register(ev) {
    ev.preventDefault();
    console.log(username)
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'}
    })
    // console.log(response)
    if(response.status === 200){
      alert('Registration successeed')
    }else{
      alert("Registration Failed")
    }
  }
  return (
    <>
    <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input type="text" name="username" id="username" placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="password" name="password" id="password" placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button type="submit">Register</button>
    </form>
    </>
  )
}

export default RegisterPage