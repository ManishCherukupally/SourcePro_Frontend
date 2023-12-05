import React, { useEffect, useState } from 'react'
import { Box, Image, Card, CardSection, Container, Divider, Group, Tabs, Text, Title, Flex, Stack, Space, ActionIcon, Progress } from '@mantine/core';
import axios from 'axios';
import Head from '../dashboard Header/Head'; import { BsCheckCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { lessonidatom } from '../../Store/store';
/**
 * @param {{ thumbnail: string | null | undefined; course_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; deactivation_days_left: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; author: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; date_of_subscription: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }} data
 */

function ProgressCard({ data }) {
    const navigate = useNavigate();
    return (
        <>
            <Flex >

                <Card className='coursecard' onClick={() => { navigate(`/mycourses/${data.course_id}/${data.last_viewed_lesson_id}`) }}>
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

                        author} . {new Date(data.subscription_datetime).toLocaleDateString('en-US')} </Text>
                    <Space h={32} />
                    <Group>
                        <Progress w={150} color="yellow" radius={"xl"}

                            value={data.percentage_completed} />

                        <Text fz={12} fw={400}>{data.minutes_left}</Text>
                    </Group>
                </Flex>

            </Flex>

            <Space h={15} />
            <Divider />
            <Space h={15} />
        </>
    )
}
/**
 * @param {{ thumbnail: string | null | undefined; course_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; deactivation_days_left: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; author: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; subscription_datetime: string | number | Date; }} data
 */
// @ts-ignore
function HistoryCard({ hdata }) {

    const navigate = useNavigate();
    const isDisabled = hdata.deactivation_days_left === 0;

    return (
        <>
            {
                isDisabled ? (
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
                    </div>
                ) : (
                    <Flex >

                        <Card className='coursecard' onClick={() => { navigate(`/mycourses/${hdata.course_id}/${hdata.last_viewed_lesson_id}`) }}>
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
                )
            }

            <Space h={15} />
            <Divider />
            <Space h={15} />
        </>
    )

}
const Mycourses = () => {
    const [courseId, setCourseId] = useState(null)
    console.log(courseId);

    const [inProgress, setInProgress] = useState([])
    const [history, setHistory] = useState([])
    console.log(history)
    const [courseStatus, setStatus] = useState(0);

    const [isLoading, setLoading] = useState(true);

    const [continueLearning, setContinueLearning] = useState([])
    useEffect(() => {
        axios.get("http://192.168.29.220:8000/mycourses/")
            .then(resp => {
                console.log("Course Date-->", resp)
                const progress = resp.data.In_Progress
                setInProgress(progress)
                console.log(JSON.stringify(progress))
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
    useEffect(() => {
        axios.get("http://192.168.29.220:8000/home/")
            .then((resp) => {
                const continueapidata = resp.data["Continue_Learning"]
                setContinueLearning(continueapidata)
            })
    }, [])
    return (
        <>        <Head />
            <Box>
                <Container size={"lg"} style={{ margin: "1em", marginLeft: "4em" }}>
                    <Card>
                        <Title fw={500} size={24}>My Courses</Title>
                    </Card>

                    <Tabs defaultValue="Inprogress">
                        <Tabs.List>
                            <Group>
                                <Tabs.Tab className='mantine-1b9354u' value='Inprogress'>In Progress</Tabs.Tab>
                                <Tabs.Tab className='mantine-1b9354u' value='History'>History</Tabs.Tab>
                            </Group>
                        </Tabs.List>

                        <Tabs.Panel value='Inprogress'>

                            <Container size={"lg"} style={{ marginTop: "2rem" }}>
                                {inProgress.map((card) => (

                                    <ProgressCard key={card.course} data={card} />

                                )
                                )}

                            </Container>


                        </Tabs.Panel>

                        <Tabs.Panel value='History'>
                            <Container size={"lg"} style={{ marginTop: "2rem" }}>

                                {
                                    history.map((card) => (
                                        <HistoryCard key={card.course} hdata={card} />
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

export default Mycourses
