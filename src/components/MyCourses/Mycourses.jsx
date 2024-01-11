import { AppShell } from '@mantine/core';
import React from 'react'
import Head from '../dashboard Header/Head';
import MyCoursesComp from '../CommonComponents/MyCoursesComp';
import MobileHead from '../dashboard Header/MobileHead';
import { useMediaQuery } from '@mantine/hooks';

const Mycourses = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    return (
        <div>
            {
                mediumScreen ? (
                    <AppShell header={<Head />}>
                        <MyCoursesComp />
                    </AppShell>
                ) : (
                    <>
                        <MyCoursesComp />
                        <MobileHead />
                    </>
                )
            }
        </div>
    )
}

export default Mycourses
