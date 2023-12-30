// @ts-ignore
import { AppShell, Card, Paper, Grid, Flex, TextInput, ActionIcon, Tabs, Divider, Container, Title, Image, Group, Text, Button, SimpleGrid, Space, Header } from '@mantine/core'
import React, { useState, useEffect } from 'react'
import { useForm } from '@mantine/form'
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
  const [getData, setGetData] = useState({})
  const [state, setState] = useState(true)
  // console.log(getData.name)
  // @ts-ignore

  // const [formData, setFormData] = useState({

  //   name: '',
  //   contact_no: '',
  //   company: '',
  //   business_email: '',
  //   years_of_experience: '',
  //   job_position: '',
  //   location: '',
  // });

  // const handleInputChange = (/** @type {{ target: { name: any; value: any; }; }} */ event) => {
  //   const { name, value } = event.target;

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });

  // }
  const userData = []
  useEffect(() => {
    const fun = () => {
      client.get("user_details/", {
        withCredentials: true,
      })

        .then(res => {
          console.log(res.data)
          console.log(res.data.user_details.business_email)
          // 
          setGetData(res.data["user_details"]);

        })

        .catch(err => {
          console.error('Error Fetching:', err)
        })
    }
    fun()
  }, [])



  const form = useForm({
    initialValues: {
      name: window.localStorage.getItem("username"),
      contact_no: window.localStorage.getItem("contact_no"),
      company: window.localStorage.getItem("company"),
      business_email: window.localStorage.getItem("business_email"),
      years_of_experience: window.localStorage.getItem("years_of_experience"),
      job_position: window.localStorage.getItem("job_position"),
      location: window.localStorage.getItem("location"),
    },

    transformValues: (values) => ({
      name: `${values.name}`,
      contact_no: `${values.contact_no}`,
      company: `${values.company}`,
      business_email: `${values.business_email}`,
      years_of_experience: `${values.years_of_experience}`,
      job_position: `${values.job_position}`,
      location: `${values.location}`,
    }),
  })


  const updateData = () => {
    window.localStorage.setItem("username", form.values.name)
    window.localStorage.setItem("contact_no", form.values.contact_no)
    window.localStorage.setItem("company", form.values.company)
    window.localStorage.setItem("business_email", form.values.business_email)
    window.localStorage.setItem("years_of_experience", form.values.years_of_experience)
    window.localStorage.setItem("job_position", form.values.job_position)
    window.localStorage.setItem("location", form.values.location)

    try {
      const response = client.put("user_details/", form.getTransformedValues());
      navigate("/mydetails");
      console.log("response from the server:", response.data);

    } catch (error) {

      console.error('Error while updating details:', error);
    }
  };
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
            <form >
              <SimpleGrid cols={2}>
                {/* <TextInput
                label='User ID'
                name='user_id'
                value={formData.user_id}
                onChange={handleInputChange}
              /> */}

                {/* <TextInput
                label="Name"
                name='name'
                // @ts-ignore
                value={getData.name}
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
              /> */}
                <TextInput
                  label="Name"
                  name='name'
                  placeholder="Name"
                  {...form.getInputProps('name')}

                />

                <TextInput
                  label="Contact No."
                  name='contact_no'
                  placeholder="your contact no."
                  {...form.getInputProps('contact_no')}
                />

                <TextInput
                  label="Company"
                  name='company'
                  placeholder="your organization name"
                  {...form.getInputProps('company')}
                />

                <TextInput
                  label="Email"
                  name='business_email'
                  placeholder="your business email"
                  {...form.getInputProps('business_email')}
                />

                <TextInput
                  label="Years of Experience"
                  name='years_of_experience'
                  placeholder="years of experience"
                  {...form.getInputProps('years_of_experience')}
                />

                <TextInput
                  label="Job Position"
                  name='job_position'
                  placeholder="your designation"
                  {...form.getInputProps('job_position')}
                />

                <TextInput
                  label="Location"
                  name='location'
                  placeholder="your location"
                  {...form.getInputProps('location')}
                />

              </SimpleGrid>
            </form>
          </Container>
        </Container>


      </div>
    </div>


  )
}

export default EditDetails
