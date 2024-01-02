import { AppShell, Card, Paper, Grid, Flex, TextInput, ActionIcon, Tabs, Divider, Image, Container, Title, Button, Group, Space, Stack, PasswordInput, Menu, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { FaBookOpen } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import Header from './dashboard Header/Head'
// import axios from 'axios'
import client from '../API/api'
import { useCookies } from 'react-cookie'
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
  const navigate = useNavigate()
  const [current_password, setCurrentPassword] = useState("")
  const [new_password, setNewPassword] = useState("")
  const [confirm_new_password, setConfirmPassword] = useState("")
  const [currentError, setCurrentError] = useState("")
  const [confirmError, setConfirmError] = useState("")
  const [token, setToken, removeToken] = useCookies(['encsrftok']);
  const [loader, setLoader] = useState(false)
  const [success, setSuccess] = useState("")


  const changePassword = async () => {
    try {
      await client.put("change_password/", {
        current_password,
        new_password,
        confirm_new_password

      }).then((resp) => {
        if (resp.data.status === "successfull") {
          setLoader(true)
          setSuccess("Successful!")
          removeToken(['encsrftok']);

          // Optionally, redirect user to login page
          window.location.href = "/";
        }
        else if (resp.data.status === "you_have_entered_wrong_password") {
          setCurrentError("You’ve entered wrong password")
          console.log("current password")
        }
        else if (resp.data.status === "password_do_not_match") {
          setConfirmError("Passwords do not match")
          console.log("confirm password")
        }
      });
    }
    catch (err) {
      console.error(err)
    }
  }

  // const form = useForm(
  //   {
  //     initialValues: {
  //       currentpassword: { currentPassword },
  //       newpassword: '',
  //       confirmpassword: '',

  //     },
  //     validate: {
  //       currentpassword: (val) => (val != currentPassword ? "You've entered wrong password" : null),
  //       newpassword: (newval) => (newval.length < 6 ? 'Password should include at least 6 characters' : null),
  //       confirmpassword: (val, values) => val !== values.newpassword ? 'Password did not match!' : null,

  //     }
  //   }
  // );


  return (
    <div>
      <Header />
      <Container size={"xl"} style={{ margin: "1em", marginLeft: "4em", }}>
        <Card >
          <Group position='apart'>
            <Title fw={500} size={24}>Change Password </Title>

            <Group spacing={"lg"}>
              <Link to={"/mydetails"}>
                <Button variant='outline' color='dark'>CANCEL</Button>
              </Link>
              <Button loading={loader} variant='filled' type='submit' onClick={changePassword} style={{ backgroundColor: "rgba(240, 154, 62, 1)" }}>CHANGE PASSWORD</Button>
            </Group>
          </Group>
        </Card >
        <Divider />
        <Space h={15} />

        <Card pt={0} style={{ width: "25rem" }}>
          {success && <Text fw={600} c={"green"}>{success}</Text>}
          <Stack>
            <div>
              <PasswordInput
                className='password'
                label="Enter current Password"
                // @ts-ignore

                onChange={(p) => setCurrentPassword(p.currentTarget.value)}
                error={!!currentError}
              />
              {
                currentError && <Text c={"red"} fz={12}>{currentError}</Text>
              }
            </div>
            <PasswordInput
              className='password'
              label="New Password"
              // visible={visible}
              // onVisibilityChange={toggle}
              onChange={(p) => setNewPassword(p.currentTarget.value)}
            />
            <div>
              <PasswordInput width={"100%"}
                className='password'
                label="Confirm new password"
                // visible={visible}
                // onVisibilityChange={toggle}
                onChange={(p) => setConfirmPassword(p.currentTarget.value)}
                error={!!confirmError}
              />
              {
                confirmError && <Text c={"red"} fz={12}>{confirmError}</Text>
              }
            </div>
          </Stack>
        </Card>
      </Container>

    </div>
  )
}
export default ChangePassword