import { Card, Container, Flex, Space, Text } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import client from '../../../API/api'
import { useMediaQuery } from '@mantine/hooks'
import Piechart from '../graphs/Piechart'

const DashboardHCT = () => {
    const mediumScreen = useMediaQuery("(min-width: 1100px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const [hctData, setHctData] = useState({})

    useEffect(() => {
        client.get("all_users_status/")
            .then((resp) => {
                setHctData(resp.data.status)
            })
            .catch(err => console.error(err))
    }, [])
    return (
        <div>
            <Container mt={mediumScreen ? "7rem" : "2rem"} size={"xl"}>
                <Text fz={22} fw={600}>Dashboard</Text>
                <Space h={15} />

                <Card maw={350} h={350} style={{ backgroundColor: "#F5F5F5" }}>

                    <Piechart data={hctData} />
                    <Flex justify={"center"}>
                        <Text fw={600} fz={18}>Total members: {hctData.total_users}</Text>
                    </Flex>
                </Card>
            </Container>
        </div>
    )
}

export default DashboardHCT
