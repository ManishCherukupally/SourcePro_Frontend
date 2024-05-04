// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {
    Card, Flex, Image, Text, Space, TextInput, PasswordInput, Checkbox, Button, Center, Stack
    , BackgroundImage,
    Box,
    Anchor,
    Group
} from '@mantine/core';

import '../../../components/Components.css'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'
// import LoginCard from './CommonComponents/LoginCard';
import { useMediaQuery } from '@mantine/hooks';
import LoginHCT from './LoginHCT';
const LoginFormHCT = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    return (
        <>
            {mediumScreen ? (<Box >
                <BackgroundImage className='bgimg' h={"auto"} w={"100%"}

                    src='https://media.istockphoto.com/id/961183024/video/dumbbell-in-gym.jpg?s=640x640&k=20&c=0W3a3ZfQzpNr24w1vcEfUyEPI3fENT-GF5SVQtQcUNc='>
                    <BackgroundImage className='blur' zIndex="998" w="100%" h={["80vh", "80vh", "100vh", "100vh"]} >
                        <Flex justify={"end"}>
                            <div className="logincard" style={{ marginTop: "8em", marginRight: "7em" }}>
                                <LoginHCT style={{ width: "402px", height: "530px", padding: "2em" }} />
                            </div>
                        </Flex>
                    </BackgroundImage>
                </BackgroundImage>
            </Box>) : (<LoginHCT />)}
        </>
    );
}

export default LoginFormHCT
