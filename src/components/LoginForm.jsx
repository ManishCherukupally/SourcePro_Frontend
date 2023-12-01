// @ts-nocheck
import React, { useState } from 'react'
import {
    Card, Flex, Image, Text, Space, TextInput, PasswordInput, Checkbox, Button, Center, Stack
    , BackgroundImage,
    Box,
    Anchor,
    Group
} from '@mantine/core';

import ForgetPassword from './ForgetPassword';
import { Link } from 'react-router-dom';
import './Components.css'
import axios from 'axios'

const LoginForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        try {
            await axios.post('http://192.168.29.220:8001/api/login/', {
                email,
                password,
            })
                .then((resp) => {
                    console.log(resp.data.generated_token)
                    axios.get('http://192.168.29.220:8001/api/sampleapi/', {
                        headers: {
                            Authorization: resp.data.generated_token,
                        }
                    }).then((response) => {
                        console.log("response" + JSON.stringify(response.data))
                    })
                })


        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <Box >
                <BackgroundImage className='bgimg' h={["80vh", "80vh", "100vh", "100vh"]}

                    src='https://images.squarespace-cdn.com/content/v1/5cd4cc35fd679362f1f3ebbc/1591947513340-19FJMD8KICOK13Q49BDR/1a.jpg?format=1500w'>
                    <BackgroundImage className='blur' zIndex="998" w="100%" h={["80vh", "80vh", "100vh", "100vh"]} >
                        <Flex justify={"end"}>
                            <div className="logincard" style={{ marginTop: "8em", marginRight: "7em", marginBottom: "146px" }}>
                                <Card withBorder style={{ width: "23em", height: "30rem", padding: "2em" }} radius={"xl"}>

                                    <Center>
                                        <Image
                                            maw={150}
                                            src={"https://www.sourceprotraining.com/wp-content/uploads/2021/09/logo.png"} />
                                    </Center>


                                    <Stack>
                                        <Text fz={18} fw={700}>Log In</Text>
                                        <TextInput className='email'
                                            withAsterisk
                                            label="Email ID"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.currentTarget.value)}
                                        />

                                        <Flex direction={"column"}>
                                            <PasswordInput
                                                className='password'
                                                withAsterisk
                                                label='Password'
                                                placeholder="Enter your Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.currentTarget.value)}
                                            />


                                            <Link to="/forgot-password"
                                                className="forgot-password-link" >

                                                Forgot your password?
                                            </Link>
                                        </Flex>


                                        <Button fullWidth style={{ backgroundColor: "rgba(240, 154, 62, 1)" }} type='submit' radius={"md"} onClick={handleLogin}>Login</Button>


                                        <Space h={"5em"} />

                                    </Stack>

                                </Card>
                            </div>
                        </Flex>
                    </BackgroundImage>
                </BackgroundImage>
            </Box>
        </>
    );
}

export default LoginForm
