import { AppShell, Card, Paper, Grid, Flex, TextInput, ActionIcon, Tabs, Divider, Image, Container, Title, Button, Group, Space, Stack, PasswordInput, Menu, Text, Modal } from '@mantine/core'
import { matchesField, useForm } from '@mantine/form'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { FaBookOpen } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import Head from './dashboard Header/Head'
// import axios from 'axios'
import client from '../API/api'
import { useCookies } from 'react-cookie'
import ChangePasswordComp from './CommonComponents/ChangePasswordComp'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'


// const ProfileDropdown = () => {
//   const [opened, setOpened] = useState(false);

//   const handleLogout = () => {
//     // Implement your logout logic here
//   };

//   return (
//     <Menu

//       position='bottom-end'
//       opened={opened}
//       onClose={() => setOpened(false)}
//     >

//       <Menu.Item onClick={() => console.log('My Details clicked')}>My Details</Menu.Item>
//       <Menu.Item onClick={() => console.log('Change Password clicked')}>Change Password</Menu.Item>
//       <Menu.Item onClick={handleLogout}>Logout</Menu.Item>

//     </Menu>
//   );
// };
const ChangePassword = () => {
  const mediumScreen = useMediaQuery("(min-width: 1200px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");
  const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

  // const navigate = useNavigate()
  // const [current_password, setCurrentPassword] = useState("")
  // const [new_password, setNewPassword] = useState("")
  // const [confirm_new_password, setConfirmPassword] = useState("")
  // const [currentError, setCurrentError] = useState("")
  // const [confirmError, setConfirmError] = useState("")


  return (
    <div>
      {
        mediumScreen ? (
          <>
            <AppShell header={
              <Head />
            }><ChangePasswordComp /></AppShell>
          </>
        ) : (
          <ChangePasswordComp />
        )
      }
    </div>
  )
}
export default ChangePassword