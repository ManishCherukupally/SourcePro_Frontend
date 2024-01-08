// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {
    Card, Flex, Image, Text, Space, TextInput, PasswordInput, Checkbox, Button, Center, Stack
    , BackgroundImage,
    Box,
    Anchor,
    Group
} from '@mantine/core';

import ForgetPassword from './ForgetPassword';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Components.css'
// import axios from 'axios'
import client from '../API/api';
import { Cookies, useCookies } from 'react-cookie'
import Home from './Home';
import { isEmail, useForm } from '@mantine/form';
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'
import LoginCard from './CommonComponents/LoginCard';
import { useMediaQuery } from '@mantine/hooks';
const LoginForm = () => {
    const mediumScreen = useMediaQuery("(min-width: 900px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    return (
        <>
            {largeScreen ? (<Box >
                <BackgroundImage className='bgimg' h={"auto"} w={"100%"}

                    src='https://images.squarespace-cdn.com/content/v1/5cd4cc35fd679362f1f3ebbc/1591947513340-19FJMD8KICOK13Q49BDR/1a.jpg'>
                    <BackgroundImage className='blur' zIndex="998" w="100%" h={["80vh", "80vh", "100vh", "100vh"]} >
                        <Flex justify={"end"}>
                            <div className="logincard" style={{ marginTop: "8em", marginRight: "7em" }}>
                                <LoginCard style={{ width: "402px", height: "530px", padding: "2em" }} />
                            </div>
                        </Flex>
                    </BackgroundImage>
                </BackgroundImage>
            </Box>) : (<LoginCard />)}
        </>
    );
}

export default LoginForm
