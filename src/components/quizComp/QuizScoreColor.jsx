import { ActionIcon, Button, Card, Flex, Group, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Quiz_test from './Quiz_test'
import { scoreatom } from '../../Store/store'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'



export function QuizScoreGreen() {
    const navigate = useNavigate()
    const course = useParams()
    const lessonId = useParams()
    const [nextLessonData, setNextLessonData] = useState({})
    const [lessonData, setLessonData] = useState({})
    // console.log("LData" + lessonData)
    useEffect(() => {
        axios.get("http://192.168.29.220:8000/next_lesson/", {
            withCredentials: true,
            params: {
                course_id: course.courseid,
                lesson_id: lessonId.lessonid
            }
        })
            .then((resp) => {
                setNextLessonData(resp.data)
            })

    }, [])

    useEffect(() => {
        axios.get("http://192.168.29.220:8000/usr_course_page_lesson/",
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

    const [shouldRerender, setShouldRerender] = useState(false);

    useEffect(() => {
        // Set the initial state of the component
        setShouldRerender(true);
    }, [course.courseid, lessonId.lessonid]);

    const handleButtonClick = () => {
        // Trigger a re-render by setting the state to false and then back to true

    };


    return (<>

        <div>
            <Card pl={"2rem"} radius={0} h={"4rem"} style={{ backgroundColor: "#262626" }}>
                <Flex justify={"space-between"} align={"center"} gap={"1rem"}>
                    <Group>
                        <ActionIcon variant='transparent'><BiArrowBack color='#FFFFFF' size={25} /></ActionIcon>

                        <Text c={"#FFFFFF"} fw={600} key={lessonData.lesson_id} >Quiz 1.{lessonData.lesson_name}</Text>

                    </Group>
                    <Flex>
                        {/* <Link to={`/quiz/${course.courseid}/${lessonId.lessonid}`}> */}
                        <Button mr={"3.5rem"} variant='outline'
                            onClick={() => {
                                console.log("button Clicked")
                                setShouldRerender(false);
                                setTimeout(() => {
                                    setShouldRerender(true);
                                }, 1000)

                                shouldRerender &&
                                    navigate(`/quiz/${course.courseid}/${lessonId.lessonid}`)
                            }}
                            style={{ color: "rgba(255, 255, 255, 1)", borderColor: "rgba(255, 255, 255, 1)" }}
                        > RE-TAKE QUIZ</Button>
                        {/* </Link> */}
                        <Link to={`/home/${
                            // @ts-ignore
                            course.courseid}/${nextLessonData.
                                // @ts-ignore
                                next_lesson_id}`}>
                            <Button mr={"3.5rem"} variant='filled' style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "rgba(240, 154, 62, 1)" }}
                            >NEXT LESSON</Button>
                        </Link>
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
        axios.get("http://192.168.29.220:8000/usr_course_page_lesson/", {
            params: {
                course_id: course.courseid,
                lesson_id: lessonId.lessonid
            }
        })
            .then((resp) => {
                setLessonData(resp.data)
            })

    })
    const handleRetakeQuiz = () => {
        setShowQuiz(true);

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
                            <Button mr={"3.5rem"} variant='outline' style={{ color: "rgba(255, 255, 255, 1)", borderColor: "rgba(255, 255, 255, 1)" }}
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


