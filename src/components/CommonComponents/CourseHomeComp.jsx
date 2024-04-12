import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Accordion, ActionIcon, BackgroundImage, Box, Button, Card, Center, Container, CopyButton, Divider, Flex, Grid, Group, Image, Modal, Overlay, Radio, Space, Spoiler, Tabs, Text, Tooltip, UnstyledButton } from '@mantine/core'


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
import { useClipboard, useMediaQuery } from '@mantine/hooks';
import certificate from '../../assets/certificate.png'
import {
    exportComponentAsJPEG,
    exportComponentAsPDF,
    exportComponentAsPNG
} from "react-component-export-image";
import generatePDF, { Resolution } from 'react-to-pdf';
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'


const CourseHomeComp = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");


    const [copied, setCopied] = useState(false)
    const playerRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const [textContent, setTextContent] = useState('');
    const [clipboardContent, setClipboardContent] = useState("")
    console.log(clipboardContent)
    const [clipboards, setClipboards] = useState([])
    const [homeData, setHomeData] = useState({})

    const [fData, setFdata] = useState([])

    const [lessonData, setLessonData] = useState([])

    const [lessonName, setLessonName] = useState("")
    // var lessonName
    const [learners, setLearners] = useState(0)
    const course = useParams()
    const lessonId = useParams()
    // console.log(courseidatom)

    const [like, setLike] = useState(false)
    const [likescount, setLikesCount] = useState(0)
    const [extractedTitle, setExtractedTitle] = useState('');
    const [certificateModal, setCertificateModal] = useState(false)
    const [certificateName, setCertifcatename] = useState("")
    const [certificateStatus, setCertificateStatus] = useState(false)
    const [totalMinutesCalculated, settotalMinutesCalculated] = useState()
    // const [PlaySeconds, setPlaySeconds] = useState(0)


    const navigate = useNavigate()

    const targetRef = useRef()
    // const { toPDF, tragetRef } = usePDF({ filename: "Certificate.pdf" });
    // const [showCertificate, setShowCertificate] = useState(false);



    const options = {

        // default is 'A4'
        method: 'save',
        resolution: Resolution.NORMAL,
        page: {

            orientation: 'landscape',
        },
        overrides: {
            // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
            word: {
                compress: true
            }
        }
    }


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
                setLikesCount(resp.data["course_data"].course_likes)
                setLike(resp.data["course_data"].like_status)
                setLearners(resp.data["course_data"].course_views)
                if (resp.data["course_data"].course_status === "Completed") {
                    setCertificateStatus(true)
                }
                // axios.get(data).then((response) => {
                //     // console.log(response.data)
                //     setTextContent(response.data);
                // })
                //     .catch((error) => console.log(error));



            }))
            .catch((error) => console.log(error))

    }, [course.courseid, lessonId.lesson_id, like])


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
            .catch((error) => console.log(error))
    }, [course.courseid])

    // useEffect(() => {
    //     client.get("learners_count/",
    //         {
    //             withCredentials: true,
    //             params: {
    //                 course_id: course.courseid
    //             }
    //         })
    //         .then((resp) => (
    //             setLearners(resp.data.Learners)
    //         ))
    //         .catch((error) => console.log(error))
    // }, [course.courseid])


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
                // console.log(data)
                setLessonData(data)

                // var time = resp.data.all_lessons.map((item) => item.lesson_duration)

                // data.map(item => console.log(item.lesson_duration))
                // console.log(time)
                // const [hours, minutes, seconds] = time.toString().split(":");
                // var minutestime = Number(hours) * 60 + Number(minutes) + Number(seconds) / 60
                // Calculate total minutes
                // settotalMinutesCalculated(minutestime)

                // const playTime = resp.data.all_lessons.map((item) => item.minutes_completed)
                data.filter(item => { if (Object.entries(item).length > 6) window.localStorage.setItem('playseconds', (handlePLayseconds(item.minutes_completed))) })
                // console.log(playTime)



                // setLessonName(resp.data["all_lessons"].lesson_name)
                // console.log(typeof (lessonId.lessonid))
                // setTimeout(() => {
                //     lessonData.filter(item => { if (item.lesson_id === parseInt(lessonId.lessonid)) return console.log(item.lesson_name) })

                // }, 1000)

                data.filter(item => { if (Object.entries(item).length > 6) return setLessonName(item.lesson_name) })
                // setClipboardContent(resp.data.all_lessons.clipboards)
                const clipData = resp.data.all_lessons.map(item => item.clipboards)
                // console.log(clipData)
                var url
                url = clipData.filter((item) => { if (item !== undefined || null) return (item) })
                // const url = clipData.toString()
                console.log(url)

                axios.get(url)
                    .then((resp) => {
                        const dataArray = resp.data.split("\n")
                        console.log(dataArray)
                        setClipboards(dataArray)

                    })
                    .catch(error => console.log(error))

                // let link;

                // setClipboardContent(clipData)
                // console.log(clipboardContent)

                // clipData.map((item) => (
                //     // link = item
                //     console.log("pp : " + item)
                // ))

                // axios.get(link)
                //     .then((response) => {
                //         setClipboardContent(response.data)

                //     })
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
            .catch((error) => console.log(error))
        // }

    }, [course.courseid, lessonId.lessonid])

    const handlePLayseconds = (value) => {
        // console.log(value)
        const timeArray = value.split(':').map(Number);
        // console.log(timeArray)
        const playseconds = timeArray[0] * 3600 + timeArray[1] * 60 + timeArray[2];
        console.log(playseconds)
        return playseconds

    }
    // useEffect(() => {
    //     const handleClipBoard = () => {
    //         axios.get(clipboardContent)
    //             .then((resp) => {
    //                 console.log(resp.data)
    //             })
    //             .catch(error => console.log(error))
    //     }
    //     handleClipBoard()
    // }, [course.courseid])

    // const clr = useMemo(homeData.like_status)
    // console.log("clr" + iconColor)

    const handleIconClick = () => {
        console.log("icon Clicked")
        try {
            client.put("likes_count/", {
                course_id: course.courseid
            })
                .then((resp) => {
                    if (resp.data.status === true) {
                        setLike(true)

                    }
                    if (resp.data.status === false) {
                        setLike(false)

                    }
                })

                .then(client.get("usr_course_page/", {
                    params: {
                        course_id: course.courseid,
                        lesson_id: lessonId.lessonid
                    }
                })
                    .then((response) => {
                        setLikesCount(response.data["course_data"].course_likes)
                    }))
        }
        catch (err) {
            console.error(err)
        }


        // try {
        //     client.put("likes_count/")
        //         .then((resp) => {
        //             // setLdata(resp.data)
        //             setIconColor(resp.data.status)

        //             setLikes(resp.data.Likes)

        //             client.get("usr_course_page/", {

        //                 params:
        //                 {
        //                     course_id: course.courseid,
        //                     lesson_id: lessonId.lessonid
        //                 },
        //                 withCredentials: true
        //             })
        //                 .then((resp) => {
        //                     setLikesData(resp.data.course_data.course_likes)
        //                 })
        //         })

        // }
        // catch (error) {

        //     console.log('Error while updating likes:', error);
        // }

    };




    const openNewTab = (documentUrl) => {
        window.open(documentUrl, '_blank');
    };

    const copyTextToClipboard = document.getElementById("txt")
    const [showOverlay, setShowOverlay] = useState(false);
    const [fill, setFill] = useState("")

    const [isPlaying, setIsPlaying] = useState(true);

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

    let time;
    const [play, setPlay] = useState(0);
    console.log(play)
    var date = new Date(play * 1000);
    console.log(date)
    // Multiply by 1000 to convert seconds to milliseconds
    time = date.toISOString().slice(11, 19)

    console.log(time)
    // const [last_lesson,setLast_Lesson] = useState(lessonId.lessonid)

    const handlePause = () => {
        console.log("paused")

        try {
            client.put("usr_course_page_lesson/", {

                minutes_completed: time,
                course_id: course.courseid,
                lesson_id: lessonId.lessonid,

            })
        }
        catch (err) {
            console.log(err)
        }

    }
    const handleButtonClick = () => {
        // Trigger a re-render by setting the state to false and then back to true
        console.log("button Clicked")
        setIsPlaying(true)
        // client.put("usr_course_page_lesson/", {

        //     minutes_completed: time,
        //     course_id: course.courseid,
        //     lesson_id: lessonId.lessonid,

        // })
        setTimeout(() => {
            window.location.reload()
        }, 500)



        // setShouldRerender(false);
        // setTimeout(() => {
        //     setShouldRerender(true);
        // }, 1000)
        // setIsPlaying(true)
        // setShowOverlay(false)
        // setFill("blur(0px)")
    };


    const seekToTime = () => {
        const seconds = parseInt(window.localStorage.getItem('playseconds'))
        console.log(seconds)
        if (playerRef.current) {
            playerRef.current.seekTo(seconds, 'seconds');
        }
    };

    // function copyPageUrl(value) {
    //     try {
    //         navigator.clipboard.writeText(value);
    //         console.log('item copied');
    //     } catch (err) {
    //         console.error('Failed to copy: ', err);
    //     }
    // }
    const clipboard = useClipboard({ timeout: 1000 });
    const [copiedIndex, setCopiedIndex] = useState(-1);

    useEffect(() => {
        client.get("download_certificate/", {
            params: {
                course_id: course.courseid
            }
        }, [course.courseid])
            .then(resp => setCertifcatename(resp.data.name))
    }, [course.courseid])

    console.log(certificateName)

    const handleduration = (value) => {
        const [hours, minutes, seconds] = value.toString().split(":");
        var minutestime = Number(hours) * 60 + Number(minutes) + Number(seconds) / 60

        return Math.floor(minutestime)
    }
    return (
        <>
            <Modal style={{ display: "flex", justifyContent: "center" }} size={mediumScreen ? "70%" : "100%"} opened={certificateModal} onClose={() => setCertificateModal(false)} title="Preview" withCloseButton>
                <Container>
                    <div ref={targetRef} style={{ width: "inherit", height: 'inherit' }}>
                        <Image className='bg' h={'auto'} src={certificate} alt='Certificate' />
                        <Center>
                            <Text className='certificatename'>
                                {certificateName}
                            </Text>
                        </Center>
                    </div>

                </Container>
            </Modal>


            <Box>
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
                                                marginTop: "35%",
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
                                        <ReactPlayer ref={playerRef}
                                            style={{ pointerEvents: showOverlay && 'none', filter: fill }}
                                            key={item.lesson_id} height={"100%"} width={"100%"}
                                            controls
                                            playing={isPlaying}
                                            onStart={seekToTime}

                                            onPause={handlePause}

                                            onProgress={(progress) => {
                                                const integerValue = Math.floor(progress.playedSeconds);
                                                console.log(integerValue)
                                                setPlay(integerValue);
                                            }}

                                            // seekTo={seekToTime}

                                            url={item.lesson_url}

                                            onEnded={() => {
                                                setShowOverlay(true)
                                                setFill("blur(1px)")
                                                setIsPlaying(false)
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

                                        />
                                    ))
                                }
                            </Container>
                            <Space h={7} />
                            <Box >
                                <Tabs defaultValue={"overview"}>
                                    <Tabs.List>
                                        <Flex   >
                                            <Group style={{ paddingLeft: 20 }}>
                                                <Tabs.Tab value='overview'>Overview</Tabs.Tab>
                                                <Tabs.Tab value='faq'>FAQ</Tabs.Tab>
                                            </Group>
                                            <Group spacing={20} pl={400}>
                                                <Group spacing={5}>
                                                    <ActionIcon onClick={handleIconClick}><BiSolidLike size={22} color={like === true ? "rgba(240, 154, 62, 1)" : "rgba(58, 58, 58, 1)"} /></ActionIcon>
                                                    <Text fw={"600"} fz={14}>{likescount} </Text>
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
                                            {certificateStatus && (<>
                                                <Card pl={0}>
                                                    <UnstyledButton onClick={() => {
                                                        setCertificateModal(true)
                                                        setTimeout(() => {
                                                            exportComponentAsPNG(targetRef)
                                                        }, 1000)
                                                    }}><Text c={"rgba(0, 117, 225, 1)"} >DOWNLOAD CERTIFICATE</Text></UnstyledButton>

                                                </Card>
                                            </>)
                                            }
                                            <Group>
                                                <Text fz={18} color="#3A3A3A" fw={"600"} >{homeData.

                                                    course_name}</Text>
                                                <Text fz={18}> . </Text>
                                                <Text fz={14} color="#3A3A3A" fw={"600"} >{lessonName}</Text>
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
                                                {homeData.course_description}
                                            </Spoiler>
                                        </Card>
                                    </Tabs.Panel>
                                    <Tabs.Panel value='faq'>


                                        <Accordion >
                                            {fData ? (fData.map((item) => (
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
                                <Accordion defaultValue={"material"} chevronSize={0}>
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
                                                                extracted = materialUrl.split('/').pop().replace(/_/g, ' ').replace(/\.[^/.]+$/, '');
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

                                        <Spoiler maxHeight={100} showLabel="More clipboards" hideLabel="Show less">
                                            {
                                                clipboards.map((item, index) => (
                                                    <Accordion.Panel  >
                                                        <Flex className='clipgrp' >
                                                            <div>
                                                                {/* {
                                                            lessonData.map((lesson) => {
                                                                let extracted;
                                                                if (lesson.clipboards) {

                                                                    // const materialUrl = lesson.materials[0];
                                                                    // extracted = materialUrl.split('/').slice(-2, -1)[0].replace(/_/g, ' ').replace(/\.[^/.]+$/, '');
                                                                    // return <Text id='txt' color='#FFFFFF' key={lesson.lesson_id}>Back to Basics</Text>;

                                                                }

                                                            })
                                                        } */}
                                                                <Text id='txt' color='#FFFFFF' key={index}>{item}</Text>

                                                            </div>
                                                            {/* <CopyButton
                                                                value={item}
                                                                timeout={2000}>
                                                                {({ copied, copy }) => (
                                                                    <Tooltip label={copied ? 'Copied' : 'Copy to Clipboard'} withArrow>
                                                                        <ActionIcon variant="transperant" onClick={() => {
                                                                            copy();
                                                                            console.log("copy hitted")
                                                                            console.log(item)
                                                                        }}>
                                                                            {copied ? (
                                                                                <TiTick style={{ width: 16 }} color={copied ? 'teal' : 'gray'} />
                                                                            ) : (
                                                                                <TbCopy style={{ width: 16 }} color={copied ? 'teal' : 'gray'} />
                                                                            )}
                                                                        </ActionIcon>
                                                                    </Tooltip>
                                                                )}
                                                            </CopyButton> */}
                                                            <div key={index}>
                                                                <Tooltip label={copiedIndex === index ? 'Copied' : 'Copy to Clipboard'} withArrow>
                                                                    <ActionIcon variant="transperant" onClick={() => {
                                                                        setCopiedIndex(index)
                                                                        setCopied(true);
                                                                        var textToCopy = item
                                                                        console.log(textToCopy)
                                                                        const textArea = document.createElement('textarea');
                                                                        textArea.value = textToCopy;
                                                                        document.body.appendChild(textArea);
                                                                        textArea.select();

                                                                        try {
                                                                            const successful = document.execCommand('copy');
                                                                            const message = successful ? 'Text copied to clipboard!' : 'Unable to copy text.';
                                                                            setCopied(true);
                                                                        } catch (err) {
                                                                            console.error('Failed to copy: ', err);
                                                                        }

                                                                        document.body.removeChild(textArea);
                                                                        setTimeout(() => {
                                                                            setCopiedIndex(-1)
                                                                            setCopied(false)
                                                                        }, 2000)
                                                                    }}>
                                                                        {/* <TbCopy style={{ width: 16 }} color={'gray'} /> */}
                                                                        {copiedIndex === index ? (
                                                                            <TiTick style={{ width: 16 }} color={copiedIndex === index ? 'teal' : 'gray'} />
                                                                        ) : (
                                                                            <TbCopy style={{ width: 16 }} color={copiedIndex === index ? 'teal' : 'gray'} />
                                                                        )}


                                                                    </ActionIcon>
                                                                </Tooltip>
                                                            </div>
                                                        </Flex>
                                                    </Accordion.Panel>
                                                ))
                                            }

                                        </Spoiler>

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

                                                                        <Flex p={"1rem"} align={"center"} gap={15} >
                                                                            {

                                                                                item.lesson_status === "completed" ?
                                                                                    (<ActionIcon variant='tranperant' ><BsCheckCircle color='green' size={20} /></ActionIcon>) :
                                                                                    (<ActionIcon variant='tranperant' ><BiRadioCircle color='#5F5F5F' size={20} /></ActionIcon>)
                                                                            }

                                                                            <Flex direction={"column"}>
                                                                                <div onClick={() => {
                                                                                    handleButtonClick();
                                                                                    navigate(`/courseplayer/${course.courseid}/${item.lesson_id}`)
                                                                                }} key={item.

                                                                                    lesson_id}>
                                                                                    <Text c={"#FFFFFF"}>{index + 1}. {item.

                                                                                        lesson_name}</Text>
                                                                                </div>
                                                                                <Space h={8} />
                                                                                <Flex gap={10} >

                                                                                    <Text color='#FFFFFF' fz={"xs"}>{handleduration(item.lesson_duration)}m </Text>
                                                                                    {

                                                                                        item.quiz_attempt_status === true ?

                                                                                            (<Flex gap={100}>
                                                                                                <Flex gap={5}>
                                                                                                    <Text fz={"xs"} c={"white"}>Score :</Text>
                                                                                                    <Text fz={"xs"} c={"rgba(0, 156, 23, 1)"}>{item.

                                                                                                        quiz_score}%</Text>
                                                                                                </Flex>
                                                                                                <UnstyledButton onClick={() => navigate(`/quiz/${course.courseid}/${item.lesson_id}`)} style={{ color: "rgba(0, 117, 225, 1)", fontSize: 12 }}>
                                                                                                    <Text fw={600}> RE-TAKE QUIZ </Text>
                                                                                                </UnstyledButton>
                                                                                            </Flex>) : (null)


                                                                                    }


                                                                                </Flex>
                                                                            </Flex>
                                                                        </Flex>

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

export default CourseHomeComp
