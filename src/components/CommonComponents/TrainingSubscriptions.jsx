import { Card, Flex, Group, Paper, Image, ActionIcon, TextInput, Tabs, Grid, Divider, Container, Title, Space, Text, SimpleGrid } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiArrowBack, BiSearch } from 'react-icons/bi'
import { FaBookOpen } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
// import axios from 'axios'
import client from '../../API/api'
import { useMediaQuery } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'
const TrainingSubscriptions = () => {
    const navigate = useNavigate()
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        client.get("training_subscription/", {
            withCredentials: true,
        })
            .then(response => {
                console.log('Fetched data:', response.data["Training_Subscription"]);
                setSubscriptions(response.data["Training_Subscription"])
            })
            .catch(err => {
                console.error(err);
            }
            )
    }, [])
    return (
        <div>
            <Container size={"xl"} style={{ margin: "1rem", marginLeft: mediumScreen ? "4rem" : "0rem" }}>
                <Card pl={mediumScreen ? "1rem" : 0}>
                    <Group>
                        {mediumScreen ? (null) : (<div>
                            <ActionIcon size={"sm"} onClick={() => navigate(-1)}>< BiArrowBack /></ActionIcon>
                        </div>)}
                        <Title fw={500} size={24}>Training Subscription </Title>
                    </Group>
                </Card>
                <Divider />

                <Space h={15} />
                <Container pl={'lg'} size={"lg"}>
                    <>
                        {subscriptions.map(data => (
                            <div key={data?.
                                // @ts-ignore
                                Course_name}>


                                <Text fw={600}>{data?.
                                    // @ts-ignore
                                    Course_name}</Text>
                                <Space h={5} />
                                <Card style={{ padding: 0 }}>
                                    {
                                        mediumScreen ? (
                                            <>
                                                <Flex align={"center"}>
                                                    <Text c={"dimmed"} fw={500} fz={"sm"}>Date :</Text>
                                                    <Space w={5} />
                                                    <Text fw={500} fz={"sm"} >{new Date(data.subscription_date).toLocaleDateString('en-GB')}</Text>
                                                </Flex>

                                                <Space h={5} />
                                                <Flex align={"center"}>
                                                    <Text c={"dimmed"} fw={500} fz={"sm"}>Time :</Text>
                                                    <Space w={5} />
                                                    <Text fw={500} fz={"sm"}>{data?.
                                                        // @ts-ignore
                                                        subscription_time}</Text>
                                                </Flex>
                                            </>
                                        ) : (
                                            <Group position='apart'>
                                                <Flex align={"center"}>
                                                    <Text c={"dimmed"} fw={500} fz={"sm"}>Date :</Text>
                                                    <Space w={5} />
                                                    <Text fw={500} fz={"sm"} >{new Date(data.subscription_date).toLocaleDateString('en-GB')}</Text>
                                                </Flex>

                                                <Space h={5} />
                                                <Flex align={"center"}>
                                                    <Text c={"dimmed"} fw={500} fz={"sm"}>Time :</Text>
                                                    <Space w={5} />
                                                    <Text fw={500} fz={"sm"}>{data?.
                                                        // @ts-ignore
                                                        subscription_time}</Text>
                                                </Flex>
                                            </Group>
                                        )
                                    }

                                    <Space h={5} />
                                    <Flex align={"center"}>
                                        <Text c={"dimmed"} fw={500} fz={"sm"}>Order ID :</Text>
                                        <Space w={5} />
                                        <Text fw={500} fz={"sm"}>{data?.
                                            // @ts-ignore
                                            order_id}</Text>
                                    </Flex>
                                    <Space h={5} />
                                    <Flex align={"center"}>
                                        <Text c={"dimmed"} fw={500} fz={"sm"}>Amount :</Text>
                                        <Space w={5} />
                                        <Text fw={500} fz={"sm"}>Rs {data?.
                                            // @ts-ignore
                                            amount}</Text>

                                    </Flex>
                                </Card>
                                <Space h={15} />
                                <Divider variant='dashed' />
                                <Space h={15} />

                            </div>
                        ))}
                    </>
                </Container>
            </Container>
        </div>
    )
}

export default TrainingSubscriptions
