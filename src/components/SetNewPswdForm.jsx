// @ts-ignore
import { Center, Flex, Text, TextInput, Image, Card, BackgroundImage, Stack, ActionIcon, Space, NumberInput, Group, Button, Box, UnstyledButton } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const SetNewPswdForm = () => {
    const form = useForm(
        {
            initialValues: {
                otp: "",
                email: "",
                newpassword: "",

            },
            validate: {
                otp: (value) => (value ? null : 'Wrong OTP.Please check the OTP & enter again'),
                email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid.Please enter your Email'),
                newpassword: (value) => (value.length < 6 ? 'Password should include at least 6 characters' : null),

            }
        }
    )
    return (
        <>
            <Box >
                <BackgroundImage className='bgimg'
                    // @ts-ignore
                    h={["80vh", "80vh", "100vh", "100vh"]}

                    src='https://images.squarespace-cdn.com/content/v1/5cd4cc35fd679362f1f3ebbc/1591947513340-19FJMD8KICOK13Q49BDR/1a.jpg?format=1500w'>
                    <BackgroundImage className='blur' zIndex="998" w="100%"
                        // @ts-ignore
                        h={["80vh", "80vh", "100vh", "100vh"]} >
                        <Flex justify={"end"}>
                            <div className="setnewpswd" style={{ marginTop: "8em", marginRight: "7em", marginBottom: "146px" }}>
                                <Card withBorder style={{ width: "23em", height: "30rem", padding: "2em" }} radius={"xl"}>

                                    <Center>
                                        <Image
                                            maw={150}
                                            src={"https://www.sourceprotraining.com/wp-content/uploads/2021/09/logo.png"} />
                                    </Center>

                                    <form onSubmit={form.onSubmit((values) => console.log(values))} >
                                        <Stack>
                                            <Flex align={"center"}>
                                                <Link to={"/forgot-password"}>
                                                    <ActionIcon size={"sm"}>< BiArrowBack /></ActionIcon>
                                                </Link>
                                                <Space w={15} />
                                                <Text fz={18} fw={700}>Set New Password</Text>
                                            </Flex>

                                            <TextInput className='email'
                                                label="Email ID"
                                                placeholder="your@email.com"
                                                {...form.getInputProps('email')}
                                            />

                                            <NumberInput className='numinp' label="Enter OTP code"
                                                hideControls
                                                rightSection={
                                                    <UnstyledButton>
                                                        <Text color={"blue"} fz={"xs"} fw={600} style={{ paddingRight: "4em" }}>RESEND</Text>
                                                    </UnstyledButton>
                                                }
                                                {...form.getInputProps('otp')}>
                                            </NumberInput>
                                        </Stack>
                                        <Space h={3} />
                                        <Text fz={"xs"}>Please enter the OTP set to your registered Email ID</Text>

                                        <Space h={15} />
                                        <Stack>
                                            <TextInput className='sp'
                                                label="Enter your new password"
                                            />

                                            <Button color='orange' type="submit" radius={"md"} >Done</Button>
                                        </Stack>

                                    </form>
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
