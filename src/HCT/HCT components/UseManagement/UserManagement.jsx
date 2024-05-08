import { ActionIcon, Button, Card, Center, Container, Flex, Group, Loader, Modal, Overlay, Pagination, Radio, Select, SimpleGrid, Space, Table, Text, TextInput, Tooltip } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import MantineTable from '../MantineTable.jsx/MantineTable';
import axios from 'axios';
import { MdCircle, MdEdit, MdDeleteForever } from "react-icons/md";
import { useForm } from '@mantine/form';
import client from '../../../API/api';


const UserManagement = () => {
    const mediumScreen = useMediaQuery("(min-width: 1100px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const [value, setValue] = useState('active');


    const [userData, setUserData] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(1)
    // const lastIndex = currentPage * recordsPerPage;
    // const firstIndex = lastIndex - recordsPerPage;
    const [opened, { open, close }] = useDisclosure(false);
    const [openModal, setOpenModal] = useState(false)
    const [userModal, setUserModal] = useState(false)

    const [EditModal, setEditModal] = useState(false)
    const [editData, setEditData] = useState(null)
    console.log(editData)
    const [editStatus, setEditStatus] = useState(false)
    const [formValues, setFormValues] = useState(null);
    console.log(formValues)

    const [userName, setUserName] = useState('')

    // const [render, setRender] = useState(0)
    const [loaderVisible, setLoaderVisible] = useState(false);

    // console.log(userName)
    const form = useForm({

        initialValues: {
            name: "",
            business_email: "",
            contact_no: "",
            location: "",
            user_status: value
        },
        transformValues: (values) => ({
            name: `${values.name}`,
            business_email: `${values.username}`,
            contact_no: `${values.contact_no}`,
            user_status: `${value}`,
            location: `${values.location}`,
            // company: '',
            // years_of_experience: '',
            // job_position: ''

        }),
    })
    useEffect(() => {
        client.get("pagination/", {
            params: {
                page: currentPage
            }
        })
            .then((resp) => {
                setUserData(resp.data["page_obj"])
                setRecordsPerPage(resp.data.number_of_pages)
            })
    }, [currentPage, loaderVisible])

    // const form = useForm({
    //     initialValues: {
    //         name: window.localStorage.getItem("name"),
    //         password: window.localStorage.getItem("password"),
    //         username: window.localStorage.getItem("username"),
    //         contact_no: window.localStorage.getItem("contact_no"),
    //         location: window.localStorage.getItem("location"),
    //         user_status: value
    //     },
    //     transformValues: (values) => ({
    //         name: `${values.name}`,
    //         password: `${values.password}`,
    //         username: `${values.username}`,
    //         contact_no: `${values.contact_no}`,
    //         user_status: `${values.user_status}`,
    //         location: `${values.location}`,
    //     }),
    // })
    const handleDate = (value) => {
        const date = new Date(value);

        // Get day, month, and year from the Date object
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month starts from 0
        const year = date.getFullYear();

        // Pad day and month with leading zeros if needed
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        // Construct the formatted date string
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
        return formattedDate
    }
    // const records = userData.slice(firstIndex, lastIndex);

    // const nPages = Math.ceil(userData.length / recordsPerPage)
    // const numbers = [...Array(nPages + 1).keys()].slice(1)

    const rows = userData.map((item) => (
        <tr key={item.id}>
            <td>{item.u_user_status ?
                (<Tooltip label={item.u_user_status === 'inactive' ? "Inactive" : "Active"}>
                    <ActionIcon variant='transparent' color={item.u_user_status === 'inactive' ? 'red' : 'green'} onClick={() => {
                        open();
                        setUserName(item.u_business_email)
                    }}><MdCircle /></ActionIcon>
                </Tooltip>) : (
                    <ActionIcon variant='transparent' color='gray'><MdCircle /></ActionIcon>
                )

            }</td>

            <td>{item.u_name}</td>
            <td>{item.u_contact_no}</td>
            <td>{item.u_business_email}</td>
            <td>{handleDate(item.date_joined)}</td>
            <td>{item.u_location}</td>
            <td>
                <Flex>
                    <Tooltip label={"Edit"}><ActionIcon variant='subtle'
                        onClick={() => {
                            // handleEditData(item)
                            setEditModal(true)
                            setUserName(item.u_business_email)

                            setEditStatus(true)
                        }} ><MdEdit color="#233c79" /></ActionIcon></Tooltip>
                    <Tooltip label={"Delete"}><ActionIcon variant='subtle' onClick={() => {
                        setOpenModal(true)
                        setUserName(item.u_business_email)
                    }} ><MdDeleteForever color="FF3C5F" /></ActionIcon></Tooltip>
                </Flex>
            </td>
        </tr>
    ))

    // const handleEditData = (data) => {
    //     console.log(data.u_name)
    //     setFormValues({
    //         name: data.u_name,
    //         business_email: data.u_business_email,
    //         contact_no: data.u_contact_no,
    //         location: data.u_location,
    //         user_status: value
    //     });
    //     setEditStatus(true)
    //     setEditData(data)
    // }
    const handleDelete = () => {
        setLoaderVisible(true)

        client.delete('add_delete_users/', {
            params: {
                business_email: userName
            }
        })
        setTimeout(() => {
            setOpenModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    const handleStatus = () => {
        setLoaderVisible(true)

        client.put("update_user_status/",
            { business_email: userName }
        )

        setTimeout(() => {
            close()
            setLoaderVisible(false)
        }, 1000);
    }

    const handleAddUser = () => {
        setLoaderVisible(true)

        client.post("add_delete_users/", form.getTransformedValues())
        setTimeout(() => {
            setUserModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    const handleEditUser = () => {
        setLoaderVisible(true)
        client.put("edit_user_details_hct/", form.getTransformedValues())
        setTimeout(() => {
            setEditModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    return (
        <div>

            <Container mt={mediumScreen ? "7rem" : "2rem"} size={"xl"}>
                <Center>
                    <Modal style={{ display: "flex", justifyContent: "center" }} opened={userModal} onClose={() => setUserModal(false)} title="Add user">
                        <form>
                            <SimpleGrid cols={1}>
                                <TextInput

                                    label="Name"
                                    name='name'
                                    placeholder="Enter name"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('name')}

                                />
                                <TextInput

                                    label="Email"
                                    name='username'
                                    placeholder="user@email.com"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('username')}

                                />
                                {/* <TextInput

                                    label="Password"
                                    name='password'
                                    placeholder=" password"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('password')}

                                /> */}
                                <TextInput

                                    label="Contact No."
                                    name='contact_no'
                                    placeholder="Enter Contact No."
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('contact_no')}

                                />
                                <TextInput

                                    label="Location"
                                    name='location'
                                    placeholder="Enter Location"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('location')}

                                />
                                <Radio.Group
                                    value={value}
                                    onChange={setValue}

                                    label="Select status of the user"

                                    withAsterisk
                                >
                                    <Group>
                                        <Radio value="active" label="Active" />
                                        <Radio value="inactive" label="Inactive" />
                                    </Group>
                                </Radio.Group>
                            </SimpleGrid>
                            <Space h={15} />
                            <Flex justify={"end"} gap={"2%"}>
                                <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                    variant='filled' onClick={handleAddUser}>Done</Button>
                                <Button variant='outline' color='dark' onClick={() => setUserModal(false)}>No</Button>
                            </Flex>
                        </form>

                    </Modal>
                </Center>

                <Center>
                    <Modal style={{ display: "flex", justifyContent: "center" }} opened={EditModal} onClose={() => {
                        setEditModal(false)
                        setEditStatus(false)
                    }} title="Edit user details">
                        <form>
                            <SimpleGrid cols={1}>
                                <TextInput

                                    label="Name"
                                    name='name'
                                    placeholder="Enter name"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('name')}

                                />
                                <TextInput

                                    label="Email"
                                    name='username'
                                    placeholder="user@email.com"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('username')}

                                />
                                {/* <TextInput

                                    label="Password"
                                    name='password'
                                    placeholder=" password"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('password')}

                                /> */}
                                <TextInput

                                    label="Contact No."
                                    name='contact_no'
                                    placeholder="Enter Contact No."
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('contact_no')}

                                />
                                <TextInput

                                    label="Location"

                                    name='location'
                                    placeholder="Enter Location"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('location')}

                                />
                                <Radio.Group
                                    value={value}
                                    onChange={setValue}

                                    label="Select status of the user"

                                    withAsterisk
                                >
                                    <Group>
                                        <Radio value="active" label="Active" />
                                        <Radio value="inactive" label="Inactive" />
                                    </Group>
                                </Radio.Group>

                                <Space h={15} />
                                <Flex justify={"end"} gap={"2%"}>
                                    <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                        variant='filled' onClick={handleEditUser}>Done</Button>
                                    <Button variant='outline' color='dark' onClick={() => {
                                        setEditModal(false)
                                        setEditStatus(false)
                                    }}>No</Button>
                                </Flex>
                            </SimpleGrid>
                        </form>

                    </Modal>
                </Center>
                <Center>
                    <Modal style={{ display: "flex", justifyContent: "center" }} opened={opened} onClose={close} title="Are you sure?!">
                        <Text>Do you really want to change the status?</Text>
                        <Space h={15} />
                        <Flex justify={"end"} gap={"2%"}>
                            <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                variant='filled' onClick={handleStatus}>Yes</Button>
                            <Button variant='outline' color='dark' onClick={close}>No</Button>
                        </Flex>
                    </Modal>
                </Center>

                <Center>
                    <Modal style={{ display: "flex", justifyContent: "center" }} opened={openModal} onClose={() => setOpenModal(false)} title="Are you sure?!">
                        <Text>Do you really want to delete this user?</Text>
                        <Space h={15} />
                        <Flex justify={"end"} gap={"2%"}>
                            <Button loading={loaderVisible} onClick={handleDelete} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                variant='filled'>Yes</Button>
                            <Button variant='outline' color='dark' onClick={() => setOpenModal(false)}>No</Button>
                        </Flex>
                    </Modal>
                </Center>
                <Flex justify={"space-between"}>
                    <Text fz={22} fw={600}>Users</Text>
                    <Group>
                        {/* <Select searchable nothingFound="No related courses" fz={18} w={400} radius={"md"} variant='filled'
                            placeholder='Search user'
                            icon={<ActionIcon><BiSearch /></ActionIcon>} data={["react", "Js"]}
                        // {data.map((option) => {
                        //   return {
                        //     value: option.value,
                        //     label: option.course_name,
                        //   };
                        // })} 
                        /> */}
                        <Button onClick={() => {
                            setUserModal(true)
                            setEditStatus(false)
                        }} radius={10} style={{ backgroundColor: "#233c79" }}>Add user</Button>
                    </Group>
                </Flex>

                <Space h={15} />

                <Card withBorder radius={10}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th> Status </th>
                                <th> Name </th>
                                <th> Contact no. </th>
                                <th> Email </th>
                                <th> Date of joining </th>
                                <th> Location </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                    <Space h={"xl"} />
                    <Flex justify={"end"}>
                        <Pagination value={currentPage} onChange={setCurrentPage} total={recordsPerPage} color="yellow" siblings={1} />
                    </Flex>
                </Card>
            </Container>
        </div>
    )
}

export default UserManagement
