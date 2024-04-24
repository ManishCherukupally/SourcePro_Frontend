import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { AppShell } from '@mantine/core';


import Head from "../dashboard Header/Head";
import CourseHomeComp from "../CommonComponents/CourseHomeComp";
import CourseMobileComp from "./CourseMobileComp";
const Course_home = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    return (
        <>
            {
                mediumScreen ? (<>
                    <AppShell header={<Head />}>
                        <CourseHomeComp />
                    </AppShell>
                </>) : (
                    <CourseMobileComp />
                )
            }
        </>

    )
}

export default Course_home
