import React, { useEffect, useState } from 'react'
import DashboardHCT from '../HCT components/HCTDashboardComp/DashboardHCT'
import HeadHCT from '../HCT components/HCT head/HeadHCT'
import { AppShell, Header } from '@mantine/core'
import DashboardComp from '../HCT components/HCTDashboardComp/DashboardComp'
import { useNavigate } from 'react-router-dom'
import client from '../../API/api'

const DashboardHCTPage = () => {
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        client.get("all_users_status/", {
            withCredentials: true
        }).then((resp) => {
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
            {auth && <DashboardComp />}

        </div>
    )
}

export default DashboardHCTPage
