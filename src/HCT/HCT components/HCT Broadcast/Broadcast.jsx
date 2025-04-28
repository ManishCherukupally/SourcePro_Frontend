import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import client from '../../../API/api';
import { ActionIcon, Button, Card, Container, Flex, Modal, MultiSelect, Pagination, Select, Space, Spoiler, Table, Text, Tooltip } from '@mantine/core';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useForm } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { FaTelegramPlane } from 'react-icons/fa';

const Broadcast = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    const [broadcastData, setbroadcastData] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(1)

    const [loaderVisible, setLoaderVisible] = useState(false);

    const [editModal, setEditModal] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [broadcastModal, setbroadcastModal] = useState(false)
    const [sendModal, setsendModal] = useState(false)

    const [broadcastId, setbroadcastId] = useState(null)

    const [templateData, settemplateData] = useState([])
    const [templatedropDownData, settemplatedropDownData] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const [userData, setuserData] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [editData, setEditData] = useState(null);
    // const [userData, setuserData] = useState([])
    // const userData = []
    // console.log(userData);
    const [selectedFrequency, setSelectedFrequency] = useState('');

    const [selectedSource, setSelectedSource] = useState('');

    const [newTemplateId, setnewTemplateId] = useState(null)
    const [newTemplate, setnewTemplate] = useState(null)
    const [newtemplateEdit, setnewtemplateEdit] = useState(false)
    useEffect(() => {
        client.get("broadcast_pagination/", {
            params: {
                page: currentPage
            }
        })
            .then((resp) => {
                // console.log(resp.data['templates']);
                setbroadcastData(resp.data['templates'])

                // resp.data['templates'].map(item => item.users.map(item => ({
                //     value: item.user_id,
                //     label: item.username,
                // })))
                // setTimeout(() => {
                //     broadcastData.map(item => userData.push(item["users"].map(item => ({
                //         value: item.user_id,
                //         label: item.username
                //     }))));
                //     console.log(userData);
                // }, 500);


                setRecordsPerPage(resp.data.number_of_pages)
            })
            .catch(err => console.error(err))
    }, [currentPage, loaderVisible])

    useEffect(() => {
        client.get('hct_template_dd')
            .then((resp) => {
                settemplateData(resp.data['template_list']);

                settemplatedropDownData(resp.data['template_list'].map(template => ({
                    value: template.template_id,
                    label: template.template_name,
                }))
                )
            })
            .catch(err => console.error(err))
    }, [])


    useEffect(() => {
        client.get('hct_active_users_dd')
            .then((resp) => {
                setuserData(resp.data['active_users'].map((user) => ({
                    value: user.user_id,
                    // label: user.business_email
                    label: user.name
                })))
            })
            .catch(err => console.error(err))
    }, [])
    // console.log(templatedropDownData);

    const handleSelectTemplate = (value) => {
        const selectedTemplateId = parseInt(value);
        newtemplateEdit ? setnewTemplate(selectedTemplateId) : setSelectedTemplate(selectedTemplateId);
    };

    console.log(newTemplate);
    const handleSelectUsers = (values) => {
        // setSelectedUsers(values);
        // Convert the selected values to the corresponding user IDs
        const selectedUserIds = values.map(value => parseInt(value));
        setSelectedUsers(selectedUserIds);
    };

    // const handleEditData = (item) => {
    //     setEditData(item);
    //     console.log(typeof (item.id));
    //     setSelectedUsers(item.users.map(user => user.user_id));
    //     setSelectedFrequency(item.frequency);
    //     setSelectedSource(item.follow_up);
    //     form.setFieldValue('time', item.time); // Set the initial time value
    //     setEditModal(true);
    // };

    const handleEditData = (item) => {

        setEditData(item);
        setSelectedTemplate(parseInt(item.template_id)); // Make sure this sets the correct template ID
        setSelectedUsers(item.users.map(user => user.user_id));
        setSelectedFrequency(item.frequency);
        setSelectedSource(item.follow_up);
        form.setFieldValue('time', item.time); // Set the initial time value
        // setEditModal(true);
        // console.log("Editing item:", item);
        // console.log("Selected template ID:", item.id);
        // console.log("Template data:", templateData);
    };

    const handleAddData = () => {
        setSelectedTemplate(null); // Make sure this sets the correct template ID
        setSelectedUsers([]);
        setSelectedFrequency("");
        setSelectedSource("");
        form.setFieldValue('time', "");
    }

    // console.log(templatedropDownData);
    const rows = broadcastData.map((item) => (
        <tr key={item.id} style={{ height: 50 }}>
            <td style={{ width: '346px' }}>{item.template}</td>
            <td style={{ width: '346px' }}>
                {
                    item.users.length > 1 ?
                        (
                            <Spoiler maxHeight={25} showLabel="Show more" hideLabel="Hide">

                                {item.users.map((item) => (
                                    <div key={item.user_id}>{item.username}</div>
                                ))}

                            </Spoiler>
                        ) : (

                            item.users.map((item) => (
                                <div key={item.user_id}>{item.username}</div>
                            ))

                        )
                }

            </td>
            <td style={{ width: '346px' }}>{item.frequency}</td>
            <td style={{ width: '346px' }}>{item.follow_up}</td>
            <td style={{ width: '346px' }}>{item.time}</td>
            <td>
                <Flex gap={"0.5rem"}>
                    <Tooltip label={"Send"}><ActionIcon variant='subtle' onClick={() => {
                        setsendModal(true)
                        setbroadcastId(item.id)
                    }} ><FaTelegramPlane color="#0096FF" /></ActionIcon></Tooltip>

                    <Tooltip label={"Edit"}><ActionIcon variant='subtle'
                        onClick={() => {
                            // handleEditData(item)
                            setEditModal(true)
                            setnewtemplateEdit(true)
                            handleEditData(item)

                            // console.log(templateData.find(template => template.template_id === item.id));
                            // setSelectedTemplate()
                            // // setSelectedUsers(item["users"].map(item => ({
                            // //     value: item.user_id,
                            // //     label: item.username
                            // // })))
                            // setSelectedFrequency(item.frequency)
                            // setSelectedSource(item.follow_up)

                            // setEditStatus(true)
                        }} ><MdEdit color="#233c79" /></ActionIcon></Tooltip>
                    <Tooltip label={"Delete"}><ActionIcon variant='subtle' onClick={() => {
                        setOpenModal(true)
                        setbroadcastId(item.id)
                        // setUserName(item.u_business_email)
                    }} ><MdDeleteForever color="FF3C5F" /></ActionIcon></Tooltip>
                </Flex>
            </td>
        </tr>
    ))

    const form = useForm({
        initialValues: {
            template_id: null,
            users: [],
            frequency: "",
            follow_up: "",
            time: null,
            new_template_id: null
        },
        transformValues: (values) => ({
            template_id: selectedTemplate,
            users: selectedUsers,
            frequency: selectedFrequency,
            follow_up: selectedSource,
            time: selectedFrequency === 'once' ? null : `${values.time}`,
            new_template_id: newTemplate,
        })
    })

    const handleAddBroadcast = () => {
        setLoaderVisible(true)
        console.log(form.getTransformedValues());
        client.post("create_broadcast/", form.getTransformedValues())
            .catch(err => console.error(err))

        setTimeout(() => {
            setbroadcastModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    const handleDelete = () => {
        setLoaderVisible(true)

        client.delete('delete_broadcast/', {
            params: {
                broadcast_id: broadcastId
            }
        })
            .catch(err => console.error(err))
        setTimeout(() => {
            setOpenModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    const handleEditBroadcast = () => {
        setLoaderVisible(true)
        client.put('update_broadcast/', form.getTransformedValues())
            .catch(err => console.error(err))
        setTimeout(() => {
            setEditModal(false)
            setLoaderVisible(false)
        }, 1000);
        setSelectedTemplate(newTemplate)
        setnewtemplateEdit(false)
    }

    const handleSend = () => {
        setLoaderVisible(true)
        client.put('broadcast/', {
            broadcast_id: broadcastId
        })
            .catch(err => console.error(err))
        setTimeout(() => {
            setsendModal(false)
            setLoaderVisible(false)
        }, 1000);
    }
    return (
        <div>
            <Container mt={mediumScreen ? "5rem" : "2rem"} size={"xxl"}>

                <Modal centered style={{ display: "flex", justifyContent: "center" }} opened={broadcastModal} onClose={() => setbroadcastModal(false)} title="Add Broadcast">
                    <Select
                        data={templatedropDownData}
                        placeholder="Select a template"
                        label="Templates"
                        value={selectedTemplate}
                        onChange={handleSelectTemplate}
                    />

                    <MultiSelect
                        dropdownPosition='bottom'
                        searchable
                        clearable
                        data={userData}
                        placeholder="Select users"
                        label="Users"
                        value={selectedUsers}
                        onChange={handleSelectUsers}
                    />

                    <Select
                        data={[
                            { value: 'once', label: 'Once' },
                            { value: 'periodic', label: 'Periodic' }]
                        }
                        placeholder="Select frequency"
                        label="Frequency"
                        value={selectedFrequency}
                        onChange={setSelectedFrequency}
                    />

                    {
                        selectedFrequency === 'periodic' ? (
                            <TimeInput
                                withSeconds
                                label='Time'
                                placeholder='Enter time'
                                {...form.getInputProps('time')}
                            />) : (null)
                    }

                    <Select
                        data={[
                            { value: 'mail', label: 'Mail' },
                            { value: 'whatsapp', label: 'Whatsapp' },
                            { value: 'both', label: 'Both' }]
                        }
                        placeholder="Select Source"
                        label="Source"
                        value={selectedSource}
                        onChange={setSelectedSource}
                    />

                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled' onClick={handleAddBroadcast} >Add</Button>
                        {/* <Button variant='outline' color='dark' onClick={() => settemplateModal(false)}>No</Button> */}
                    </Flex>
                </Modal>

                <Modal centered style={{ display: "flex", justifyContent: "center" }} opened={editModal} onClose={() => setEditModal(false)} title="Edit Broadcast">
                    <Select
                        data={templatedropDownData}
                        placeholder="Select a template"
                        label="Templates"
                        value={newtemplateEdit && newTemplate === null ? selectedTemplate : newTemplate}
                        onChange={(value) => {
                            newtemplateEdit ? setnewTemplate(parseInt(value)) : setSelectedTemplate(parseInt(value));
                        }}
                    // onChange={handleSelectTemplate}
                    />

                    <MultiSelect
                        dropdownPosition='bottom'
                        searchable
                        clearable
                        data={userData}
                        placeholder="Select users"
                        label="Users"
                        value={selectedUsers}
                        onChange={handleSelectUsers}
                    />

                    <Select
                        data={[
                            { value: 'once', label: 'Once' },
                            { value: 'periodic', label: 'Periodic' }]
                        }
                        placeholder="Select frequency"
                        label="Frequency"
                        value={selectedFrequency}
                        onChange={setSelectedFrequency}
                    />

                    {
                        selectedFrequency === 'periodic' ? (
                            <TimeInput
                                withSeconds
                                label='Time'
                                placeholder='Enter time'
                                {...form.getInputProps('time')}
                            />) : (null)
                    }

                    <Select
                        data={[
                            { value: 'mail', label: 'Mail' },
                            { value: 'whatsapp', label: 'Whatsapp' },
                            { value: 'both', label: 'Both' }]
                        }
                        placeholder="Select Source"
                        label="Source"
                        value={selectedSource}
                        onChange={setSelectedSource}
                    />

                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button type='submit' loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled' onClick={() => handleEditBroadcast()}>Edit</Button>
                        {/* <Button variant='outline' color='dark' onClick={() => settemplateModal(false)}>No</Button> */}
                    </Flex>

                </Modal>



                <Modal centered style={{ display: "flex", justifyContent: "center" }} opened={openModal} onClose={() => setOpenModal(false)} title="Are you sure?!">
                    <Text>Do you really want to delete this broadcast?</Text>
                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button loading={loaderVisible} onClick={handleDelete} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled'>Delete</Button>
                        {/* <Button variant='outline' color='dark' onClick={() => setOpenModal(false)}>No</Button> */}
                    </Flex>
                </Modal>

                <Modal centered style={{ display: "flex", justifyContent: "center" }} opened={sendModal} onClose={() => setsendModal(false)} title="Are you sure?!">
                    <Text>Do you really want to send this broadcast?</Text>
                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button loading={loaderVisible} onClick={handleSend} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled'>Send</Button>
                        {/* <Button variant='outline' color='dark' onClick={() => setOpenModal(false)}>No</Button> */}
                    </Flex>
                </Modal>

                <Flex justify={"space-between"}>
                    <Text fz={22} fw={600}>Broadcasts</Text>

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
                        setbroadcastModal(true)
                        handleAddData()
                        // setUserModal(true)
                        // setEditStatus(false)
                    }} radius={10} style={{ backgroundColor: "#233c79" }} >Add Broadcast  </Button>

                </Flex>

                <Space h={15} />
                <Card withBorder radius={10}>
                    <Table striped>
                        <thead >
                            <tr >
                                <th> Template name </th>
                                <th> Users </th>
                                <th> Frequency </th>
                                <th> Source </th>
                                <th> Time </th>
                                {/* <th> Location </th> */}
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

export default Broadcast
