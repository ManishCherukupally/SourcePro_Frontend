import React, { useEffect, useState, useRef } from 'react'
import Head from './dashboard Header/Head'
import { ActionIcon, AppShell, Box, Card, CardSection, Container, Divider, Flex, Footer, Grid, Group, Header, Image, Paper, Progress, ScrollArea, SimpleGrid, Space, Tabs, Text, TextInput, Textarea } from '@mantine/core'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { courseidatom, lessonidatom } from '../Store/store'
import { Carousel } from '@mantine/carousel'
import { createStyles, getStylesRef } from '@mantine/core';
// import axios from 'axios'
import client from '../API/api'
import { useMediaQuery } from '@mantine/hooks'
import HomeComp from './CommonComponents/HomeComp'
import MobileHead from './dashboard Header/MobileHead'
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
  const mediumScreen = useMediaQuery("(min-width: 900px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");
  const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
  // var intialId;
  // useEffect(() => {
  //   client.get("usr_course_page_lesson/", {
  //     withCredentials: true,
  //     params: {
  //       course_id: courseid,
  //       lesson_id: "",
  //     }
  //   })
  //     .then(resp => console.log(resp.data))
  // })

  // const handleLessonPlay = () => {
  //   if (lessonId === null) {
  //     console.log("null executing")
  //     navigate(`/home/${courseid}/${intialId}`)
  //   }
  //   else {
  //     console.log("else executing")
  //     navigate(`/home/${courseid}/${lessonId}`)
  //   }
  // }

  return (
    <>
      {
        mediumScreen ? (
          <AppShell header={
            <Header><Head /></Header>
          }><HomeComp /></AppShell>
        ) : (
          <>
            <HomeComp />
            <MobileHead />
          </>
        )
      }
    </>
  )
}



export default Home
