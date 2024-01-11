// @ts-ignore
// @ts-ignore
import { Card, Flex, Group, Paper, Image, ActionIcon, TextInput, Tabs, Grid, Divider, Container, Title, Space, Text, SimpleGrid, AppShell } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { FaBookOpen } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import Head from './dashboard Header/Head'
// import axios from 'axios'
import client from '../API/api'
import { useMediaQuery } from '@mantine/hooks'
import TrainingSubscriptions from './CommonComponents/TrainingSubscriptions'
import MobileHead from './dashboard Header/MobileHead'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'


const Transaction = () => {
  const mediumScreen = useMediaQuery("(min-width: 1200px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");
  const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

  return (
    <div>
      {
        mediumScreen ? (
          <>
            <AppShell header={<Head />}>

              <TrainingSubscriptions /></AppShell>
          </>
        ) : (
          <AppShell>
            <TrainingSubscriptions />
            {/* <MobileHead /> */}
          </AppShell>
        )
      }

    </div>
  )
}

export default Transaction