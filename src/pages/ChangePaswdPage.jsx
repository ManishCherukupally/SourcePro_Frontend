import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChangePassword from '../components/ChangePassword'
import client from '../API/api'

const ChangePaswdPage = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    client.get("home/").then((resp) => {
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
      {auth && <ChangePassword />}
      {/* <ChangePassword /> */}
    </div>
  )
}

export default ChangePaswdPage
