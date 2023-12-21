import React, { useEffect, useState, useRef } from 'react'
import Head from './dashboard Header/Head'
import { ActionIcon, AppShell, Box, Card, CardSection, Container, Divider, Flex, Grid, Group, Image, Paper, Progress, ScrollArea, SimpleGrid, Space, Tabs, Text, TextInput, Textarea } from '@mantine/core'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { courseidatom, lessonidatom } from '../Store/store'
import { Carousel } from '@mantine/carousel'
import { createStyles, getStylesRef } from '@mantine/core';
// import axios from 'axios'
import client from '../API/api'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'

const useStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:hover': {
      [`& .${getStylesRef('controls')}`]: {
        opacity: 1,
      },
    },
  },
}));

const Home = () => {
  const { classes } = useStyles();

  const navigate = useNavigate()
  const [continueLearning, setContinueLearning] = useState([])
  const [newCourses, setNewCourses] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [courseid, setCourseid] = useAtom(courseidatom)
  console.log(courseid)
  const [lessonId, setLessonId] = useAtom(lessonidatom)
  console.log("lessonId" + lessonId)

  useEffect(() => {
    client.get("home/", {
      withCredentials: true
    })
      .then((resp) => {


        const continueapidata = resp.data["Continue_Learning"]
        setContinueLearning(continueapidata)
        // setLessonId(continueapidata.last_viewed_lesson_id)
        setCourseid(resp.data.Continue_Learning.map((/** @type {{ course_id: any; }} */ courseid) => (
          courseid.course_id

        )))
        const courseId = courseid; // Get the course ID dynamically
        const lastViewedLesson = continueapidata.find((course) => course.course_id === courseId);

        if (lastViewedLesson) {
          setLessonId(lastViewedLesson.last_viewed_lesson_id);
        }
        // console.log(courseid)
        // @ts-ignore
        // console.log(JSON.stringify(resp.data.Continue_Learning[0].course_id))

        const newcoursedata = resp.data.New_Courses
        setNewCourses(newcoursedata)

        const allcoursedata = resp.data.All_Courses
        setAllCourses(allcoursedata)


      })
  }, [])


  return (
    <>

      <Head />
      {/* <Course_home /> */}



      <Container mt={"2rem"} size={"xl"}>
        <Text fz={20} fw={500}>Continue Learning</Text>
        <Space h={10} />
        <Carousel slideSize="0%"
          classNames={classes}
          align={"start"}
          slidesToScroll={4}
          slideGap={19}
          draggable

        >
          {continueLearning.map((card) => (
            <>
              <Carousel.Slide>
                <div onClick={() => navigate(`/home/${card.
                  // @ts-ignore
                  course_id}/${card.last_viewed_lesson_id}`)}>
                  <Card className="coursecard" shadow='sm' w={277} p={0} withBorder radius={"md"}>
                    <Card h={120} w={277} p={0} radius={0} >
                      <Image style={{ position: "relative" }}
                        src={card.thumbnail}

                        height={140}

                      />
                    </Card >

                    <Progress bg={"rgba(131, 94, 54, 1)"} h={6} color='yellow' radius={0}
                      // @ts-ignore
                      value={card.percentage_completed} />
                    <Card pt={6} h={67} radius={0} style={{ backgroundColor: "#ECECEC" }}>
                      <Text fs={"Open Sans"} fz={16} fw={500}>{card.
                        // @ts-ignore
                        course_name}</Text>
                      <Text fs={"Open Sans"} fz="sm" color="dimmed">
                        {card.
                          // @ts-ignore
                          minutes_left} mins left
                      </Text>

                    </Card>
                  </Card>

                </div>
              </Carousel.Slide>
            </>
          ))
          }

        </Carousel>

        <Space h={25} />
        <Text fz={20} fw={500}>New Courses</Text>
        <Space h={10} />
        <Carousel slideSize="0%"
          align={"start"}
          slidesToScroll={4}
          slideGap={19}
          draggable
          classNames={classes}

        >
          {newCourses.map((card) => {
            return (
              <Carousel.Slide>
                <Card shadow='sm' w={277} p={0} withBorder radius={"md"}>
                  <Card h={120} p={0} radius={0} >
                    <Image
                      src={card.thumbnail}

                      height={130}

                    />
                  </Card >


                  <Card pt={6} h={67} radius={0} style={{ backgroundColor: "#ECECEC" }}>
                    <Text fs={"Open Sans"} fz={16} fw={500}>{card.
                      // @ts-ignore
                      course_name}</Text>
                    <Text fs={"Open Sans"} fz="sm" color="dimmed">
                      {card.
                        // @ts-ignore
                        total_duration} mins
                    </Text>
                  </Card>
                </Card>
              </Carousel.Slide>
            )
          })}
        </Carousel>
        <Space h={25} />
        <Text fz={20} fw={500}>All Courses</Text>
        <Space h={10} />
        <Carousel slideSize="0%"
          classNames={classes}
          align={"start"}
          slidesToScroll={4}
          slideGap={19}
          draggable


        >
          {allCourses.map((card) => {
            return (
              <>
                <Carousel.Slide>
                  <Card shadow='sm' mb={"1rem"} w={277} p={0} withBorder radius={"md"}>
                    <Card h={120} p={0} radius={0} >
                      <Image
                        src={card.thumbnail}
                        height={130}

                      />
                    </Card>

                    <Progress color='yellow' radius={0}
                      // @ts-ignore
                      value={card.percentage_completed} />
                    <Card pt={6} h={67} radius={0} style={{ backgroundColor: "#ECECEC" }}>
                      <Text fs={"Open Sans"} fz={16} fw={500}>{card.
                        // @ts-ignore
                        course_name}</Text>
                      <Text fs={"Open Sans"} fz="sm" color="dimmed">
                        {card.
                          // @ts-ignore
                          total_duration} mins
                      </Text>
                    </Card>
                  </Card>
                </Carousel.Slide>


              </>
            )
          })}




        </Carousel>
      </Container>

    </>
  )
}



export default Home
