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
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'

const LoginForm = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passworderror, setPasswordError] = useState('')
    const [auth, setAuth] = useState(false);

    // useEffect(() => {
    //     window.localStorage.sessionid === null ? navigate("/") : navigate("/home")
    // }, [navigate])

    const handleLogin = async () => {

        try {
            await client.post('login/', {
                email,
                password,
                withcredentials: true
            })
                .then((resp) => {
                    console.log(JSON.stringify(resp.data.status))
                    if (resp.data.status === "user_validated") {

                        setLoader(true);

                        navigate("/home")
                    }
                    else {
                        if (email === "" || "Invalid Credentials") {
                            setEmailError("The email address you entered is invalid")
                        }
                        if (password === "" || "Invalid Credentials") {
                            setPasswordError("The password you entered is incorrect")
                        }
                        navigate("/")
                    }

                })
                .catch(err => console.error(err))


        } catch (error) {
            console.error('Error:', error);
        }

    };
    // const [cookies, setCookies] = useCookies();


    return (
        <>
            <Box >
                <BackgroundImage className='bgimg' h={"auto"} w={"100%"}

                    src='https://images.squarespace-cdn.com/content/v1/5cd4cc35fd679362f1f3ebbc/1591947513340-19FJMD8KICOK13Q49BDR/1a.jpg'>
                    <BackgroundImage className='blur' zIndex="998" w="100%" h={["80vh", "80vh", "100vh", "100vh"]} >
                        <Flex justify={"end"}>
                            <div className="logincard" style={{ marginTop: "8em", marginRight: "7em" }}>
                                <Card withBorder style={{ width: "23em", height: "30rem", padding: "2em" }} radius={"xl"}>

                                    <Center>
                                        <Image
                                            maw={150}
                                            src={"https://www.sourceprotraining.com/wp-content/uploads/2021/09/logo.png"} />
                                    </Center>


                                    <Stack>
                                        <Text fz={18} fw={700}>Log In</Text>
                                        <div>
                                            <TextInput className='email'
                                                withAsterisk
                                                label="Email ID"
                                                placeholder="your@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.currentTarget.value)}
                                                error={!!emailError}
                                            />
                                            {
                                                emailError && <Text fz={12} c={"red"}>{emailError}</Text>
                                            }
                                        </div>
                                        <Flex direction={"column"}>
                                            <div>
                                                <PasswordInput
                                                    className='password'
                                                    withAsterisk
                                                    label='Password'
                                                    placeholder="Enter your Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                                    error={!!passworderror}
                                                />
                                                {
                                                    passworderror && <Text fz={12} c={"red"}>{passworderror}</Text>
                                                }
                                            </div>

                                            <Link to="/forgot-password"
                                                className="forgot-password-link" >

                                                Forgot your password?
                                            </Link>
                                        </Flex>


                                        <Button fullWidth style={{ backgroundColor: "rgba(240, 154, 62, 1)" }} type='submit' radius={"md"} onClick={handleLogin}
                                            loading={loader}>Login</Button>



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
