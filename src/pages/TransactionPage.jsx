import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Transaction from '../components/Transaction'
import client from '../API/api'

const TransactionPage = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    client.get("training_subscription/", {
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
      {
        auth && <Transaction />
      }

    </div>
  )
}

export default TransactionPage
