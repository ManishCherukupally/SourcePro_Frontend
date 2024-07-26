import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TemplateComp from '../HCT components/HCT Template/TemplateComp'
import client from '../../API/api'

const TemplatePage = () => {
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
            {auth && <TemplateComp />}
            {/* <TemplateComp /> */}
        </div>
    )
}

export default TemplatePage
