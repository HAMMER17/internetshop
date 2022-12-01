import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsFillCartPlusFill } from 'react-icons/bs'
import '../style/navbar.css'
import { signOut } from "firebase/auth";
import { auth } from '../firebase'

const Navbar = ({ user, sum, current }) => {
  const navigate = useNavigate()
  const outUser = () => {
    signOut(auth).then(() => {
      navigate('/login')
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div className='navbar'>
      <Link to={'/'}><h2>INTERNET-SHOP</h2></Link>
      {user && <div className='cart'>
        <h5 style={{ fontSize: 20 }}>{sum}<span> p</span></h5>

        <Link to={'basket'}>
          <div className='current'>
            <div className='navCurrent'>{current} </div>
            <BsFillCartPlusFill className='cartCart' />
          </div>
        </Link>

        <h3 className='navH3'>{user}</h3>
        <button className='navBtn' onClick={outUser}>logout</button>
      </div>}
      {!user && <div>
        <Link className='link' to={'login'}>Login</Link>
        <Link className='link' to={'register'}>Sign Up</Link>
      </div>}
    </div>
  )
}

export default Navbar
