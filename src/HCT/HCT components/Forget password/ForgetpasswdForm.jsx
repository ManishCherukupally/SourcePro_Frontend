// @ts-ignore
import { Card, Center, Flex, Image, TextInput, Text, Stack, Space, Group, ActionIcon, Box, BackgroundImage, Button, PasswordInput, UnstyledButton, } from '@mantine/core'
import { isEmail, useForm } from '@mantine/form'
import React, { useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import HCTForgetPassword from './HCTForgetPassword'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'


const ForgetPasswordForm = () => {
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
                            <div className="forgotpaswd" style={{ marginTop: "8em", marginRight: "7em" }}>
                                <HCTForgetPassword style={{ width: "402px", height: "530px", padding: "2em" }} />
                            </div>
                        </Flex>
                    </BackgroundImage>
                </BackgroundImage>
            </Box>) : (<HCTForgetPassword />)}
        </>
    )
}

export default ForgetPasswordForm
