import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import Home from '../components/Home';

const LoginPage = () => {
  var isLoggedIn = localStorage.getItem("encsrftok")

  if (isLoggedIn) {
    return (

      <div>
        <Home />

      </div>
    )
  }
  else {
    <div>
      <LoginForm />
    </div>
  }

}

export default LoginPage
