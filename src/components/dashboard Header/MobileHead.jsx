import React, { useState } from 'react'
import { ActionIcon, Box, Card, Container, Divider, Flex, Grid, Group, Image, SimpleGrid, Space, Tabs, TextInput, Title, Tooltip, Text, Menu, Select } from '@mantine/core'
import Book from '../../assets/book.png';

import Book1 from '../../assets/book1.png';

import User1 from '../../assets/user1.png';

import User from '../../assets/user.png';

import Home from '../../assets/home.png';

import Home1 from '../../assets/home1.png';
import client from '../../API/api'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { useCookies } from 'react-cookie';

const MobileHead = () => {
    const mediumScreen = useMediaQuery("(min-width: 900px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const navigate = useNavigate();
    const course = useParams()
    const lessonId = useParams()
    const [data, setData] = useState([]);
    const [token, setToken, removeToken] = useCookies(['sessionid']);


    const handleLogout = () => {
        try {
            client.get("logout/", {
                withCredentials: true
            }).then((resp) => {
                if (resp.data.status === "Logged_out") {
                    removeToken(['sessionid']);
                    window.localStorage.clear()
                    // Optionally, redirect user to login page
                    window.location.href = "/";
                }
            })
        }
        catch (err) {
            console.error(err)
        }

    }
    return (
        <div>
            <Flex style={{ zIndex: 2, position: "fixed", bottom: 20, left: 57, right: 58 }} align={"center"} justify={"center"}>

                <Card withBorder p={0} w={220} h={40} bg={"white"} radius={"xl"}>
                    <Box p={8} style={{ display: "flex", alignItems: "center" }}>
                        <Box w={80} className='iconbox'
                        // style={{
                        //     borderBottom: `${window.location.pathname === "/home"
                        //         || window.location.pathname === `/courseplayer/${course.courseid}/${lessonId.lessonid}` ? "3px solid #F09A3E" : ""}`
                        // }}
                        >
                            <Link to={"/home"}>
                                <Image width="23px" src={window.location.pathname === "/home" ||
                                    window.location.pathname === `/courseplayer/${course.courseid}/${lessonId.lessonid}` ? Home1 : Home} ></Image>
                            </Link>
                        </Box>

                        <Box h={"100%"} w={80} className='iconbox'
                        // style={{
                        //     borderBottom: `${window.location.pathname === "/mycourses" ? "3px solid #F09A3E" : ""}`
                        // }}
                        >
                            <Link to={"/mycourses"}>
                                <Image width="25px" src={window.location.pathname === "/mycourses" ? Book1 : Book} ></Image>
                            </Link>
                        </Box>

                        <Box h={"100%"} w={80} className='iconbox'
                        // style={{
                        //     borderBottom: window.location.pathname === '/mydetails' || window.location.pathname === '/mydetails/editdetails' ||
                        //         window.location.pathname === '/changepassword' ||
                        //         window.location.pathname === '/trainingsubcriptions' ? '3px solid #F09A3E' : "",
                        // }}
                        >
                            <Menu withArrow shadow="md"
                                width={200}
                                styles={{
                                    dropdown: {
                                        position: "fixed",
                                        zIndex: 999,
                                    },
                                }}>
                                <Menu.Target>
                                    <Image width="20px" src=
                                        {window.location.pathname === '/mydetails' || window.location.pathname === '/mydetails/editdetails' ||
                                            window.location.pathname === '/changepassword' ||
                                            window.location.pathname === '/trainingsubscriptions' ? User1 : User}  ></Image>
                                </Menu.Target>

                                <Menu.Dropdown >
                                    <Menu.Item className='menutext' onClick={() => {
                                        navigate("/mydetails");
                                    }}>
                                        My details
                                    </Menu.Item>

                                    <Menu.Item className='menutext' onClick={() => {
                                        navigate("/changepassword");
                                    }}>
                                        Change Password
                                    </Menu.Item>

                                    <Menu.Item className='menutext' onClick={() => {
                                        navigate("/trainingsubscriptions");
                                    }}>
                                        Training Subscription
                                    </Menu.Item>
                                    <Divider />

                                    <Menu.Item className='menutext' onClick={handleLogout}>
                                        Logout
                                    </Menu.Item>

                                </Menu.Dropdown>
                            </Menu>
                        </Box>
                    </Box>

                </Card>
            </Flex>
        </div>
    )
}

export default MobileHead
