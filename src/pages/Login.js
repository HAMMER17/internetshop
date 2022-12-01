import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [sms, setSms] = useState('')
  const [err, setErr] = useState('')

  const navigate = useNavigate()
  const getUser = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSms('Success welcome')
        setEmail('')
        setPassword('')
        setTimeout(() => {
          navigate('/')
        }, 2000)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErr('Error invalid login')
        console.log(errorCode, errorMessage)
      });
  }
  return (
    <div className='register'>
      <h1 className='registerH1'>{sms}</h1>
      <form action="" className='form' onSubmit={getUser}>
        <h1>LOGIN</h1>
        <label htmlFor="">Email</label>
        <input className='input' type="text" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="">Password</label>
        <input className='input' type="text" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button className='inputBtn'>login</button>
        <p>Do not you nave an account? Here</p><Link to={'/register'}>Register</Link>
        <span style={{ color: 'red' }}>{err}</span>
      </form>

    </div>
  )
}

export default Login
