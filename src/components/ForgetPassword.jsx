// @ts-ignore
import { Card, Center, Flex, Image, TextInput, Text, Stack, Space, Group, ActionIcon, Box, BackgroundImage, Button, PasswordInput, UnstyledButton, } from '@mantine/core'
import { isEmail, useForm } from '@mantine/form'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
// @ts-ignore
import LoginForm from './LoginForm'
// import axios from 'axios'
import client from '../API/api'
import { useMediaQuery } from '@mantine/hooks'
import ForgetPasswordCard from './CommonComponents/ForgetPasswordCard'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'


const ForgetPassword = () => {
  const mediumScreen = useMediaQuery("(min-width: 1200px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");
  const extraLargeScreen = useMediaQuery("(min-width: 1770px)");



  return (
    <>
      {mediumScreen ? (<Box >
        <BackgroundImage className='bgimg'
          // @ts-ignore
          h={"auto"} w={"100%"}
          src='https://images.squarespace-cdn.com/content/v1/5cd4cc35fd679362f1f3ebbc/1591947513340-19FJMD8KICOK13Q49BDR/1a.jpg'>
          <BackgroundImage className='blur' zIndex="998" w="100%"
            // @ts-ignore
            h={["80vh", "80vh", "100vh", "100vh"]} >
            <Flex justify={"end"}>
              <div className="forgotpaswd" style={{ marginTop: "8em", marginRight: "7em" }}>
                <ForgetPasswordCard style={{ width: "402px", height: "530px", padding: "2em" }} />
              </div>
            </Flex>
          </BackgroundImage>
        </BackgroundImage>
      </Box>) : (<ForgetPasswordCard />)}
    </>
  )
}

export default ForgetPassword
