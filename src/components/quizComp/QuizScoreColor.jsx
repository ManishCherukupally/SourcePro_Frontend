import { ActionIcon, Button, Card, Center, Container, Dialog, Drawer, Flex, Group, Modal, Space, Text } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Quiz_test from './Quiz_test'
import { scoreatom } from '../../Store/store'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'
import client from '../../API/api'
import { useDisclosure } from '@mantine/hooks'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'



export function QuizScoreGreen() {
    const navigate = useNavigate()
    const course = useParams()
    const lessonId = useParams()
    const [nextLessonData, setNextLessonData] = useState({})
    const [lessonData, setLessonData] = useState({})
    // const [modal, setModal] = useState(false)
    const [opened, { open, close }] = useDisclosure(false);
    // console.log("LData" + lessonData)
    const [lessonName, setLessonName] = useState("");
    const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);

    var lesson;
    useEffect(() => {
        client.get("usr_course_page_lesson/",
            {
                withCredentials: true,
                params: {
                    course_id: course.courseid,
                    lesson_id: lessonId.lessonid
                }
            })
            .then((resp) => {

                lesson = resp.data["all_lessons"].map(item => item.lesson_name)
                setLessonName(lesson.toString())
            })


    }, [])

    console.log(lessonName)
    // const { pathname } = useLocation();
    // // const currentref = useRef(null)
    // const handleButtonClick = () => {
    //     // Trigger a re-render by setting the state to false and then back to true
    //     console.log("button Clicked")
    //     // window.location.href(`/quiz/${course.courseid}/${lessonId.lessonid}`)

    //     const targetPath = `/quiz/${course.courseid}/${lessonId.lessonid}`;

    //     if (pathname === targetPath) {
    //         // Manually trigger re-render
    //         this.forceUpdate(); // Assuming you have a forceUpdate method
    //     } else {
    //         navigate(targetPath);
    //     }
    // };

    const handleNextLesson = () => {
        client.get("next_lesson/", {
            withCredentials: true,
            params: {
                course_id: course.courseid,
                lesson_id: lessonId.lessonid
            }
        })
            .then((resp) => {
                setLessonData(resp.data)
                if (resp.data.course_id && resp.data.next_lesson_id) {
                    navigate(`/courseplayer/${nextLessonData.course_id}/${nextLessonData.next_lesson_id}`)

                }
                else {
                    navigate(`/courseplayer/${course.courseid}/${lessonId.lessonid}`)
                }
            })

    }


    return (<>
        <Center>
            <Modal centered opened={slowTransitionOpened}
                onClose={() => setSlowTransitionOpened(false)} title="Are you sure?!">
                <Text>Do you really want to RE-TAKE the quiz?</Text>
                <Space h={15} />
                <Flex justify={"end"} gap={"2%"}>
                    <Button variant='filled'
                        style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "rgba(240, 154, 62, 1)" }} onClick={() => window.location.reload()}>Yes</Button>
                    <Button variant='outline' color='dark' onClick={() => setSlowTransitionOpened(false)}>No</Button>
                </Flex>
            </Modal>
        </Center>

        <Center>
            <Modal centered opened={opened} onClose={close} title="Are you sure?!">
                <Text>Do you really want to exit the quiz?</Text>
                <Space h={15} />
                <Flex justify={"end"} gap={"2%"}>
                    <Button style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "rgba(240, 154, 62, 1)" }}
                        variant='filled' onClick={() => navigate(`/courseplayer/${course.courseid}/${lessonId.lessonid}`)}>Yes</Button>
                    <Button variant='outline' color='dark' onClick={close}>No</Button>
                </Flex>
            </Modal>
        </Center>
        <div>
            <Card pl={"2rem"} radius={0} h={"4rem"} style={{ backgroundColor: "#262626" }}>
                <Flex justify={"space-between"} align={"center"} gap={"1rem"}>
                    <Group>
                        <ActionIcon onClick={open}
                            variant='transparent'><BiArrowBack color='#FFFFFF' size={25} /></ActionIcon>

                        <Text c={"#FFFFFF"} fw={600} key={lessonData.lesson_id} >Quiz 1. {lessonName}</Text>

                    </Group>
                    <Flex>
                        {/* <Link to={`/quiz/${course.courseid}/${lessonId.lessonid}`}> */}
                        <Button mr={"3.5rem"} variant='outline'
                            onClick={() => setSlowTransitionOpened(true)}

                            style={{ color: "rgba(255, 255, 255, 1)", borderColor: "rgba(255, 255, 255, 1)" }}
                        > RE-TAKE QUIZ</Button>
                        {/* </Link> */}

                        <Button onClick={handleNextLesson} mr={"3.5rem"} variant='filled' style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "rgba(240, 154, 62, 1)" }}
                        >NEXT LESSON</Button>

                    </Flex>
                </Flex>
            </Card>
            <Card pl={"2.2rem"} radius={0} style={{ backgroundColor: "rgba(0, 156, 23, 1)" }}>
                <Flex align={"center"}>
                    <Text c={"#FFFFFF"}>Yayy! You've Passed!</Text>
                </Flex>
            </Card>

        </div>

    </>
    )
}

export function QuizScoreRed() {
    const navigate = useNavigate()
    const course = useParams()
    const lessonId = useParams()
    // const [showQuiz, setShowQuiz] = useState(false); // Use local state to manage quiz visibility
    const [opened, { open, close }] = useDisclosure(false);
    const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);

    const [lessonName, setLessonName] = useState("");
    var lesson;
    useEffect(() => {
        client.get("usr_course_page_lesson/",
            {
                withCredentials: true,
                params: {
                    course_id: course.courseid,
                    lesson_id: lessonId.lessonid
                }
            })
            .then((resp) => {

                lesson = resp.data["all_lessons"].map(item => item.lesson_name)
                setLessonName(lesson.toString())
            })


    }, [])

    return (
        <>
            <Center>
                <Modal centered opened={slowTransitionOpened}
                    onClose={() => setSlowTransitionOpened(false)} title="Are you sure?!">
                    <Text>Do you really want to RE-TAKE the quiz?</Text>
                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "rgba(240, 154, 62, 1)" }}
                            variant='filled' onClick={() => window.location.reload()}>Yes</Button>
                        <Button variant='outline' color='dark' onClick={() => setSlowTransitionOpened(false)}>No</Button>
                    </Flex>
                </Modal>
            </Center>
            <Center>
                <Modal centered opened={opened} onClose={close} title="Are you sure?!">
                    <Text>Do you really want to exit the quiz?</Text>
                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button variant='filled'
                            style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "rgba(240, 154, 62, 1)" }}
                            onClick={() => navigate(`/courseplayer/${course.courseid}/${lessonId.lessonid}`)}>Yes</Button>
                        <Button variant='outline' color='dark' onClick={close}>No</Button>
                    </Flex>
                </Modal>
            </Center>

            <div>
                <Card pl={"2rem"} radius={0} h={"4rem"} style={{ backgroundColor: "#262626" }}>
                    <Flex justify={"space-between"} align={"center"} gap={"1rem"}>
                        <Group>
                            <ActionIcon onClick={open} variant='transparent'><BiArrowBack color='#FFFFFF' size={25} /></ActionIcon>

                            <Text c={"#FFFFFF"} fw={600} key={lessonId.lessonid}>Quiz 1.{lessonName}</Text>

                        </Group>
                        <Flex>
                            <Button onClick={() => {

                                setSlowTransitionOpened(true)
                            }} mr={"3.5rem"} variant='outline' style={{ color: "rgba(255, 255, 255, 1)", borderColor: "rgba(255, 255, 255, 1)" }}
                            >RE-TAKE QUIZ</Button>
                            <Link to={`/courseplayer/${course.courseid}/${lessonId.lessonid}`}>
                                <Button mr={"3.5rem"} variant='filled' style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "rgba(240, 154, 62, 1)" }} >WATCH LESSON AGAIN</Button>
                            </Link>
                        </Flex>
                    </Flex>
                </Card>
                <Card pl={"2rem"} radius={0} style={{ backgroundColor: "rgba(227, 64, 64, 1)" }}>
                    <Flex align={"center"}>
                        <Text c={"#FFFFFF"}>Oops! You need to score more than 70%</Text>
                    </Flex>
                </Card>


            </div>

        </>

    )
}


