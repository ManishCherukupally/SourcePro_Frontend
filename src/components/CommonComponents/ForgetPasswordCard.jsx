import React, { useState } from 'react'
import { Card, Center, Flex, Image, TextInput, Text, Stack, Space, Group, ActionIcon, Box, BackgroundImage, Button, PasswordInput, UnstyledButton, } from '@mantine/core'
import { isEmail, useForm } from '@mantine/form'

import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
// import axios from 'axios'
import client from '../../API/api'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'


const ForgetPasswordCard = (props) => {
    const [err, setErr] = useState("")
    // const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const form = useForm(

        {
            initialValues: {
                email: "",
            },
            validate: {
                email: isEmail('Invalid.Please enter your Email'),
            }
        }
    );


    const handleForgetPaswd = async (values) => {
        console.log("forgot paswd clicked")
        try {
            await client.post('otp/', {
                email: values.email,
                withCredentials: true,

            }).then((resp) => {
                if (resp.data.status === 'OTP sent successfully') {
                    window.location.href = "/set-new-password"
                }

                else {
                    const errorMessage = resp.data.status === "Please_provide_valid_email"
                        ? "Invalid.Please enter your Email."
                        : resp.data.error; // Use a more specific error message if available
                    form.setErrors({
                        email: errorMessage,
                    });

                }
                console.log(resp)
            });
            // console.log(response.data)
        }

        catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div>
            <Card style={props.style} radius={"xl"}>
                <Center>
                    <Image
                        maw={150}
                        src={"https://www.sourceprotraining.com/wp-content/uploads/2021/09/logo.png"} />

                </Center>
                <>
                    <form onSubmit={form.onSubmit(handleForgetPaswd)} >

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
                            {...form.getInputProps("email")}
                        />
                        {/* {
                        err && <Text color='red' fz={12}>{err}</Text>
                      } */}
                        <Space h={10} />
                        <Text fz={"xs"}>An OTP will be sent your registered email</Text>

                        <Space h={30} />
                        <Group position='right'>
                            <Link to={"/"} className='cancelbtn' >
                                CANCEL
                            </Link>

                            {/* Onclick fuction here to get the otp */}
                            <div >
                                <UnstyledButton type='submit' className='newpaswd' >
                                    SET NEW PASSWORD
                                </UnstyledButton>
                            </div>
                        </Group>

                    </form>
                </>
            </Card>
        </div>
    )

}
export default ForgetPasswordCard
