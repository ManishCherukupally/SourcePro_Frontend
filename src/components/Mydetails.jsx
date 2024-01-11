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
import { useMediaQuery } from '@mantine/hooks'
import MydetailsComp from './CommonComponents/MydetailsComp'
import MobileHead from './dashboard Header/MobileHead'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'



const Mydetails = () => {

  const mediumScreen = useMediaQuery("(min-width: 1200px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");
  const extraLargeScreen = useMediaQuery("(min-width: 1770px)");


  return (
    <>
      {
        mediumScreen ? (
          <>
            <AppShell header={<Head />}>

              <MydetailsComp /></AppShell>
          </>
        ) : (
          <AppShell>
            <MydetailsComp />
            {/* <MobileHead /> */}
          </AppShell>
        )
      }
    </>
  )
}


export default Mydetails
