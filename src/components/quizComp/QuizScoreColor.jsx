import { ActionIcon, Button, Card, Flex, Group, Modal, Space, Text } from '@mantine/core'
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
                const data = resp.data["all_lessons"]
                console.log(data)
                const result = data.find(({ lesson_id }) => lesson_id === lessonId.lessonid)
                console.log(result)

            })


    }, [course.courseid, lessonId.lessonid])


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
                    navigate(`/home/${nextLessonData.course_id}/${nextLessonData.next_lesson_id}`)

                }
                else {
                    navigate(`/home/${course.courseid}/${lessonId.lessonid}`)
                }
            })

    }


    return (<>

        <Modal opened={opened} onClose={close} title="Are you sure?!">
            <Text>Do you really want to exit the quiz?</Text>
            <Space h={15} />
            <Flex justify={"end"}>
                <Button variant='filled' onClick={() => navigate(`/home/${course.courseid}/${lessonId.lessonid}`)}>Yes</Button>
                <Button variant='outline' onClick={close}>No</Button>
            </Flex>
        </Modal>

        <div>
            <Card pl={"2rem"} radius={0} h={"4rem"} style={{ backgroundColor: "#262626" }}>
                <Flex justify={"space-between"} align={"center"} gap={"1rem"}>
                    <Group>
                        <ActionIcon onClick={open}
                            variant='transparent'><BiArrowBack color='#FFFFFF' size={25} /></ActionIcon>

                        <Text c={"#FFFFFF"} fw={600} key={lessonData.lesson_id} >Quiz 1.{lessonData.lesson_name}</Text>

                    </Group>
                    <Flex>
                        {/* <Link to={`/quiz/${course.courseid}/${lessonId.lessonid}`}> */}
                        <Button mr={"3.5rem"} variant='outline'
                            onClick={() => window.location.reload()}

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
    const course = useParams()
    const lessonId = useParams()
    const [showQuiz, setShowQuiz] = useState(false); // Use local state to manage quiz visibility
    const [lessonData, setLessonData] = useState([])

    useEffect(() => {
        client.get("usr_course_page_lesson/", {
            params: {
                course_id: course.courseid,
                lesson_id: lessonId.lessonid
            }
        })
            .then((resp) => {
                setLessonData(resp.data)
            })

    })
    const handleButtonClick = () => {
        // Trigger a re-render by setting the state to false and then back to true
        console.log("button Clicked")
        window.location.href(`/quiz/${course.courseid}/${lessonId.lessonid}`)
    };
    return (
        <>

            <div>
                <Card pl={"2rem"} radius={0} h={"4rem"} style={{ backgroundColor: "#262626" }}>
                    <Flex justify={"space-between"} align={"center"} gap={"1rem"}>
                        <Group>
                            <ActionIcon variant='transparent'><BiArrowBack color='#FFFFFF' size={25} /></ActionIcon>

                            <Text c={"#FFFFFF"} fw={600} key={lessonId.lessonid}>Quiz 1.{lessonData.lesson_name}</Text>

                        </Group>
                        <Flex>
                            <Button onClick={handleButtonClick} mr={"3.5rem"} variant='outline' style={{ color: "rgba(255, 255, 255, 1)", borderColor: "rgba(255, 255, 255, 1)" }}
                            >RE-TAKE QUIZ</Button>
                            <Link to={`/home/${course.courseid}/${lessonId.lessonid}`}>
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


