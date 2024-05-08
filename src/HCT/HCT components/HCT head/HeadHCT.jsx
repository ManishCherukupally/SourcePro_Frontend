import React, { useEffect, useState } from 'react'

import { ActionIcon, Box, Card, Container, Divider, Flex, Grid, Group, Image, SimpleGrid, Space, Tabs, TextInput, Title, Tooltip, Text, Menu, Select } from '@mantine/core'


import { BiSearch } from 'react-icons/bi'
import { BsChevronDown } from 'react-icons/bs'

import { AiFillHome } from 'react-icons/ai'

import { FaBookOpen } from 'react-icons/fa'

import { MdChevronLeft, MdHome, MdPerson } from 'react-icons/md'

// import Mycourses from '../MyCourses/Mycourses'

// import Mydetails from '../Mydetails'

// import EditDetails from '../EditDetails'
import { Link, useNavigate, useParams } from 'react-router-dom'

// import Book from '../assets/';

// import Book1 from '../../assets/book1.png';

import User1 from '../../../assets/user1.png';

import User from '../../../assets/user.png';

import Home from '../../../assets/home.png';

import Home1 from '../../../assets/home1.png';


// import ChangePassword from '../ChangePassword'

// import Transaction from '../Transaction'
import { render } from '@testing-library/react'
// import axios from 'axios'
// import client from '../../API/api'
// import Cookies from 'js-cookie';
import { Cookies, useCookies } from 'react-cookie'
import { useMediaQuery } from '@mantine/hooks'
import axios from 'axios'
import client from '../../../API/api'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'
const HeadHCT = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        try {
            client.get("logout/", {
                withCredentials: true
            }).then((resp) => {
                if (resp.data.status === "Logged_out") {
                    // removeToken(['sessionid']);
                    window.localStorage.clear()
                    // Optionally, redirect user to login page
                    window.location.href = "/hct/login";
                }
            })
            // window.location.href = "/hct/login";
        }
        catch (err) {
            console.error(err)
        }

    }

    return (
        <>
            <nav >
                <Flex align={"center"} justify={"space-between"}>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                        <a href='http://healthcoachsaiteja.com/'>
                            <Image
                                style={{ margin: 50 }}
                                maw={120}
                                src={"https://lh3.googleusercontent.com/proxy/-ptEoCXQaGeaX0l_w5gA1iSfkLmjCIt9tMW9UtQE6OiQh2taj9X1HNgEQfh6r9d5hshNtcVK5o9wdgxMUbHWsUiibVkJ73TMy90VAJ-pt2QpPlAYk2OH-NsTfjue0JcSnhBRQd3iLuSVFrjmLw"} /></a>

                        {/* <Select searchable nothingFound="No related courses" fz={18} w={400} radius={"md"} variant='filled'
                            placeholder='Search course'
                            icon={<ActionIcon><BiSearch /></ActionIcon>} data={["react", "Js"]}
                        // {data.map((option) => {
                        //   return {
                        //     value: option.value,
                        //     label: option.course_name,
                        //   };
                        // })} 
                        /> */}
                    </Box>

                    <Box pt={13} style={{ display: "flex", alignItems: "center" }}>
                        <Box w={80} className='hctHeadicon'
                            style={{
                                borderBottom: `${window.location.pathname === "/hct/dashboard" ? "4px solid #F09A3E" : ""}`
                            }}
                        >
                            <Link to={"/hct/dashboard"}>
                                <Image width="23px" src={window.location.pathname === "/hct/dashboard" ? Home1 : Home} ></Image>
                            </Link>
                        </Box>

                        {/* <Box h={"100%"} w={80} className='iconbox'
                            style={{
                                borderBottom: `${window.location.pathname === "/mycourses" ? "3px solid #F09A3E" : ""}`
                            }}
                        >
                            <Link to={"/mycourses"}>
                                <Image width="25px" src={window.location.pathname === "/mycourses" ? Book1 : Book} ></Image>
                            </Link>
                        </Box> */}

                        <Box h={"100%"} w={80} className='hctHeadicon'
                            style={{
                                borderBottom: window.location.pathname === '/hct/usermanagement' ? '4px solid #F09A3E' : "",
                            }}
                        >
                            <Menu position="top" withArrow shadow="md"
                                width={200}
                                styles={{
                                    dropdown: {
                                        position: "fixed",
                                        zIndex: 999,
                                    },
                                }}>
                                <Menu.Target>
                                    <Image width="20px" src=
                                        {window.location.pathname === '/hct/usermanagement' ? User1 : User}  ></Image>
                                </Menu.Target>

                                <Menu.Dropdown >
                                    {/* <Menu.Item className='menutext' onClick={() => {
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
                                    */}
                                    <Menu.Item className='menutext' onClick={() => {
                                        navigate('/hct/usermanagement')
                                    }}>
                                        User Management
                                    </Menu.Item>
                                    <Divider ml={'sm'} mr={"sm"} />
                                    <Menu.Item className='menutext' onClick={handleLogout}>
                                        Logout
                                    </Menu.Item>

                                </Menu.Dropdown>
                            </Menu>
                        </Box>
                    </Box>
                </Flex>
            </nav>
            <Divider />
        </>
    );
}

export default HeadHCT

