import React, { useEffect, useState } from 'react'
import Home from '../components/Home'
import client from '../API/api'
import { useNavigate } from 'react-router-dom'
// import HomeComp from '../components/HomeComp'

const HomePage = () => {
  const navigate = useNavigate()
  var isLoggedIn = window.localStorage.getItem("encsrftok")
  const [auth, setAuth] = useState(false)
  // useEffect(() => {
  //   client.get("home/", {
  //     withCredentials: true
  //   }).then((resp) => {
  //     if (resp.data.status === 'unauthorized_user') {
  //       navigate("/")
  //     }
  //     else {
  //       setAuth(true)
  //     }
  //   })
  // })
  if (isLoggedIn) {
    setAuth(true)
  }
  else {
    navigate("/")
  }
  return (
    <div>
      {auth &&
        <Home />}
    </div>
  )
}

export default HomePage
