// @ts-ignore
import { AppShell, Card, Paper, Grid, Flex, TextInput, ActionIcon, Tabs, Divider, Container, Title, Image, Group, Text, Button, SimpleGrid, Space, Header } from '@mantine/core'
import React, { useState, useEffect } from 'react'
// @ts-ignore
import { AiFillHome } from 'react-icons/ai'
// @ts-ignore
import { BiSearch } from 'react-icons/bi'
// @ts-ignore
import { FaBookOpen } from 'react-icons/fa'
// @ts-ignore
import { MdPerson } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Head from './dashboard Header/Head'
import Mydetails from './Mydetails'
// import axios from 'axios'
import client from '../API/api'



const EditDetails = () => {
  const navigate = useNavigate();
  const [getData, setGetData] = useState([])
  // @ts-ignore

  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    contact_no: '',
    company: '',
    business_email: '',
    years_of_experience: '',
    job_position: '',
    location: '',
  });

  const handleInputChange = (/** @type {{ target: { name: any; value: any; }; }} */ event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  }

  const updateData = async () => {

    try {
      const response = await client.put("user_details/", formData);
      navigate("/mydetails");
      console.log("response from the server:", response.data);

    } catch (error) {

      console.error('Error while updating details:', error);
    }



  };
  useEffect(() => {
    client.get("user_details/", {
      withCredentials: true,
    })

      .then(res => {
        console.log(res.data)
        setGetData(res.data["user_details"]);
      })

      .catch(err => {
        console.error('Error Fetching:', err)
      })
  }, [])
  return (

    <div>
      <Head />
      <div>

        <Container size={"xl"} style={{ margin: "1em", marginLeft: "4em" }}>
          <Card>
            <Group position='apart' >
              <Title fw={500} size={24}>My Details </Title>

              <Group spacing={"lg"}>

                <Button variant='outline' color='dark' onClick={() => navigate("/mydetails")}>CANCEL</Button>


                <Button variant='filled' onClick={updateData} style={{ backgroundColor: "rgba(240, 154, 62, 1)" }}>SAVE DETAILS</Button>

              </Group>

            </Group>
          </Card>
          <Divider />
          <Space h={15} />
          <Container style={{ marginLeft: 0 }}>
            <SimpleGrid cols={2}>
              {/* <TextInput
                label='User ID'
                name='user_id'
                value={formData.user_id}
                onChange={handleInputChange}
              /> */}

              <TextInput
                label="Name"
                name='name'
                // @ts-ignore
                placeholder={getData.name}
                onChange={handleInputChange}
              />
              <TextInput label="Contact No."
                name='contact_no'
                // @ts-ignore
                placeholder={getData.contact_no}
                onChange={handleInputChange}
              />
              <TextInput label="Company"
                name='company'
                // @ts-ignore
                placeholder={getData.company}
                onChange={handleInputChange}
              />
              <TextInput label="Email"
                name='business_email'
                // @ts-ignore
                placeholder={getData.business_email}
                onChange={handleInputChange}
              />
              <TextInput label="Years of Experience"
                name='years_of_experience'
                // @ts-ignore
                placeholder={getData.years_of_experience}
                onChange={handleInputChange}
              />
              <TextInput label="Job Position"
                name='job_position'
                // @ts-ignore
                placeholder={getData.job_position}
                onChange={handleInputChange}
              />
              <TextInput label="Location"
                name='location'
                // @ts-ignore
                placeholder={getData.location}
                onChange={handleInputChange}
              />
            </SimpleGrid>
          </Container>
        </Container>


      </div>
    </div>


  )
}

export default EditDetails
