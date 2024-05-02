import { Text } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import client from '../API/api'

const DashboardHCT = () => {
    const [hctData, setHctData] = useState({})

    useEffect(() => {
        client.get("all_users_status/")
            .then((resp) => {
                setHctData(resp.data.status)
            })
    }, [])
    return (
        <div>
            <Text>Total users: {hctData.total_users}</Text>
            <Text>Active users: {hctData.active}</Text>
            <Text>Inactive users: {hctData.inactive}</Text>
        </div>
    )
}

export default DashboardHCT
