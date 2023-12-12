// @ts-ignore
import { ActionIcon, AppShell, Card, Divider, Flex, Grid, Paper, Tabs, TextInput, Image, Title, Container, Group, Text, Space, SimpleGrid, UnstyledButton } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { FaBookOpen } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Head from './dashboard Header/Head'
// import axios from "axios"
import client from '../API/api'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'



const Mydetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    client.get("user_details/", {
      withCredentials: true
    })

      .then(res => {
        console.log(res.data)
        setData(res.data);
      })


      .catch(err => {
        console.error('Error Fetching:', err)
      })
  }, [data])

  return (
    <>
      <Head />
      <div>

        <Container size={"xl"} style={{ margin: "1em", marginLeft: "4em" }}>
          <Card>
            <Flex align={"end"} gap={20} >
              <Title fw={500} size={24}>My Details </Title>

              <UnstyledButton

                onClick={() => navigate("/mydetails/editdetails")} className='editbtn'
                style={{ textDecoration: "none", paddingBottom: 4 }}>EDIT </UnstyledButton>
            </Flex>
          </Card>
          <Divider />

          <Space h={15} />

          <Container size={'sm'} style={{ marginLeft: 0 }}>
            <SimpleGrid cols={2}>
              <Flex direction={"column"}>
                <Text color='dimmed' fz={14} fw={600}>Name</Text>
                <Text fw={600} fz={18}>
                  {data?.
                    // @ts-ignore
                    user_details?.name}
                </Text>
              </Flex>

              <Flex direction={"column"}>
                <Text color='dimmed' fz={14} fw={600}>Contact No.</Text>
                <Text fw={600} fz={18}>
                  {data?.
                    // @ts-ignore
                    user_details?.contact_no}</Text>
              </Flex>

              <Flex direction={"column"}>
                <Text color='dimmed' fz={14} fw={600}>Company</Text>
                <Text fw={600} fz={18}>
                  {data?.
                    // @ts-ignore
                    user_details?.company}</Text>
              </Flex>

              <Flex direction={"column"}>
                <Text color='dimmed' fz={14} fw={600}>Email</Text>
                <Text fw={600} fz={18}>
                  {data?.
                    // @ts-ignore
                    user_details?.business_email}</Text>
              </Flex>

              <Flex direction={"column"}>
                <Text color='dimmed' fz={14} fw={600}>Years of Experience</Text>
                <Text fw={600} fz={18}>
                  {data?.
                    // @ts-ignore
                    user_details?.years_of_experience}</Text>
              </Flex>

              <Flex direction={"column"}>
                <Text color='dimmed' fz={14} fw={600}>Job Position</Text>
                <Text fw={600} fz={18}>
                  {data?.
                    // @ts-ignore
                    user_details?.job_position}</Text>
              </Flex>

              <Flex direction={"column"}>
                <Text color='dimmed' fz={14} fw={600}>Location</Text>
                <Text fw={600} fz={18}>{
                  // @ts-ignore
                  data?.user_details?.location}</Text>
              </Flex>
            </SimpleGrid>

          </Container>

        </Container>
      </div>
    </>
  )
}


export default Mydetails
