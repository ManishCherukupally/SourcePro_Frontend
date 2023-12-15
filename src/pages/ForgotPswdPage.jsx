import ForgetPassword from "../components/ForgetPassword";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../API/api'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    client.post("otp/").then((resp) => {
      if (resp.data.status === 'unauthorized_user') {
        navigate("/")
      }
      else {
        setAuth(true)
      }
    })
  })
  return (
    <div>
      {auth && <ForgetPassword />}
    </div>
  )
}

export default ForgotPassword
