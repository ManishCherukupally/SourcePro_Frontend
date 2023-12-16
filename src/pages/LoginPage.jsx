import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'
// import Home from '../components/Home';

const LoginPage = () => {
  // const navigate = useNavigate()
  // const [auth, setAuth] = useState(false)
  // // const token = window.localStorage.getItem("mytoken")
  // var isLoggedIn = window.localStorage.getItem("encsrftok")
  // if (isLoggedIn) {
  //   navigate("/home")

  // }
  // else {
  //   setAuth(true)
  // }
  return (

    <div>

      {/* {auth && <LoginForm />} */}
      <LoginForm />

    </div>
  )
}

export default LoginPage
