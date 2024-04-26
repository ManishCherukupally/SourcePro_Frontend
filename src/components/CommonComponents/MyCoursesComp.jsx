import React, { useEffect, useState } from 'react'
import { Box, Image, Card, CardSection, Container, Divider, Group, Tabs, Text, Title, Flex, Stack, Space, ActionIcon, Progress, Center, Skeleton } from '@mantine/core';
import Head from '../dashboard Header/Head';
import { BsCheckCircle, BsDot } from 'react-icons/bs';

import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { lessonidatom } from '../../Store/store';
// import axios from 'axios';
import client from '../../API/api';
import { useMediaQuery } from '@mantine/hooks';
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'

/**
 * @param {{ thumbnail: string | null | undefined; course_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; deactivation_days_left: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; author: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; date_of_subscription: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }} data
 */

function ProgressCard({ data, skeleton }) {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const navigate = useNavigate();
    const [hours, minutes, seconds] = data.minutes_left.split(":");

    // Calculate total minutes
    const totalMinutesCalculated = Number(hours) * 60 + Number(minutes) + Number(seconds) / 60;
    return (
        <div>
            {
                mediumScreen ? (
                    <>
                        <Skeleton visible={skeleton} >
                            <Flex >

                                <Card className='coursecard' onClick={() => { navigate(`/courseplayer/${data.course_id}/${data.last_viewed_lesson_id}`) }}>
                                    <CardSection>
                                        <Image
                                            radius={"md"}
                                            width={200}
                                            height={120}

                                            src={data.thumbnail} />
                                    </CardSection>
                                </Card>

                                <Space w={10} />
                                <Flex direction={"column"}>

                                    <Text fz={16} fw={600}>{data.



                                        course_name}</Text>
                                    <Flex gap={"0.2rem"} align={"end"}><Text fz={12} fw={600}>Deactivation:</Text>

                                        <Text fz={15} fw={600} c={data.deactivation_days_left <= 5 ? "red" : "black"}>{data.



                                            deactivation_days_left} {data.deactivation_days_left < 2 ? "day" : "days"}</Text><Text fz={12} fw={600}>left</Text>
                                    </Flex >
                                    <Text fz={12} fw={600}>By: {data.

                                        author} . {new Date(data.subscription_datetime).toLocaleDateString('en-GB')} </Text>
                                    <Space h={32} />
                                    <Group >

                                        <Progress w={150} color="yellow" radius={"xl"}

                                            value={data.percentage_completed} />

                                        <Text fz={12} fw={400}>{Math.floor(totalMinutesCalculated)}min left</Text>
                                    </Group>

                                </Flex>

                            </Flex>
                        </Skeleton>

                        <Space h={15} />
                        <Divider />
                        <Space h={15} />
                    </>
                ) : (
                    <Center>
                        <Skeleton visible={skeleton} >
                            <Card onClick={() => navigate(`/courseplayer/${data.course_id}/${data.last_viewed_lesson_id}`)}
                                shadow='sm' p={0} withBorder radius={"md"}
                            >
                                <Card.Section p={0} radius={0} >
                                    <Image style={{ position: "relative" }}
                                        src={data.thumbnail}

                                        height={200}

                                    />
                                </Card.Section >

                                <Progress bg={"rgba(131, 94, 54, 1)"} h={6} color='yellow' radius={0}
                                    // @ts-ignore
                                    value={data.percentage_completed} />
                                <Card radius={0} style={{ backgroundColor: "#ECECEC" }}>
                                    <Text fs={"Open Sans"} fz={16} fw={500}>{data.
                                        // @ts-ignore
                                        course_name}</Text>

                                    <Flex gap={"0.2rem"} align={"baseline"} >
                                        <Text fz={12} fw={600}>{Math.floor(totalMinutesCalculated)}min left</Text>
                                        <Space w={10} />
                                        <Text fz={12} fw={600}>Deactivation:</Text>
                                        <Text fz={15} fw={600} c={data.deactivation_days_left <= 5 ? "red" : "black"}>{data.deactivation_days_left} {data.deactivation_days_left < 2 ? "day" : "days"}</Text>
                                        <Text fz={12} fw={600}>left</Text>
                                    </Flex >
                                    {/* <Text fs={"Open Sans"} fz="sm" color="dimmed">
                        {card.
                            // @ts-ignore
                            minutes_left} mins left
                    </Text> */}

                                </Card>
                            </Card>
                        </Skeleton>
                    </Center>
                )
            }
        </div>
    )
}
/**
 * @param {{ thumbnail: string | null | undefined; course_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; deactivation_days_left: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; author: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; subscription_datetime: string | number | Date; }} data
 */
// @ts-ignore
function HistoryCard({ hdata, skeleton }) {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    const navigate = useNavigate();
    const isDisabled = hdata.deactivation_days_left === 0;

    return (
        <div>
            {
                mediumScreen ? (
                    <>
                        {
                            isDisabled ? (
                                <Skeleton visible={skeleton} >
                                    <div style={{ opacity: 0.4, pointerEvents: 'none' }}>
                                        <Flex >

                                            <Card>
                                                <CardSection>
                                                    <Image
                                                        radius={"md"}
                                                        width={200}
                                                        height={120}

                                                        src={hdata.thumbnail} />
                                                </CardSection>
                                            </Card>
                                            <Space w={10} />
                                            <Flex direction={"column"}>
                                                <Text fz={16} fw={600}>{hdata.


                                                    course_name}</Text>
                                                <Flex gap={"0.2rem"} align={"end"}><Text fz={12} fw={600}>Course has been deactivated</Text>

                                                </Flex >
                                                <Text fz={12} fw={600}>By: {hdata.author} . {new Date(hdata.subscription_datetime).toLocaleDateString('en-GB')} </Text>
                                                <Space h={28} />
                                                <div>
                                                    <Flex align={"center"} >
                                                        <ActionIcon color='green'><BsCheckCircle /></ActionIcon>
                                                        <Text fz={12} c={'green'}>{hdata.course_status}</Text>
                                                    </Flex>
                                                </div>
                                            </Flex>

                                        </Flex>
                                    </div>
                                </Skeleton>
                            ) : (
                                <Skeleton visible={skeleton} >
                                    <Flex >

                                        <Card className='coursecard' onClick={() => { navigate(`/courseplayer/${hdata.course_id}/${hdata.last_viewed_lesson_id}`) }}>
                                            <CardSection>
                                                <Image
                                                    radius={"md"}
                                                    width={200}
                                                    height={120}

                                                    src={hdata.thumbnail} />
                                            </CardSection>
                                        </Card>

                                        <Space w={10} />
                                        <Flex direction={"column"}>
                                            <Text fz={16} fw={600}>{hdata.


                                                course_name}</Text>
                                            <Flex gap={"0.2rem"} align={"end"}><Text fz={12} fw={600}>Deactivation:</Text>
                                                <Text fz={15} fw={600} c={hdata.deactivation_days_left <= 5 ? "red" : "black"}>{hdata.



                                                    deactivation_days_left} {hdata.deactivation_days_left < 2 ? "day" : "days"}</Text><Text fz={12} fw={600}>left</Text>
                                            </Flex >
                                            <Text fz={12} fw={600}>By: {hdata.

                                                author} . {new Date(hdata.subscription_datetime).toLocaleDateString('en-UK')} </Text>
                                            <Space h={28} />
                                            <div>
                                                <Flex align={"center"} >
                                                    <ActionIcon color='green'><BsCheckCircle /></ActionIcon>
                                                    <Text fz={12} c={'green'}>{hdata.course_status}</Text>
                                                </Flex>
                                            </div>
                                        </Flex>

                                    </Flex>
                                </Skeleton>
                            )
                        }

                        <Space h={15} />
                        <Divider />
                        <Space h={15} />
                    </>
                ) : (
                    <>
                        <Center>
                            <Card style={{ opacity: hdata.deactivation_days_left === 0 ? 0.4 : 1, pointerEvents: hdata.deactivation_days_left === 0 ? "none" : null }}
                                w={"90%"} onClick={() => navigate(`/courseplayer/${hdata.course_id}/${hdata.last_viewed_lesson_id}`)}
                                shadow='sm' p={0} withBorder radius={"md"}>
                                <Card.Section p={0} radius={0} >
                                    <Image style={{ position: "relative" }}
                                        src={hdata.thumbnail}

                                        height={200}

                                    />
                                </Card.Section >

                                {/* <Progress bg={"rgba(131, 94, 54, 1)"} h={4} color='yellow' radius={0}
                                    // @ts-ignore
                                    value={hdata.percentage_completed} /> */}
                                <Card radius={0} style={{ backgroundColor: "#ECECEC" }}>
                                    <Text pl={6} fs={"Open Sans"} fz={16} fw={500}>{hdata.
                                        // @ts-ignore
                                        course_name}</Text>


                                    <Flex align={"center"}  >
                                        <Flex align={"center"} gap={10}>
                                            <Flex align={"center"}>
                                                <ActionIcon color='green'><BsCheckCircle /></ActionIcon>

                                                <Text fz={12} c={'green'}>{hdata.course_status}</Text>
                                            </Flex>
                                            <ActionIcon size={18}><BsDot /></ActionIcon>
                                            {hdata.deactivation_days_left !== 0 && <Text fz={12} fw={600}>Deactivation:</Text>}
                                            {
                                                hdata.deactivation_days_left === 0 ?
                                                    (<Text fz={12} fw={400}>Course has been deactivated</Text>) : (
                                                        <>
                                                            <Text fz={12} fw={700} c={hdata.deactivation_days_left <= 5 ? "red" : "black"}>{hdata.deactivation_days_left} {hdata.deactivation_days_left < 2 ? "day" : "days"}</Text>
                                                            <Text fz={12} fw={400}>left</Text>
                                                        </>
                                                    )
                                            }
                                        </Flex>


                                    </Flex>
                                    {/* <Flex gap={"0.2rem"} align={"end"}> */}
                                    {/* {hdata.deactivation_days_left !== 0 && <Text fz={12} fw={600}>Deactivation:</Text>}
                                        {
                                            hdata.deactivation_days_left === 0 ?
                                                (<Text fz={12} fw={400}>Course has been deactivated</Text>) : (
                                                    <>
                                                        <Text fz={12} fw={700} c={hdata.deactivation_days_left <= 5 ? "red" : "black"}>{hdata.deactivation_days_left} {hdata.deactivation_days_left < 2 ? "day" : "days"}</Text>
                                                        <Text fz={12} fw={400}>left</Text>
                                                    </>
                                                )
                                        } */}

                                    {/* </Flex > */}

                                    {/* <Text fs={"Open Sans"} fz="sm" color="dimmed">
                        {card.
                            // @ts-ignore
                            minutes_left} mins left
                    </Text> */}

                                </Card>
                            </Card>

                        </Center>
                        <Space h={25} />
                    </>
                )
            }

        </div>
    )

}
const MyCoursesComp = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");


    const navigate = useNavigate();
    const [courseId, setCourseId] = useState(null)
    // console.log(courseId);

    const [inProgress, setInProgress] = useState([])
    const [history, setHistory] = useState([])
    // console.log(history)
    const [skeletonview, setSkeletonView] = useState(true);

    const [isLoading, setLoading] = useState(true);

    const [continueLearning, setContinueLearning] = useState([])
    useEffect(() => {
        client.get("mycourses/", {
            withCredentials: true
        })
            .then(resp => {
                setTimeout(() => {
                    setSkeletonView(resp.data ? false : true)
                    // console.log(skeletonview)

                }, 1000)                // console.log("Course Date-->", resp)
                const progress = resp.data.In_Progress
                setInProgress(progress)
                // console.log(JSON.stringify(progress))
                const history = resp.data.History
                history.sort((/** @type {{ deactivation_days_left: number; }} */ a, /** @type {{ deactivation_days_left: number; }} */ b) => {
                    if (a.deactivation_days_left > b.deactivation_days_left) {
                        return -1
                    }
                    else if (a.deactivation_days_left < b.deactivation_days_left) {
                        return 1
                    }
                    else {
                        return 0
                    }
                })

                setHistory(history)
                // const strD = (resp)
                // console.log("api resp " + strD)
                // setCourseDetail(strD);
                setLoading(false);
            })
    }, [])

    return (
        <>
            <Box>
                <Container size={"lg"} style={{ margin: "1em", marginLeft: mediumScreen ? "4rem" : "0rem", marginRight: mediumScreen ? "4rem" : "0rem" }}>
                    <Card>
                        <Title fw={500} size={24}>My Courses</Title>
                        {
                            mediumScreen ? (null) : (
                                <Space h={10} />
                            )
                        }
                    </Card>

                    <Tabs defaultValue="Inprogress">
                        <Tabs.List grow={mediumScreen ? true : false}>
                            <Group>
                                <Tabs.Tab className='mantine-1b9354u' value='Inprogress'>In Progress</Tabs.Tab>
                                <Tabs.Tab className='mantine-1b9354u' value='History'>History</Tabs.Tab>
                            </Group>
                        </Tabs.List>

                        <Tabs.Panel value='Inprogress'>

                            <Container size={"lg"} style={{ marginTop: "2rem" }}>
                                {/* <Skeleton visible={skeletonview}> */}
                                {inProgress.map((card) => (

                                    <ProgressCard key={card.course} data={card} skeleton={skeletonview} />)

                                )}
                                {/* </Skeleton> */}
                            </Container>


                        </Tabs.Panel>

                        <Tabs.Panel value='History'>
                            <Container p={mediumScreen ? "1rem" : 0} size={"lg"} style={{ marginTop: "2rem" }}>

                                {
                                    history.map((card) => (
                                        <HistoryCard key={card.course} hdata={card} skeleton={skeletonview} />
                                    ))
                                }

                            </Container>

                        </Tabs.Panel>


                    </Tabs>

                </Container>
            </Box>
        </>

    )

}

export default MyCoursesComp
