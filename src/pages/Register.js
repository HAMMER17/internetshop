import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

import '../style/register.css'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [sms, setSms] = useState('')
  const navigate = useNavigate()

  const createUser = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password, firstName)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          Name: firstName, email, password,
        })
          .then(() => {
            setSms("You registred ! Welcome !!")
            setFirstName('')
            setEmail('')
            setPassword('')
            setTimeout(() => {
              navigate('/')
            }, 2000)
          })
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }
  return (
    <div className='register'>
      <h1 className='registerH1'>{sms}</h1>
      <form action="" className='form' onSubmit={createUser}>
        <h1>REGISTER</h1>
        <label htmlFor="">Name</label>
        <input className='input' type="text" value={firstName}
          onChange={(e) => setFirstName(e.target.value)} />
        <label htmlFor="">Email</label>
        <input className='input' type="text" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="">Password</label>
        <input className='input' type="text" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button className='inputBtn'>register</button>
        <p>Do you have an account? Here</p> <Link to={'/login'}>Login</Link>
      </form>
    </div>
  )
}

export default Register
