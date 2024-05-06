import React, { useEffect, useState } from 'react'
import UserManagementComp from '../HCT components/UseManagement/UserManagementComp'
import { useNavigate } from 'react-router-dom'
import client from '../../API/api'

const UserManagementPage = () => {
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        client.get("pagination/", {
            withCredentials: true,
            params: {
                page: 1
            }
        }).then((resp) => {
            console.log(resp.data)
            if (resp.data.status === 'unauthorized_user') {
                navigate("/hct/login")
            }
            else {
                setAuth(true)
            }
        })
    })
    return (
        <div>
            {auth && <UserManagementComp />}
        </div>
    )
}

export default UserManagementPage
