import { ActionIcon, AppShell, Card, Divider, Flex, Grid, Paper, Tabs, TextInput, Image, Title, Container, Group, Text, Space, SimpleGrid, UnstyledButton } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiArrowBack, BiSearch } from 'react-icons/bi'
import { FaBookOpen } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import { Link, unstable_HistoryRouter, useNavigate } from 'react-router-dom'
// import axios from "axios"
import client from '../../API/api'
import { useMediaQuery } from '@mantine/hooks'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'

const MydetailsComp = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        client.get("user_details/", {
            withCredentials: true
        })

            .then(res => {
                console.log(res.data)
                setData(res.data);
            })


            .catch(err => {
                console.error('Error Fetching:', err)
            })
    }, [])


    return (
        <div>
            <Container size={"xl"} style={{ margin: "1rem", marginLeft: mediumScreen ? "4rem" : "0rem" }}>
                <Card pl={mediumScreen ? "1rem" : 0} >
                    <Group align={"center"} position={mediumScreen ? "apart" : "left"}>
                        {mediumScreen ? (null) : (<div>
                            <ActionIcon size={"sm"} onClick={() => navigate(-1)}>< BiArrowBack /></ActionIcon>
                        </div>)}


                        <Flex align={"end"} gap={10} >
                            <Title fw={500} size={24}>My Details </Title>

                            <UnstyledButton

                                onClick={() => navigate("/mydetails/editdetails")} className='editbtn'
                                style={{ textDecoration: "none", paddingBottom: 4 }}>EDIT </UnstyledButton>
                        </Flex>

                    </Group>

                </Card>
                <Divider />

                <Space h={15} />

                <Container ml={mediumScreen ? "0rem" : "1.3rem"}>
                    <SimpleGrid cols={mediumScreen ? 2 : 1}>
                        <Flex direction={"column"}>
                            <Text color='dimmed' fz={14} fw={600}>Name</Text>
                            <Text fw={600} fz={18}>
                                {data?.
                                    // @ts-ignore
                                    user_details?.name}
                            </Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text color='dimmed' fz={14} fw={600}>Contact No.</Text>
                            <Text fw={600} fz={18}>
                                {data?.
                                    // @ts-ignore
                                    user_details?.contact_no}</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text color='dimmed' fz={14} fw={600}>Company</Text>
                            <Text fw={600} fz={18}>
                                {data?.
                                    // @ts-ignore
                                    user_details?.company}</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text color='dimmed' fz={14} fw={600}>Email</Text>
                            <Text fw={600} fz={18}>
                                {data?.
                                    // @ts-ignore
                                    user_details?.business_email}</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text color='dimmed' fz={14} fw={600}>Years of Experience</Text>
                            <Text fw={600} fz={18}>
                                {data?.
                                    // @ts-ignore
                                    user_details?.years_of_experience}</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text color='dimmed' fz={14} fw={600}>Job Position</Text>
                            <Text fw={600} fz={18}>
                                {data?.
                                    // @ts-ignore
                                    user_details?.job_position}</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text color='dimmed' fz={14} fw={600}>Location</Text>
                            <Text fw={600} fz={18}>{
                                // @ts-ignore
                                data?.user_details?.location}</Text>
                        </Flex>
                    </SimpleGrid>

                </Container>

            </Container>
        </div>
    )
}

export default MydetailsComp
