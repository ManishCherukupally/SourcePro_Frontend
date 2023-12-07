// @ts-ignore
import { ActionIcon, Box, Card, Container, Divider, Flex, Grid, Group, Image, SimpleGrid, Space, Tabs, TextInput, Title, Tooltip, Text, Menu, Select } from '@mantine/core'
// @ts-ignore
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsChevronDown } from 'react-icons/bs'
// @ts-ignore
import { AiFillHome } from 'react-icons/ai'
// @ts-ignore
import { FaBookOpen } from 'react-icons/fa'
// @ts-ignore
import { MdChevronLeft, MdHome, MdPerson } from 'react-icons/md'
// @ts-ignore
import Mycourses from '../MyCourses/Mycourses'
// @ts-ignore
import Mydetails from '../Mydetails'
// @ts-ignore
import EditDetails from '../EditDetails'
import { Link, useNavigate, useParams } from 'react-router-dom'
// @ts-ignore
import Book from '../../assets/book.png';
// @ts-ignore
import Book1 from '../../assets/book1.png';
// @ts-ignore
import User1 from '../../assets/user1.png';
// @ts-ignore
import User from '../../assets/user.png';
// @ts-ignore
import Home from '../../assets/home.png';
// @ts-ignore
import Home1 from '../../assets/home1.png';
// @ts-ignore
import ChangePassword from '../ChangePassword'
// @ts-ignore
import Transaction from '../Transaction'
import { render } from '@testing-library/react'
import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'
const Head = () => {
  const navigate = useNavigate();
  const course = useParams()
  const lessonId = useParams()
  const [data, setData] = useState([]);
  // console.log(data)
  useEffect(() => {
    axios.get("http://192.168.29.220:8000/home/", {
      withCredentials: true
    })
      .then((resp) => {
        const courses = resp.data["All_Courses"];
        setData(courses);
      })
  }, [])

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
              icon={<ActionIcon><BiSearch /></ActionIcon>} data={data.map((option) => {
                return {
                  value: option.value,
                  label: option.course_name,
                };
              })} />
          </Box>

          <Box pt={13} style={{ display: "flex", alignItems: "center" }}>
            <Box w={80} className='iconbox'
              style={{
                borderBottom: `${window.location.pathname === "/home"
                  || window.location.pathname === `/home/${course.courseid}/${lessonId.lessonid}` ||
                  window.location.pathname === `/home/${course.courseid}` ? "3px solid #F09A3E" : ""}`
              }}
            >
              <Link to={"/home"}>
                <Image width="23px" src={window.location.pathname === "/home" ||
                  window.location.pathname === `/home/${course.courseid}/${lessonId.lessonid}` ||
                  window.location.pathname === `/home/${course.courseid}` ? Home1 : Home} ></Image>
              </Link>
            </Box>

            <Box h={"100%"} w={80} className='iconbox'
              style={{
                borderBottom: `${window.location.pathname === "/mycourses" ||
                  window.location.pathname === `/mycourses/${course.courseid}/${lessonId.lessonid}` ||
                  window.location.pathname === `/mycourses/${course.courseid}` ? "3px solid #F09A3E" : ""}`
              }}
            >
              <Link to={"/mycourses"}>
                <Image width="25px" src={window.location.pathname === "/mycourses" ||
                  window.location.pathname === `/mycourses/${course.courseid}/${lessonId.lessonid}` ||
                  window.location.pathname === `/mycourses/${course.courseid}` ? Book1 : Book} ></Image>
              </Link>
            </Box>

            <Box h={"100%"} w={80} className='iconbox'
              style={{
                borderBottom: window.location.pathname === '/mydetails' || window.location.pathname === '/mydetails/editdetails' ||
                  window.location.pathname === '/changepassword' ||
                  window.location.pathname === '/transactiondetails' ? '3px solid #F09A3E' : "",
              }}
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
                      window.location.pathname === '/transactiondetails' ? User1 : User}  ></Image>
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
                    navigate("/transactiondetails");



                  }}>
                    Training Subscription
                  </Menu.Item>
                  <Divider />

                  <Menu.Item className='menutext' onClick={() => {
                    navigate("")
                  }}>
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

