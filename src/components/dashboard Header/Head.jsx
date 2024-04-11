import React, { useEffect, useState } from 'react'

import { ActionIcon, Box, Card, Container, Divider, Flex, Grid, Group, Image, SimpleGrid, Space, Tabs, TextInput, Title, Tooltip, Text, Menu, Select } from '@mantine/core'


import { BiSearch } from 'react-icons/bi'
import { BsChevronDown } from 'react-icons/bs'

import { AiFillHome } from 'react-icons/ai'

import { FaBookOpen } from 'react-icons/fa'

import { MdChevronLeft, MdHome, MdPerson } from 'react-icons/md'

import Mycourses from '../MyCourses/Mycourses'

import Mydetails from '../Mydetails'

import EditDetails from '../EditDetails'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Book from '../../assets/book.png';

import Book1 from '../../assets/book1.png';

import User1 from '../../assets/user1.png';

import User from '../../assets/user.png';

import Home from '../../assets/home.png';

import Home1 from '../../assets/home1.png';


import ChangePassword from '../ChangePassword'

import Transaction from '../Transaction'
import { render } from '@testing-library/react'
// import axios from 'axios'
import client from '../../API/api'
// import Cookies from 'js-cookie';
import { Cookies, useCookies } from 'react-cookie'
import { useMediaQuery } from '@mantine/hooks'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'
const Head = () => {
  const mediumScreen = useMediaQuery("(min-width: 900px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");
  const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
  const navigate = useNavigate();
  const course = useParams()
  const lessonId = useParams()
  const [data, setData] = useState([]);
  const [token, setToken, removeToken] = useCookies(['sessionid']);

  // console.log(data)
  // useEffect(() => {
  //   client.get("home/", {
  //     withCredentials: true
  //   })

  //     .then((resp) => {
  //       if (resp.data.status === 'unauthorized_user') {
  //         navigate("/")
  //       }
  //       else {
  //         const courses = resp.data["All_Courses"];
  //         setData(courses);
  //       }

  //     })
  // }, [])
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
    <>
      <nav >
        <Flex align={"center"} justify={"space-between"}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <a href='https://www.sourceprotraining.com'>
              <Image
                style={{ margin: 50 }}
                maw={120}
                src={"https://www.sourceprotraining.com/wp-content/uploads/2021/09/logo.png"} /></a>

            <Select searchable nothingFound="No related courses" fz={18} w={400} radius={"md"} variant='filled'
              placeholder='Search course'
              icon={<ActionIcon><BiSearch /></ActionIcon>} data={["react", "Js"]}
            // {data.map((option) => {
            //   return {
            //     value: option.value,
            //     label: option.course_name,
            //   };
            // })} 
            />
          </Box>

          <Box pt={13} style={{ display: "flex", alignItems: "center" }}>
            <Box w={80} className='iconbox'
              style={{
                borderBottom: `${window.location.pathname === "/home"
                  || window.location.pathname === `/courseplayer/${course.courseid}/${lessonId.lessonid}` ? "3px solid #F09A3E" : ""}`
              }}
            >
              <Link to={"/home"}>
                <Image width="23px" src={window.location.pathname === "/home" ||
                  window.location.pathname === `/courseplayer/${course.courseid}/${lessonId.lessonid}` ? Home1 : Home} ></Image>
              </Link>
            </Box>

            <Box h={"100%"} w={80} className='iconbox'
              style={{
                borderBottom: `${window.location.pathname === "/mycourses" ? "3px solid #F09A3E" : ""}`
              }}
            >
              <Link to={"/mycourses"}>
                <Image width="25px" src={window.location.pathname === "/mycourses" ? Book1 : Book} ></Image>
              </Link>
            </Box>

            <Box h={"100%"} w={80} className='iconbox'
              style={{
                borderBottom: window.location.pathname === '/mydetails' || window.location.pathname === '/mydetails/editdetails' ||
                  window.location.pathname === '/changepassword' ||
                  window.location.pathname === '/trainingsubscriptions' ? '3px solid #F09A3E' : "",
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
        </Flex>
      </nav>
      <Divider />
    </>
  );
}

export default Head

