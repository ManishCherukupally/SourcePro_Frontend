import React, { useEffect, useState } from 'react'
import Mycourses from '../components/MyCourses/Mycourses'
import { useNavigate } from 'react-router-dom'
import client from '../API/api'

const MycoursesPage = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        client.get("mycourses/", {
            withCredentials: true
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
            {auth && <Mycourses />}
        </div>
    )
}

export default MycoursesPage
