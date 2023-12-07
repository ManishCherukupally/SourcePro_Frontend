// @ts-ignore
// @ts-ignore
import { Card, Flex, Group, Paper, Image, ActionIcon, TextInput, Tabs, Grid, Divider, Container, Title, Space, Text, SimpleGrid } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { FaBookOpen } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import Head from './dashboard Header/Head'
import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'


const Transaction = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.29.220:8000/training_subscription/", {
      withCredentials: true,
    })
      .then(response => {
        console.log('Fetched data:', response.data["Training_Subscription"]);
        setSubscriptions(response.data["Training_Subscription"])
      })
      .catch(err => {
        console.error(err);
      }
      )
  }, [])
  return (
    <div>
      <Head />
      <Container size={"xl"} style={{ margin: "1em", marginLeft: "4em" }}>
        <Card style={{ paddingLeft: 0 }}>
          <Title fw={500} size={24}>Training Subscription </Title>
        </Card>
        <Divider />

        <Space h={30} />
        <Container style={{ marginLeft: 0, paddingLeft: 0 }} size={"lg"}>
          <>
            {subscriptions.map(data => (
              <div key={data?.
                // @ts-ignore
                Course_name}>


                <Text fw={600}>{data?.
                  // @ts-ignore
                  Course_name}</Text>
                <Space h={5} />
                <Card style={{ padding: 0 }}>
                  <Flex align={"center"}>
                    <Text c={"dimmed"} fw={500} fz={"sm"}>Date :</Text>
                    <Space w={5} />
                    <Text fw={500} fz={"sm"} >{new Date(data.
                      // @ts-ignore
                      subscription_date).toLocaleDateString('en-UK')}</Text>
                  </Flex>

                  <Space h={5} />
                  <Flex align={"center"}>
                    <Text c={"dimmed"} fw={500} fz={"sm"}>Time :</Text>
                    <Space w={5} />
                    <Text fw={500} fz={"sm"}>{data?.
                      // @ts-ignore
                      subscription_time}</Text>
                  </Flex>
                  <Space h={5} />
                  <Flex align={"center"}>
                    <Text c={"dimmed"} fw={500} fz={"sm"}>Order ID :</Text>
                    <Space w={5} />
                    <Text fw={500} fz={"sm"}>{data?.
                      // @ts-ignore
                      order_id}</Text>
                  </Flex>
                  <Space h={5} />
                  <Flex align={"center"}>
                    <Text c={"dimmed"} fw={500} fz={"sm"}>Amount :</Text>
                    <Space w={5} />
                    <Text fw={500} fz={"sm"}>Rs {data?.
                      // @ts-ignore
                      amount}</Text>

                  </Flex>
                </Card>
                <Space h={15} />
                <Divider variant='dashed' />
                <Space h={15} />

              </div>
            ))}
          </>
        </Container>
      </Container>
    </div>
  )
}

export default Transaction
