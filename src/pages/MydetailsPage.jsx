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
        window.localStorage.setItem("username", resp.data.user_details.name)
        window.localStorage.setItem("contact_no", resp.data.user_details.contact_no)
        window.localStorage.setItem("company", resp.data.user_details.company)
        window.localStorage.setItem("business_email", resp.data.user_details.business_email)
        window.localStorage.setItem("years_of_experience", resp.data.user_details.years_of_experience)
        window.localStorage.setItem("job_position", resp.data.user_details.job_position)
        window.localStorage.setItem("location", resp.data.user_details.location)
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
