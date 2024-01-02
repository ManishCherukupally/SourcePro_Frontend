// @ts-ignore
import { Card, Center, Flex, Image, TextInput, Text, Stack, Space, Group, ActionIcon, Box, BackgroundImage, Button, PasswordInput, UnstyledButton, } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
// @ts-ignore
import LoginForm from './LoginForm'
// import axios from 'axios'
import client from '../API/api'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'


const ForgetPassword = () => {
  const [err, setErr] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  // const form = useForm(
  //   {
  //     initialValues: {
  //       email: "",
  //     },
  //     validate: {
  //       email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid.Please enter your Email'),
  //     }
  //   }
  // );


  const handleForgetPaswd = async () => {
    try {
      await client.post('otp/', {
        withCredentials: true,
        email
      }).then((resp) => {
        if (resp.data.status === 'OTP sent successfully') {
          window.location.href = "/set-new-password"
        }

        else {

          setErr("Please provide valid email ID")
        }
        console.log(resp)
      });
      console.log(email)
      // console.log(response.data)
    }

    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Box >
        <BackgroundImage className='bgimg'
          // @ts-ignore
          h={"auto"} w={"100%"}
          src='https://images.squarespace-cdn.com/content/v1/5cd4cc35fd679362f1f3ebbc/1591947513340-19FJMD8KICOK13Q49BDR/1a.jpg'>
          <BackgroundImage className='blur' zIndex="998" w="100%"
            // @ts-ignore
            h={["80vh", "80vh", "100vh", "100vh"]} >
            <Flex justify={"end"}>
              <div className="forgotpaswd" style={{ marginTop: "8em", marginRight: "7em" }}>
                <Card withBorder style={{ width: "23em", height: "30rem", padding: "2em" }} radius={"xl"}>
                  <Center>
                    <Image
                      maw={150}
                      src={"https://www.sourceprotraining.com/wp-content/uploads/2021/09/logo.png"} />

                  </Center>
                  <>
                    {/* <form onSubmit={form.onSubmit((values) => console.log(values))} > */}

                    <Flex align={"center"}>
                      <Link to={"/"}>
                        <ActionIcon size={"sm"}>< BiArrowBack /></ActionIcon>
                      </Link>
                      <Space w={15} />
                      <Text fz={18} fw={700}>Forgot your Password?</Text>
                    </Flex>

                    <Space h={15} />

                    <TextInput className='email'
                      label="Email ID"
                      placeholder="your@email.com"
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      required
                      error={!!err}
                    />
                    {
                      err && <Text color='red' fz={12}>{err}</Text>
                    }
                    <Space h={10} />
                    <Text fz={"xs"}>An OTP will be sent your registered email</Text>

                    <Space h={30} />
                    <Group position='right'>
                      <Link to={"/"} className='cancelbtn' >
                        CANCEL
                      </Link>

                      {/* Onclick fuction here to get the otp */}
                      <div >
                        <UnstyledButton type='submit' className='newpaswd' onClick={() => {
                          handleForgetPaswd();


                        }}>
                          SET NEW PASSWORD
                        </UnstyledButton>
                      </div>
                    </Group>

                    {/* </form> */}
                  </>
                </Card>
              </div>
            </Flex>
          </BackgroundImage>
        </BackgroundImage>
      </Box>
    </>
  )
}

export default ForgetPassword
