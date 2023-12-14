import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Mydetails from '../components/Mydetails'
import client from '../API/api'

const MydetailsPage = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    client.get("user_details/", {
      withCredentials: true,

    }).then((resp) => {
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
      {auth && <Mydetails />}
    </div>
  )
}

export default MydetailsPage
