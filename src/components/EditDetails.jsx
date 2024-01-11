// @ts-ignore
import React from 'react'

import Head from './dashboard Header/Head'

import { useMediaQuery } from '@mantine/hooks'
import { AppShell } from '@mantine/core';
import EditDetailsComp from './CommonComponents/EditDetailsComp';



const EditDetails = () => {
  const mediumScreen = useMediaQuery("(min-width: 1200px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");
  const extraLargeScreen = useMediaQuery("(min-width: 1770px)");


  return (


    <div>
      {
        mediumScreen ? (
          <AppShell header={
            <Head />
          }><EditDetailsComp /></AppShell>
        ) : (<EditDetailsComp />)
      }
    </div>


  )
}

export default EditDetails
