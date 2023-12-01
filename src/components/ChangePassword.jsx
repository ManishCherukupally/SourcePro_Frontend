import { AppShell, Card, Paper, Grid, Flex, TextInput, ActionIcon, Tabs, Divider, Image, Container, Title, Button, Group, Space, Stack, PasswordInput, Menu } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { FaBookOpen } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import axios from 'axios'
import Header from './dashboard Header/Head'

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

  const location = useLocation();
  const currentPassword = location.state ? location.state.currentpassowrd : '';
  const [formData, setFormData] = useState({

  });

  const changePassword = async () => {
    try {
      const res = await axios.put("http://192.168.29.220:8000/user_details/", formData);
    }
    catch (err) {
      console.error(err)
    }
  }

  const form = useForm(
    {
      initialValues: {
        currentpassword: { currentPassword },
        newpassword: '',
        confirmpassword: '',

      },
      validate: {
        currentpassword: (val) => (val != currentPassword ? "You've entered wrong password" : null),
        newpassword: (newval) => (newval.length < 6 ? 'Password should include at least 6 characters' : null),
        confirmpassword: (val, values) => val !== values.newpassword ? 'Password did not match!' : null,

      }
    }
  );
  const [visible, { toggle }] = useDisclosure(false);


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
              <Button variant='filled' type='submit' onClick={changePassword} style={{ backgroundColor: "rgba(240, 154, 62, 1)" }}>CHANGE PASSWORD</Button>
            </Group>
          </Group>
        </Card >
        <Divider />
        <Space h={15} />

        <Card style={{ width: "25rem" }}>
          <Stack>
            <PasswordInput
              className='password'
              label="Enter current Password"
              // @ts-ignore
              value={currentPassword}
              {...form.getInputProps('currentpassword')}
            />

            <PasswordInput
              className='password'
              label="New Password"
              visible={visible}
              onVisibilityChange={toggle}
              {...form.getInputProps('newpassword')}
            />

            <PasswordInput
              className='password'
              label="Confirm new password"
              visible={visible}
              onVisibilityChange={toggle}
              {...form.getInputProps('confirmpassword')}
            />
          </Stack>
        </Card>
      </Container>

    </div>
  )
}

export default ChangePassword
