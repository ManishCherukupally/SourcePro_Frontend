// @ts-ignore
import { Center, Flex, Text, TextInput, Image, Card, BackgroundImage, Stack, ActionIcon, Space, NumberInput, Group, Button, Box, UnstyledButton, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import abemail from "./LoginForm"
// import axios from 'axios'
import client from '../API/api'
import { useCookies } from 'react-cookie'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'
const SetNewPswdForm = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOtp] = useState(null)
    const [emailerror, setemailError] = useState("")
    const [otpError, setOtpError] = useState("")
    const [samePaswdError, setSamePaswdError] = useState("")
    const [token, setToken, removeToken] = useCookies(['encsrftok']);


    // const form = useForm(
    //     {
    //         initialValues: {
    //             otp: "",
    //             email: "",
    //             newpassword: "",

    //         },
    //         validate: {
    //             otp: (value) => (value ? null : 'Wrong OTP.Please check the OTP & enter again'),
    //             email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid.Please enter your Email'),
    //             newpassword: (value) => (value.length < 6 ? 'Password should include atleast 6 characters' : null),

    //         }
    //     }
    // )

    // const values = {

    // }
    const handleSetPassword = () => {
        console.log("clicked")
        try {
            client.post('set_password/', {
                email,
                otp,
                password
            }).then((resp) => {
                if (resp.data.status === 'Invalid_OTP' || otp === "") {

                    setOtpError("Wrong OTP.Please check the OTP & enter again")
                }
                else if (resp.data.status === 'Invaid_email_id' || email === "") {
                    setemailError("Please provide correct email ID")
                }
                else if (password === "") {
                    setSamePaswdError("Password cannot be empty")
                }
                else if (resp.data.status === 'current_password_cannot_be_set_as_new_password') {
                    setSamePaswdError("Current password cannot be set as new password")
                }

                else if (resp.data.status === 'Successfull') {
                    removeToken(['encsrftok']);

                    // Optionally, redirect user to login page
                    window.location.href = "/";
                }
            });
            console.log(email)
            console.log(otp)
            console.log(password)

        }

        catch (error) {
            console.error('Error:', error);
        }
    };
    const handleresend = () => {
        try {
            client.post('otp/', {
                withCredentials: true,
                email
            }).then((resp) => {
                if (resp.data.status === 'Please_provide_valid_email') {

                    setemailError("Please provide correct email ID")
                }

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
                            <div className="setnewpswd" style={{ marginTop: "8em", marginRight: "7em" }}>
                                <Card withBorder style={{ width: "23em", height: "30rem", padding: "2em" }} radius={"xl"}>

                                    <Center>
                                        <Image
                                            maw={150}
                                            src={"https://www.sourceprotraining.com/wp-content/uploads/2021/09/logo.png"} />
                                    </Center>
                                    <>
                                        {/* <form onSubmit={form.onSubmit((values) => console.log(values))} > */}
                                        <Stack>
                                            <Flex align={"center"}>
                                                <Link to={"/forgot-password"}>
                                                    <ActionIcon size={"sm"}>< BiArrowBack /></ActionIcon>
                                                </Link>
                                                <Space w={15} />
                                                <Text fz={18} fw={700}>Set New Password</Text>
                                            </Flex>
                                            <div>
                                                <TextInput className='email'
                                                    label="Email ID"
                                                    placeholder="your@email.com"
                                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                                    error={!!emailerror}
                                                />
                                                {
                                                    emailerror && <Text pt={0} fz={12} c='red'>{emailerror}</Text>
                                                }
                                            </div>
                                            <div>
                                                <TextInput type='number' className='numinp' label="Enter OTP code"
                                                    error={!!otpError}
                                                    rightSection={
                                                        <UnstyledButton style={{ paddingRight: "2em" }} onClick={handleresend}>
                                                            <Text color={"blue"} fz={"xs"} fw={600} >RESEND</Text>
                                                        </UnstyledButton>


                                                    }
                                                    onChange={(e) => setOtp(e.currentTarget.value)} />
                                                {
                                                    otpError && <Text pt={0} fz={12} c='red'>{otpError}</Text>
                                                }
                                            </div>
                                        </Stack>
                                        <Space h={3} />
                                        <Text fz={"xs"}>Please enter the OTP set to your registered Email ID</Text>

                                        <Space h={15} />
                                        <Stack>
                                            <div>
                                                <PasswordInput className='sp'
                                                    label="Enter your new password"
                                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                                    error={!!samePaswdError}
                                                />
                                                {
                                                    samePaswdError && <Text pt={0} fz={12} c='red'>{samePaswdError}</Text>
                                                }
                                            </div>

                                            <Button color='orange' type="submit" radius={"md"} onClick={handleSetPassword} >Done</Button>
                                        </Stack>

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

export default SetNewPswdForm
