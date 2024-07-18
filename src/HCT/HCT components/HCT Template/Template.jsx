import { ActionIcon, Button, Card, Container, Flex, Group, Modal, Pagination, SimpleGrid, Space, Spoiler, Table, Text, TextInput, Textarea, Tooltip } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import client from '../../../API/api';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useForm } from '@mantine/form';

const Template = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    const [templateData, settemplateData] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(1)

    const [loaderVisible, setLoaderVisible] = useState(false);
    const [templateModal, settemplateModal] = useState(false)
    const [EditModal, setEditModal] = useState(false)
    const [editStatus, setEditStatus] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const [templateId, settemplateId] = useState(null)
    // const [templateName, settemplateName] = useState('')
    // const [templateBody, settemplateBody] = useState('')
    // const [templateHeading, settemplateHeading] = useState('')


    useEffect(() => {
        client.get("template_pagination/", {
            params: {
                page: currentPage
            }
        })
            .then((resp) => {
                // console.log(resp.data['templates']);
                settemplateData(resp.data['templates'])
                // console.log(resp.data['templates'][0].template_name);
                setRecordsPerPage(resp.data.number_of_pages)


            })
            .catch(err => console.error(err))
    }, [currentPage, loaderVisible])

    const editDetails = (data) => {
        form.setValues({
            template_id: data.id,
            template_name: data.template_name,
            template_heading: data.template_heading,
            template_body: data.template_body
        });
    }

    const rows = templateData.map((item, index) => (
        <tr key={index} style={{ height: 50 }}>
            <td style={{ width: '346px' }}>{item.template_name}</td>
            <td style={{ width: '346px' }}>{item.template_heading}</td>
            {/* <Tooltip label={item.template_body} > */}
            {
                item.template_body.length > 50 ? (
                    <Spoiler maxHeight={25} showLabel="..." hideLabel="Hide">
                        <td style={{ width: '346px' }}>{item.template_body}</td>
                    </Spoiler>
                ) : (
                    <td style={{ width: '346px' }}>{item.template_body}</td>
                )
            }
            {/* </Tooltip> */}
            <td style={{ width: '200px' }}>
                <Flex>
                    <Tooltip label={"Edit"}><ActionIcon variant='subtle'
                        onClick={() => {
                            // handleEditData(item)
                            editDetails(item)
                            setEditModal(true)
                            settemplateId(item.id)
                            // settemplateName(item.template_name)
                            // console.log(templateName);
                            setEditStatus(true)
                        }} ><MdEdit color="#233c79" /></ActionIcon></Tooltip>
                    <Tooltip label={"Delete"}><ActionIcon variant='subtle' onClick={() => {

                        setOpenModal(true)
                        settemplateId(item.id)
                        console.log(item.id);
                        // handleDelete()
                        // setUserName(item.u_business_email)
                    }} ><MdDeleteForever color="FF3C5F" /></ActionIcon></Tooltip>
                </Flex>
            </td>
        </tr>
    ))



    const form = useForm({
        initialValues: {
            template_id: null,
            template_name: "",
            template_heading: "",
            template_body: "",
        },
        transformValues: (values) => ({
            template_id: templateId,
            template_name: `${values.template_name}`,
            template_heading: `${values.template_heading}`,
            template_body: `${values.template_body}`
        })

    })

    const handleAddTemplate = () => {
        setLoaderVisible(true)

        client.post("create_template/", form.getTransformedValues())
            .catch(err => console.error(err))
        setTimeout(() => {
            settemplateModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    const handleDelete = () => {
        setLoaderVisible(true)

        client.delete('delete_template/', {
            params: {
                template_id: templateId
            }
        })
            .catch(err => console.error(err))
        setTimeout(() => {
            setOpenModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    const handleEditTemplate = () => {
        // console.log(templateName);
        setLoaderVisible(true)
        client.put("update_template/", form.getTransformedValues())
            .catch(err => console.error(err))
        setTimeout(() => {
            setEditModal(false)
            setLoaderVisible(false)
        }, 1000);
    }
    // console.log(templateData.filter((item) => item.id === templateId ? item.template_name : ""));
    return (
        <div>
            <Container mt={mediumScreen ? "5rem" : "2rem"} size={"xxl"}>

                <Modal centered style={{ display: "flex", justifyContent: "center" }} opened={templateModal} onClose={() => settemplateModal(false)} title="Add Template">
                    <form>
                        <SimpleGrid cols={1}>
                            <Textarea
                                autosize
                                minRows={1}

                                label="Template Name"
                                name='template_name'
                                placeholder="Enter Template name"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('template_name')}

                            />
                            <Textarea
                                autosize
                                minRows={1}

                                label="Template Heading"
                                name='template_heading'
                                placeholder="Enter Template heading"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('template_heading')}

                            />
                            {/* <Textarea
                                autosize
                                minRows={1}

                                    label="Password"
                                    name='password'
                                    placeholder=" password"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('password')}

                                /> */}
                            <Textarea
                                autosize
                                minRows={1}

                                label="Template Body"
                                name='template_body'
                                placeholder="Enter Template Body"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('template_body')}

                            />

                        </SimpleGrid>
                        <Space h={15} />
                        <Flex justify={"end"} gap={"2%"}>
                            <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                variant='filled' onClick={handleAddTemplate} >Add</Button>
                            {/* <Button variant='outline' color='dark' onClick={() => settemplateModal(false)}>No</Button> */}
                        </Flex>
                    </form>

                </Modal>

                <Modal centered style={{ display: "flex", justifyContent: "center" }} opened={openModal} onClose={() => setOpenModal(false)} title="Are you sure?!">
                    <Text>Do you really want to delete this template?</Text>
                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button loading={loaderVisible} onClick={handleDelete} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled'>Delete</Button>
                        {/* <Button variant='outline' color='dark' onClick={() => setOpenModal(false)}>No</Button> */}
                    </Flex>
                </Modal>

                <Modal centered style={{ display: "flex", justifyContent: "center" }} opened={EditModal} onClose={() => {
                    setEditModal(false)
                    // setEditStatus(false)
                }} title="Edit Template">
                    <form onSubmit={handleEditTemplate}>
                        <SimpleGrid cols={1}>
                            <Textarea
                                autosize
                                minRows={1}
                                label="Template Name"
                                name='template_name'
                                placeholder="Enter Template name"
                                size={mediumScreen ? "md" : "lg"}
                                // value={templateName}
                                {...form.getInputProps('template_name')}

                            />
                            <Textarea
                                autosize
                                minRows={1}
                                label="Template Heading"
                                name='template_heading'
                                placeholder="Enter Template heading"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('template_heading')}

                            />

                            <Textarea
                                autosize
                                minRows={1}
                                label="Template Body"
                                name='template_body'
                                placeholder="Enter Template Body"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('template_body')}

                            />

                            <Space h={15} />
                            <Flex justify={"end"} gap={"2%"}>
                                <Button type='submit' loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                    variant='filled' >Edit</Button>
                                {/* <Button variant='outline' color='dark' onClick={() => {
                                    setEditModal(false)
                                    // setEditStatus(false)
                                }}>No</Button> */}
                            </Flex>
                        </SimpleGrid>
                    </form>

                </Modal>
                <Flex justify={"space-between"}>
                    <Text fz={22} fw={600}>Templates</Text>

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
                        settemplateModal(true)
                        form.setValues({
                            template_id: null,
                            template_name: "",
                            template_heading: "",
                            template_body: ""
                        });
                        // setEditStatus(false)
                    }} radius={10} style={{ backgroundColor: "#233c79" }}>Add Template  </Button>

                </Flex>

                <Space h={15} />

                <Card withBorder radius={10}>
                    <Table striped >
                        <thead>
                            <tr>
                                <th> Template Name </th>
                                <th> Template Heading </th>
                                <th>Template Body </th>
                                {/* <th> Email </th>
                                <th> Date of joining </th>
                                <th> Location </th> */}
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

export default Template
