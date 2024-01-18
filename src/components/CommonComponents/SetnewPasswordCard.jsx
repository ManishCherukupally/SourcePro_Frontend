import { Center, Flex, Text, TextInput, Image, Card, BackgroundImage, Stack, ActionIcon, Space, NumberInput, Group, Button, Box, UnstyledButton, PasswordInput } from '@mantine/core'
import { isEmail, useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
import client from '../../API/api'
import { useCookies } from 'react-cookie'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'
const SetnewPasswordCard = (props) => {

    const navigate = useNavigate()
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [otp, setOtp] = useState(null)
    // const [emailerror, setemailError] = useState("")
    // const [otpError, setOtpError] = useState(false)
    // const [samePaswdError, setSamePaswdError] = useState("")
    const [token, setToken, removeToken] = useCookies(['encsrftok']);




    // const values = {

    // }
    const handleSetPassword = (values) => {
        console.log("clicked")
        try {
            client.post('set_password/', {
                email: values.email,
                otp: values.otp,
                password: values.password,
                withCredentials: true,

            }).then((resp) => {


                if (resp.data.status === 'Invalid_OTP') {

                    const errorMessage = resp.data.status === "Invalid_OTP"
                        ? 'Wrong OTP.Please check the OTP & enter again'
                        : resp.data.error; // Use a more specific error message if available
                    form.setErrors({
                        otp: errorMessage,
                    });
                }
                if (resp.data.status === 'Invalid_email_id') {
                    const errorMessage = resp.data.status === "Invalid_email_id"
                        ? "Invalid.Please enter your Email."
                        : resp.data.error; // Use a more specific error message if available
                    form.setErrors({
                        email: errorMessage,
                    });
                }

                if (resp.data.status === 'current_password_cannot_be_set_as_new_password') {
                    const errorMessage = resp.data.status === "current_password_cannot_be_set_as_new_password"
                        ? "Current password cannot be set as new password."
                        : resp.data.error; // Use a more specific error message if available
                    form.setErrors({
                        password: errorMessage,
                    });
                }

                if (resp.data.status === 'Successfull') {
                    removeToken(['encsrftok']);

                    // Optionally, redirect user to login page
                    window.location.href = "/";
                }
            });
            // console.log(email)
            // console.log(otp)
            // console.log(password)

        }

        catch (error) {
            console.error('Error:', error);
        }
    };
    const handleresend = async () => {
        console.log("clicked")
        try {
            await client.post('otp/', {
                email: email,
                withCredentials: true,

            }).then((resp) => {
                console.log(resp.data)
                // if (resp.data.status === 'Please_provide_valid_email') {

                //     setemailError("Please provide correct email ID")
                // }

            });
            // console.log(email)
            // console.log(response.data)
        }

        catch (error) {
            console.error('Error:', error);
        }
    };
    const form = useForm(
        {
            initialValues: {
                email: "",
                otp: undefined,

                password: "",

            },
            validate: {
                email: isEmail('Invalid.Please enter your Email'),
                otp: (value) => (value === undefined ? 'Wrong OTP.Please check the OTP & enter again' : null),

                // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid.Please enter your Email'),
                password: (value) => (value === "" ? "Password cannot be empty" : null),

            }
        }
    )
    const { values, errors, handleChange } = form;
    const { email } = values;
    return (
        <div>
            <Card style={props.style} radius={"xl"}>

                <Center>
                    <Image
                        maw={150}
                        src={"https://www.sourceprotraining.com/wp-content/uploads/2021/09/logo.png"} />
                </Center>
                <>
                    <form onSubmit={form.onSubmit(handleSetPassword)} >
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

                                    {...form.getInputProps("email")}

                                />

                            </div>
                            <div>
                                <TextInput type='number'
                                    className='numinp'
                                    label="Enter OTP code"
                                    {...form.getInputProps("otp")}
                                    rightSection={
                                        <UnstyledButton type='submit' style={{ paddingRight: "2em" }} onClick={handleresend}>
                                            <Text color={"blue"} fz={"xs"} fw={600} >RESEND</Text>
                                        </UnstyledButton>
                                    }
                                />
                                {/* {
                    otpError && <Text pt={0} fz={12} c='red'>{otpError}</Text>
                } */}
                            </div>
                        </Stack>
                        <Space h={3} />
                        <Text fz={"xs"}>Please enter the OTP set to your registered Email ID</Text>

                        <Space h={15} />
                        <Stack>
                            <div>
                                <PasswordInput className='sp'
                                    label="Enter your new password"
                                    {...form.getInputProps("password")}
                                />
                                {/* {
                    samePaswdError && <Text pt={0} fz={12} c='red'>{samePaswdError}</Text>
                } */}
                            </div>

                            <Button style={{ backgroundColor: "rgba(240, 154, 62, 1)" }} type="submit" radius={"md"}>Done</Button>
                        </Stack>

                    </form>
                </>
            </Card>
        </div>
    )
}

export default SetnewPasswordCard
