// @ts-ignore
import { Center, Flex, Text, TextInput, Image, Card, BackgroundImage, Stack, ActionIcon, Space, NumberInput, Group, Button, Box, UnstyledButton, PasswordInput } from '@mantine/core'
import { isEmail, useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
// import { BiArrowBack } from 'react-icons/bi'
// import { Link, useNavigate } from 'react-router-dom'
// import abemail from "./LoginForm"
// import axios from 'axios'
import { useCookies } from 'react-cookie'
// import SetnewPasswordCard from './CommonComponents/SetnewPasswordCard'
import { useMediaQuery } from '@mantine/hooks'
import HCTSetnewpasswrdCard from './HCTSetnewpasswrdCard'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'
const HCTSetnewpasswdForm = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    return (
        <>
            {mediumScreen ? (<Box >
                <BackgroundImage className='bgimg'
                    // @ts-ignore
                    h={"auto"} w={"100%"}

                    src='https://media.istockphoto.com/id/961183024/video/dumbbell-in-gym.jpg?s=640x640&k=20&c=0W3a3ZfQzpNr24w1vcEfUyEPI3fENT-GF5SVQtQcUNc='>
                    <BackgroundImage className='blur' zIndex="998" w="100%"
                        // @ts-ignore
                        h={["80vh", "80vh", "100vh", "100vh"]} >
                        <Flex justify={"end"}>
                            <div className="setnewpswd" style={{ marginTop: "8em", marginRight: "7em" }}>
                                <HCTSetnewpasswrdCard style={{ width: "402px", height: "530px", padding: "2em" }} />
                            </div>
                        </Flex>
                    </BackgroundImage>
                </BackgroundImage>
            </Box>) : (<HCTSetnewpasswrdCard />)}
        </>
    )
}

export default HCTSetnewpasswdForm
