import { AppShell, Card, Paper, Grid, Flex, TextInput, ActionIcon, Tabs, Divider, Image, Container, Title, Button, Group, Space, Stack, PasswordInput, Menu, Text, Modal } from '@mantine/core'
import { matchesField, useForm } from '@mantine/form'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiArrowBack, BiSearch } from 'react-icons/bi'
import { FaBookOpen } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import client from '../../API/api'
import { useCookies } from 'react-cookie'

const ChangePasswordComp = () => {
    const navigate = useNavigate();
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    const [token, setToken, removeToken] = useCookies(['encsrftok']);
    const [loader, setLoader] = useState(false)
    const [success, setSuccess] = useState("")




    const form = useForm(
        {
            initialValues: {
                current_password: '',
                new_password: '',
                confirm_new_password: '',
            },
            validate: {
                current_password: (val) => (val === '' ? 'You must enter your current password' : null),
                new_password: (val) => {
                    if (val === '') return 'Please enter a new password';
                    if (val.length < 4) return 'Password must be at least 6 characters long';
                    return null;
                },
                confirm_new_password: matchesField('new_password', 'Passwords do not match'),
            },
        }

    );

    const handlechangePassword = () => {
        console.log("clicked changepaswd")

        client.put('change_password/', form.values)
            .then((resp) => {
                console.log(resp.data.status)
                if (resp.data.status === 'successfull') {
                    setLoader(true);
                    setSuccess('Successfull!');
                    removeToken(['encsrftok']);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 500)
                    // Redirect to login page
                }
                if (resp.data.status === "you_have_entered_wrong_password") {
                    const errormessage = resp.data.status === "you_have_entered_wrong_password"
                        ? "Current password is incorrect"
                        : resp.data.error; // Use a more specific error message if available
                    form.setErrors({
                        current_password: errormessage,
                    });
                }
                if (resp.data.status === 'New_password_cannot_be_the_same_as_the_old_password') {
                    const errorMessage = resp.data.status === "New_password_cannot_be_the_same_as_the_old_password"
                        ? "Current password cannot be set as new password."
                        : resp.data.error; // Use a more specific error message if available
                    form.setErrors({
                        confirm_new_password: errorMessage,
                    });
                }

                else {
                    // Display any specific errors from the API resp here
                    console.error('Password change failed:', resp.data.status);
                }
            })



    }
    return (
        <div>
            <Container size={"xl"} style={{ margin: "1em", marginLeft: mediumScreen ? "4rem" : "0rem" }}>
                <form onSubmit={form.onSubmit(handlechangePassword)}>
                    <Card pl={mediumScreen ? "1rem" : 0} >
                        <Group align={"center"} position={mediumScreen ? "apart" : "left"}>
                            {mediumScreen ? (null) : (<div>
                                <ActionIcon size={"sm"} onClick={() => navigate(-1)}>< BiArrowBack /></ActionIcon>
                            </div>)}
                            <Title fw={500} size={24}>Change Password </Title>

                            {mediumScreen ? (<Group spacing={"lg"}>
                                <Link to={"/mydetails"}>
                                    <Button variant='outline' color='dark'>CANCEL</Button>
                                </Link>
                                <Button loading={loader} variant='filled' type='submit' style={{ backgroundColor: "rgba(240, 154, 62, 1)" }}>CHANGE PASSWORD</Button>
                            </Group>) : (null)}
                        </Group>
                    </Card >
                    <Divider />
                    <Space h={15} />

                    <Container size={"xs"} ml={mediumScreen ? "0rem" : "1.3rem"}>
                        {success && <Text fw={600} c={"green"}>{success}</Text>}

                        <Stack>
                            <div>
                                <PasswordInput

                                    className='password'
                                    label="Enter current Password"
                                    // @ts-ignore
                                    {...form.getInputProps("current_password")}
                                // onChange={(p) => setCurrentPassword(p.currentTarget.value)}
                                // error={!!currentError}
                                />
                                {/* {
                  currentError && <Text c={"red"} fz={12}>{currentError}</Text>
                } */}
                            </div>
                            <PasswordInput
                                className='password'
                                label="New Password"
                                // visible={visible}
                                // onVisibilityChange={toggle}
                                {...form.getInputProps("new_password")}
                            // onChange={(p) => setNewPassword(p.currentTarget.value)}
                            />
                            <div>
                                <PasswordInput


                                    className='password'
                                    label="Confirm new password"
                                    // visible={visible}
                                    // onVisibilityChange={toggle}
                                    {...form.getInputProps("confirm_new_password")}
                                // onChange={(p) => setConfirmPassword(p.currentTarget.value)}
                                // error={!!confirmError}
                                />
                                {/* {
                  confirmError && <Text c={"red"} fz={12}>{confirmError}</Text>
                } */}
                            </div>
                            <Space h={8} />
                            {
                                mediumScreen ? (null) : (<Button loading={loader} variant='filled' type='submit' style={{ backgroundColor: "rgba(240, 154, 62, 1)" }}>CHANGE PASSWORD</Button>)
                            }

                        </Stack>

                    </Container>
                </form>
            </Container>
        </div>
    )
}

export default ChangePasswordComp
