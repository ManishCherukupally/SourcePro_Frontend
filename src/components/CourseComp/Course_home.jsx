import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Accordion, ActionIcon, BackgroundImage, Box, Button, Card, Center, Container, CopyButton, Divider, Flex, Grid, Group, Overlay, Radio, Space, Spoiler, Tabs, Text, Tooltip, UnstyledButton } from '@mantine/core'

import Head from '../dashboard Header/Head'

import { BiRadioCircle, BiSolidLike } from 'react-icons/bi'
import { BsCheckCircle } from 'react-icons/bs';
import { AiFillLock, AiOutlineLock } from 'react-icons/ai'
import { MdDocumentScanner, MdDownload } from 'react-icons/md'
import { TbCopy } from 'react-icons/tb'
import { TiTick } from 'react-icons/ti'
import { courseidatom } from '../../Store/store'
import { Link, json, useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import client from '../../API/api';
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'

const Course_home = () => {
    const playerRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const [textContent, setTextContent] = useState('');
    const [clipboardContent, setClipboardContent] = useState("")
    console.log(clipboardContent)
    const [homeData, setHomeData] = useState({})

    const [fData, setFdata] = useState([])

    const [lessonData, setLessonData] = useState([])

    const [lessonName, setLessonName] = useState("")
    const [likes, setLikes] = useState({})
    console.log("likes" + likes)

    const [learners, setLearners] = useState(0)
    const course = useParams()
    const lessonId = useParams()
    // console.log(courseidatom)


    console.log("true :  " + iconColor)
    const [extractedTitle, setExtractedTitle] = useState('');


    const navigate = useNavigate()




    useEffect(() => {
        client.get("usr_course_page/", {
            withCredentials: true,
            params:
            {
                course_id: course.courseid,
                lesson_id: lessonId.lessonid
            }
        })
            .then((resp => {
                setHomeData(resp.data["course_data"])
                const data = resp.data.course_data.course_description

                axios.get(data).then((response) => {
                    // console.log(response.data)
                    setTextContent(response.data);
                });
                setLikesData(resp.data["course_data"].course_likes)
                setIconColor(resp.data["course_data"].like_status)

            }))

    }, [course.courseid, lessonId.lesson_id])

    const [getLikes, setLikesData] = useState(homeData.course_likes);


    const [iconColor, setIconColor] = useState(homeData.like_status);
    useEffect(() => {
        client.get("faq/",
            {
                withCredentials: true,
                params: {
                    course_id: course.courseid
                }
            }
        ).then((resp) => {
            const faqData = (resp.data["Course_FAQ"])
            // console.log(faqData)
            setFdata(faqData)
        })
    }, [course.courseid])

    useEffect(() => {
        client.get("learners_count/",
            {
                withCredentials: true,
                params: {
                    course_id: course.courseid
                }
            })
            .then((resp) => (
                setLearners(resp.data.Learners)
            ))
    }, [course.courseid])


    useEffect(() => {


        // if (lessonId.lessonid !== prevCrouselessonid || lessonId.lessonid === "") {
        client.get("usr_course_page_lesson/",
            {
                withCredentials: true,
                params: {
                    course_id: course.courseid,
                    lesson_id: lessonId.lessonid
                }
            })
            .then((resp) => {
                // console.log(JSON.stringify(resp.data["all_lessons"].materials))
                const data = (resp.data["all_lessons"])
                const clipData = resp.data.all_lessons.map(item => item.clipboards)
                let link;
                // console.log(clipData)
                clipData.map((item) => (
                    link = item
                    // console.log(item)
                ))

                axios.get(link)
                    .then((response) => {
                        setClipboardContent(response.data)

                    })
                data.sort((/** @type {{ lesson_id: number; }} */ a, /** @type {{ lesson_id: number; }} */ b) => {
                    if (a.lesson_id < b.lesson_id) {
                        return -1
                    }
                    else if (a.lesson_id > b.lesson_id) {
                        return 1
                    }
                    else {
                        return 0
                    }
                })
                // //@ts-ignore    
                // const [hours, minutes, seconds] = resp.data.minutes_completed.split(':').map(Number);
                // const totalSeconds = hours * 3600 + minutes * 60 + seconds;
                // setTimeToStart(10)
                setLessonData(data)
                setLessonName(resp.data["all_lessons"].lesson_name)
                // const clipData = resp.data["all_lessons"].map((item) => {
                //     // if (item.length > 6) {
                //     //     item.find(item => {
                //     //         console.log("clips" + item.clipboards)
                //     //     })
                //     // }
                //     console.log(Object.entries(item.clipboards))
                // })
                // console.log("clipdata" + JSON.stringify(clipData))

            })
        // }

    }, [course.courseid, lessonId.lessonid])
    // const clr = useMemo(homeData.like_status)
    // console.log("clr" + iconColor)
    console.log("upgradedLikes" + getLikes)

    const handleIconClick = () => {
        console.log("icon Clicked")
        try {
            client.put("likes_count/")
                .then((resp) => {
                    // setLdata(resp.data)
                    setIconColor(resp.data.status)

                    setLikes(resp.data.Likes)

                    client.get("usr_course_page/", {

                        params:
                        {
                            course_id: course.courseid,
                            lesson_id: lessonId.lessonid
                        },
                        withCredentials: true
                    })
                        .then((resp) => {
                            setLikesData(resp.data.course_data.course_likes)
                        })
                })

        }
        catch (error) {

            console.error('Error while updating likes:', error);
        }
    };




    const openNewTab = (documentUrl) => {
        window.open(documentUrl, '_blank');
    };

    const copyTextToClipboard = document.getElementById("txt")
    const [showOverlay, setShowOverlay] = useState(false);
    const [fill, setFill] = useState("")

    const [isPlaying, setIsPlaying] = React.useState(true);

    const [shouldRerender, setShouldRerender] = useState(false);

    useEffect(() => {
        // Set the initial state of the component
        setShouldRerender(true);
    }, [course.courseid, lessonId.lessonid]);


    // useEffect(() => {
    //     const handleWindowClose = (/** @type {any} */ event) => {
    //         // Perform actions when window is about to close
    //         // For instance, stop the reactplayer or execute your desired function
    //         // Example: stopReactPlayer();
    //         // Or: executeFunctionBeforeClose();

    //         // For demonstration purposes, you can log a message
    //         console.log('Window is closing or refreshing!');

    //         // You might want to add a confirmation message
    //         // event.returnValue = ''; // Uncomment this line to prompt a confirmation message
    //     };

    //     window.addEventListener('beforeunload', handleWindowClose);

    //     return () => {
    //         // Clean up the event listener when the component unmounts
    //         window.removeEventListener('beforeunload', handleWindowClose);
    //     };
    // }, []);


    const [play, setPlay] = useState(0);
    console.log(play)
    var date = new Date(play * 1000);
    console.log(date)
    // Multiply by 1000 to convert seconds to milliseconds
    var time = date.toISOString().slice(11, 19)

    console.log(time)
    // const [last_lesson,setLast_Lesson] = useState(lessonId.lessonid)

    const handlePause = async () => {
        try {
            await client.put("usr_course_page_lesson/", {

                minutes_completed: (time),
                course_id: course.courseid,
                lesson_id: lessonId.lessonid,

            })
        }
        catch (err) {
            console.error(err)
        }

    }
    const handleButtonClick = () => {
        // Trigger a re-render by setting the state to false and then back to true
        console.log("button Clicked")
        setShouldRerender(false);
        setTimeout(() => {
            setShouldRerender(true);
        }, 1000)
        setIsPlaying(true)
        setShowOverlay(false)
        setFill("blur(0px)")
    };
    const seekToTime = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(10, 'seconds');
        }
    };

    return (
        <>
            <Box>
                <Head />
                <Box>
                    <Grid>
                        <Grid.Col span={8}>
                            <Container p={0} fluid >
                                {
                                    showOverlay && (
                                        <Center>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                marginTop: "550px",
                                                position: 'absolute',
                                                zIndex: 10,
                                            }}>

                                                <Text fw={600} c={"white"} fz={22} >You have completed a lesson</Text>
                                                <Space h={15} />
                                                <Group>

                                                    <Link to={`/quiz/${course.courseid}/${lessonId.lessonid}`} >
                                                        <Button style={{ backgroundColor: "rgba(240, 154, 62, 1)", }} >
                                                            TAKE QUIZ
                                                        </Button>
                                                    </Link>

                                                    <Button variant='outline' style={{ color: "rgba(255, 255, 255, 1)", borderColor: "rgba(255, 255, 255, 1)" }}
                                                        onClick={handleButtonClick}>WATCH AGAIN</Button>

                                                </Group>

                                            </div>
                                        </Center>
                                    )
                                }

                                {shouldRerender &&
                                    lessonData.map((item) => (
                                        <ReactPlayer ref={playerRef} key={item.lesson_id} height={"100%"} width={"100%"}
                                            controls
                                            playing={isPlaying}
                                            onStart={seekToTime}

                                            onPause={handlePause}

                                            onProgress={(progress) => {
                                                const integerValue = Math.floor(progress.playedSeconds);
                                                setPlay(integerValue);
                                            }}

                                            // seekTo={seekToTime}

                                            url={item.lesson_url}
                                            muted
                                            onEnded={() => {
                                                setShowOverlay(true)
                                                setFill("blur(1px)")
                                                setIsPlaying(!isPlaying)
                                            }}

                                            config={{

                                                file: {
                                                    attributes: {
                                                        controlsList: 'nodownload',
                                                        onContextMenu: (/** @type {{ preventDefault: () => any; }} */ e) => e.preventDefault(),

                                                    }
                                                    // tracks: [
                                                    //     {
                                                    //         label: "",
                                                    //         kind: "subtitles",
                                                    //        
                                                    //         src: "media/Back_to_Basics.mp4.en.vtt/",
                                                    //         srcLang: "en",
                                                    //         default: true,
                                                    //     }
                                                    // ]

                                                }
                                            }}
                                            style={{ filter: fill }}
                                        />
                                    ))
                                }
                            </Container>
                            <Space h={7} />
                            <Box >
                                <Tabs defaultValue={"overview"}>
                                    <Tabs.List>
                                        <Flex align={"center"} style={{ paddingLeft: "1rem", gap: "35rem" }} >
                                            <Group style={{ paddingLeft: 20 }}>
                                                <Tabs.Tab value='overview'>Overview</Tabs.Tab>
                                                <Tabs.Tab value='faq'>FAQ</Tabs.Tab>
                                            </Group>
                                            <Group spacing={20}>
                                                <Group spacing={5}>
                                                    <ActionIcon onClick={handleIconClick}><BiSolidLike size={22} color={iconColor === true ? "rgba(240, 154, 62, 1)" : "rgba(58, 58, 58, 1)"} /></ActionIcon>
                                                    <Text fw={"600"} fz={14}>{getLikes} </Text>
                                                </Group>
                                                <Group style={{ display: "flex", alignItems: "center" }} >
                                                    <Text fz={18}> . </Text>
                                                    <Text fw={"600"} fz={14}>{learners}</Text>
                                                    <Text color='#626262' fz={14} fw={500}>learners</Text>
                                                </Group>
                                            </Group>
                                        </Flex>
                                    </Tabs.List>
                                    <Tabs.Panel value='overview'>
                                        <Card style={{ paddingLeft: "1rem" }}>
                                            <Group>
                                                <Text fz={18} color="#3A3A3A" fw={"600"} >{homeData.

                                                    course_name}</Text>
                                                {/* <Text fz={18}> . </Text> */}
                                                <Text fz={14} color="#3A3A3A" fw={"600"} >{lessonData.

                                                    lesson_name}</Text>
                                            </Group>
                                            <Space h={5} />

                                            <Group style={{ display: "flex", alignItems: "center" }} >

                                                <Text color='#626262' fz={14}>Released: {new Date(homeData.

                                                    creation_date).toLocaleString("en-UK")}</Text>
                                                <Text fz={18}> . </Text>
                                                <Text color='#626262' fz={14} >Tutor :{" " + homeData.

                                                    author}</Text>
                                            </Group>
                                            <Space h={15} />

                                            <Text fz={15} color="#3A3A3A" fw={"600"} mt={4}>Course description</Text>
                                            <Space h={10} />
                                            <Spoiler maxHeight={20} showLabel="Show more" hideLabel="Hide" fz={14}>
                                                {textContent}
                                            </Spoiler>
                                        </Card>
                                    </Tabs.Panel>
                                    <Tabs.Panel value='faq'>


                                        <Accordion >
                                            {fData.length > 0 ? (fData.map((item) => (
                                                <Accordion.Item key={item.

                                                    question}
                                                    value={item.


                                                        answer}>
                                                    <Accordion.Control>{item.


                                                        question}</Accordion.Control>
                                                    <Accordion.Panel>
                                                        {item.


                                                            answer}
                                                    </Accordion.Panel>
                                                </Accordion.Item>
                                            ))) : (
                                                <Card>
                                                    <Text>No FAQs for this course</Text>
                                                </Card>
                                            )
                                            }

                                        </Accordion>

                                    </Tabs.Panel>
                                </Tabs>
                            </Box>
                        </Grid.Col>

                        <Grid.Col span={4}>
                            <Container fluid style={{ backgroundColor: "#3A3A3A" }}>
                                <Text color="#FFFFFF" pb={10} p={20} fw={400} fz={22}>Contents</Text>
                                <Divider className='divider' />
                                <Accordion defaultValue={"clipboard"} chevronSize={0}>
                                    <Accordion.Item value='material'>
                                        <Accordion.Control className='accbtn' ><Text color='#FFFFFF'>Materials</Text></Accordion.Control>
                                        <Accordion.Panel  >
                                            <Group className='matgrp'>
                                                <div>
                                                    {

                                                        lessonData.map((lesson, index) => {
                                                            let extracted;

                                                            if (lesson.materials) {
                                                                const materialUrl = lesson.materials[0];
                                                                extracted = materialUrl.split('/').slice(-2, -1)[0].replace(/_/g, ' ').replace(/\.[^/.]+$/, '');
                                                                console.log(`Lesson ID ${lesson.lesson_id}: ${extracted}`);
                                                            }

                                                            return <Text color='#FFFFFF' key={lesson.lesson_id}>{extracted}</Text>;
                                                        })
                                                    }

                                                </div>

                                                <div>
                                                    {
                                                        lessonData.map((lesson) => {

                                                            const materialUrl = (lesson.materials && lesson.materials[0]);
                                                            if (materialUrl)
                                                                return (
                                                                    <Tooltip label="View Document">
                                                                        <ActionIcon variant='transparent' onClick={() => openNewTab(materialUrl)}>
                                                                            <MdDocumentScanner color='grey' />
                                                                        </ActionIcon>
                                                                    </Tooltip>
                                                                )

                                                        }
                                                        )
                                                    }
                                                </div>

                                            </Group>
                                        </Accordion.Panel>
                                    </Accordion.Item>

                                    <Accordion.Item value='clipboard'>
                                        <Accordion.Control className='accbtn' ><Text color='#FFFFFF'>Clipboard</Text></Accordion.Control>
                                        <Accordion.Panel  >
                                            <Group className='clipgrp' >
                                                <div>
                                                    {
                                                        lessonData.map((lesson) => {
                                                            let extracted;
                                                            if (lesson.clipboards) {

                                                                const materialUrl = lesson.materials[0];
                                                                extracted = materialUrl.split('/').slice(-2, -1)[0].replace(/_/g, ' ').replace(/\.[^/.]+$/, '');
                                                                return <Text id='txt' color='#FFFFFF' key={lesson.lesson_id}>{extracted}</Text>;

                                                            }

                                                        })
                                                    }
                                                </div>
                                                <CopyButton

                                                    value={clipboardContent}
                                                    timeout={2000}>
                                                    {({ copied, copy }) => (
                                                        <Tooltip label={copied ? 'Copied' : 'Copy to Clipboard'} withArrow>
                                                            <ActionIcon variant="transperant" onClick={copy}>
                                                                {copied ? (
                                                                    <TiTick style={{ width: 16 }} color={copied ? 'teal' : 'gray'} />
                                                                ) : (
                                                                    <TbCopy style={{ width: 16 }} color={copied ? 'teal' : 'gray'} />
                                                                )}
                                                            </ActionIcon>
                                                        </Tooltip>
                                                    )}
                                                </CopyButton>

                                            </Group>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                </Accordion>

                                <Container fluid >
                                    {
                                        lessonData.map((item, index) => (
                                            <div key={item.

                                                lesson_id}>
                                                <Flex direction={"column"}>
                                                    <Container pl={0} pr={0} w={"100%"} fluid  >

                                                        {

                                                            item.lesson_status === "locked" ?
                                                                (<div style={{ pointerEvents: 'none' }}>
                                                                    <Flex p={"1rem"} align={"center"} gap={15}>
                                                                        <ActionIcon variant='transperant' ><AiFillLock color='#5F5F5F' size={20} /></ActionIcon>
                                                                        <Flex direction={"column"}>
                                                                            <Text color='#FFFFFF' >{index + 1}. {item.

                                                                                lesson_name}</Text>

                                                                        </Flex>
                                                                    </Flex>
                                                                </div>) :
                                                                (
                                                                    <div onClick={handleButtonClick}>

                                                                        <Link to={`/home/${course.courseid}/${item.lesson_id}`}
                                                                            style={{ textDecoration: "none" }} key={item.

                                                                                lesson_id}>

                                                                            <Flex p={"1rem"} align={"center"} gap={15} >
                                                                                {

                                                                                    item.lesson_status === "completed" ?
                                                                                        (<ActionIcon variant='tranperant' ><BsCheckCircle color='green' size={20} /></ActionIcon>) :
                                                                                        (<ActionIcon variant='tranperant' ><BiRadioCircle color='#5F5F5F' size={20} /></ActionIcon>)
                                                                                }

                                                                                <Flex direction={"column"}>
                                                                                    <Text color='#FFFFFF' >{index + 1}. {item.

                                                                                        lesson_name}</Text>
                                                                                    <Space h={8} />
                                                                                    <Flex gap={10} >

                                                                                        <Text color='#FFFFFF' fz={"xs"}>{item.

                                                                                            lesson_duration}m </Text>
                                                                                        {

                                                                                            item.quiz_attempt_status === true ?

                                                                                                (<Flex gap={"9rem"}>
                                                                                                    <Flex gap={5}>
                                                                                                        <Text fz={"xs"} c={"white"}>Score :</Text>
                                                                                                        <Text fz={"xs"} c={"rgba(0, 156, 23, 1)"}>{item.

                                                                                                            quiz_score}%</Text>
                                                                                                    </Flex>
                                                                                                    <Link to={`/quiz/${course.courseid}/${item.lesson_id}`} style={{ textDecoration: "none", color: "rgba(0, 117, 225, 1)", fontSize: 12 }}>
                                                                                                        RE-TAKE QUIZ
                                                                                                    </Link>
                                                                                                </Flex>) : (null)


                                                                                        }


                                                                                    </Flex>
                                                                                </Flex>
                                                                            </Flex>
                                                                        </Link>
                                                                    </div>
                                                                )


                                                        }


                                                    </Container>


                                                </Flex>
                                                <Divider className='divider' />
                                            </div>
                                        ))
                                    }
                                </Container>
                            </Container>
                        </Grid.Col>
                    </Grid>
                </Box>
            </Box >
        </>

    )
}

export default Course_home
