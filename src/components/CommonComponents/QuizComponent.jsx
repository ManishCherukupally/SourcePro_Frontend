import React, { useEffect, useRef, useState } from 'react'
import Head from '../dashboard Header/Head'
import { atom, useAtom } from 'jotai';
// @ts-ignore
import { ActionIcon, AppShell, Box, Button, Card, Center, Checkbox, Container, Divider, Flex, Footer, Group, Loader, LoadingOverlay, Modal, Overlay, Radio, Space, Stack, Text, Title } from '@mantine/core'
import { BiArrowBack } from 'react-icons/bi'
import { QuizScoreGreen, QuizScoreRed } from '../quizComp/QuizScoreColor'
import { quiz, qwitho, scoreatom, valquiz } from '../../Store/store'
import { useNavigate, useParams } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import client from '../../API/api';
// import axios from 'axios'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'



// @ts-ignore
export const Result = (props) => {
    const { question_id, index, question_type, question, options, user_answer, status } = props
    return (

        <Container mt={"2.5rem"} size={"xl"} style={{ pointerEvents: 'none' }}>
            <>
                <div key={question_id}>
                    <Group>
                        <Text fw={600}>{index + 1} .</Text>
                        <Text fw={600}>{question}</Text>
                    </Group>
                    <Space h={15} />
                    {
                        question_type === "MCQ" ?
                            (

                                // <CheckboxGroup onChange={setValue} optio ns={quiz.
                                //     // @ts-ignore
                                //     options} />
                                // onChange={(value) => handleCheckOptionsSelected(question_id, value)}
                                <Checkbox.Group
                                    // @ts-ignore
                                    name={
                                        question_id} value={user_answer} >
                                    {Object.keys(options).map((optionKey) => (
                                        // @ts-ignore
                                        <Checkbox mb={12} radius="lg" fw={400} key={optionKey} value={optionKey} color={status && status === "True" ? 'green' : 'red'} label={options[optionKey]}
                                        />
                                    ))}
                                    <Space h={10} />
                                    <Divider />
                                    <Space h={15} />
                                </Checkbox.Group>


                            )
                            : (
                                // {selectedOptions[quiz.question_id]}
                                // @ts-ignore
                                // onChange={(value) => handleOptionsSelected(quiz.question_id, value)} 
                                <Radio.Group name={question_id} value={user_answer[0]} >
                                    {Object.keys(options).map((optionKey) => (
                                        <Radio key={optionKey} mb={12}
                                            // @ts-ignore
                                            value={optionKey}
                                            // optionKey.status ? "green" : "red"
                                            // @ts-ignore
                                            color={status && status === "True" ? 'green' : 'red'}
                                            // @ts-ignore
                                            label={options[optionKey]}
                                        />


                                    ))}
                                    <Space h={10} />
                                    <Divider />
                                    <Space h={15} />
                                </Radio.Group>
                            )}

                </div>



            </>
        </Container>
    )
}

const QuizComponent = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate()
    const [quizData, setQuizData] = useState([]);
    // @ts-ignore
    const quiz = quizData
    console.log("aquiz  " + JSON.stringify(quiz))
    const [allQuestions, setAllQuestions] = useState([])
    // @ts-ignore
    // const [value, setValue] = useAtom(quiz)
    // console.log("val " + value);
    const [loaderVisible, setLoaderVisible] = useState(false);

    // console.log("questions" + questions)
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [questionwithoption, setQuestionwithoption] = useAtom(qwitho)
    console.log(questionwithoption)
    // @ts-ignore
    const questionsStore = useAtom(qwitho)[0]
    console.log(questionsStore)
    const [quizHeadgreen, setQuizHeadGreen] = useState(false);
    const [quizHeadRed, setQuizHeadRed] = useState(false);
    const [submit, setSubmit] = useState(true)
    const [passOrFail, setPassOrFail] = useAtom(scoreatom)
    const [color, setColor] = useState([])
    // @ts-ignore
    const answer_status = color
    console.log("answer_ status  " + JSON.stringify(answer_status))
    // @ts-ignore
    // console.log("color " + JSON.stringify(color.questions))
    const [attempt, setAttempt] = useState(true)
    const [result, setResult] = useState(false)
    const course = useParams()
    const lessonId = useParams()
    // console.log("color " + color)

    // console.log("passorfail " + passOrFail)
    // console.log("sel " + JSON.stringify(selectedOptions))
    // const [score, setScore] = useAtom(scoreAtom)
    useEffect(() => {


        // Fetch quiz data using Axios when the component mounts
        // https://the-trivia-api.com/v2/questions

        client.get('quiz/',
            {
                withCredentials: true,
                params: {
                    course_id: course.courseid,
                    lesson_id: lessonId.lessonid
                }
            }
        )
            .then((resp) => {
                const qData = resp.data.quiz
                setQuizData(qData);
                // @ts-ignore
                const quedata = resp.data
                const getQuestionIds = () => {
                    const questionIds = [];

                    for (const quiz of quedata.quiz) {
                        questionIds.push(quiz.question_id);
                    }

                    return questionIds;
                };

                const questionIds = getQuestionIds();

                // @ts-ignore
                setAllQuestions(questionIds);
                // // @ts-ignore
                // // console.log(JSON.stringify(resp.data))
            })
            .catch((error) => {
                console.error('Error fetching quiz data:', error);
            });

    }, []);

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
                const data = (resp.data["all_lessons"])
                // lesson = resp.data["all_lessons"].map(item => item.lesson_name)
                data.filter(item => { if (Object.entries(item).length > 6) return setLessonName(item.lesson_name) })
            })


    }, [])


    // @ts-ignore

    const handleOptionsSelected = (questionid, optionKey) => {
        // @ts-ignore
        const updatedSelectedOptions = { ...selectedOptions }
        // const updatedSelectedOptions = updatedSelectedOptions[questionid].selectedOption;
        // @ts-ignore
        updatedSelectedOptions[questionid] = optionKey
        // @ts-ignore
        const presentSelectedOption = [...questionwithoption]
        const q_id = String(questionid)
        // @ts-ignore
        presentSelectedOption[questionid] = { question_id: q_id, option: [optionKey] }

        // console.log("a :" + JSON.stringify(presentSelectedOption))
        // setSelectedOptions(updatedSelectedOptions)
        // @ts-ignore
        setSelectedQuestions(questionid)
        // @ts-ignore
        setQuestionwithoption(presentSelectedOption)
    }
    // @ts-ignore
    const handleCheckOptionsSelected = (questionid, optionKey) => {
        // @ts-ignore
        const updatedSelectedOptions = { ...selectedOptions }
        // const updatedSelectedOptions = updatedSelectedOptions[questionid].selectedOption;
        // @ts-ignore
        updatedSelectedOptions[questionid] = optionKey
        // @ts-ignore
        const presentSelectedOption = [...questionwithoption]
        // console.log("1st present" + JSON.stringify(presentSelectedOption))

        const q_id = String(questionid)
        // @ts-ignore
        presentSelectedOption[questionid] = { question_id: q_id, option: [optionKey] }

        // @ts-ignore
        presentSelectedOption[questionid] = { question_id: q_id, option: optionKey.sort((a, b) => a.localeCompare(b)) }

        console.log("present options" + JSON.stringify(presentSelectedOption))

        // console.log("a :" + JSON.stringify(presentSelectedOption))
        // setSelectedOptions(updatedSelectedOptions)
        // @ts-ignore
        setSelectedQuestions(questionid)
        // @ts-ignore
        setQuestionwithoption(presentSelectedOption)
    }


    const handleSubmit = () => {

        const questions = questionsStore.filter((element) => {
            return element !== null && element !== undefined
        })
        const course_id = course.courseid
        const lesson_id = lessonId.lessonid
        // console.log("filter: " + JSON.stringify(filter))
        const request = {
            course_id,
            lesson_id,
            questions,
            withCredentials: true
        }

        // console.log("request body " + JSON.stringify(requestbody))
        // Show the loader when the "SUBMIT" button is clicked
        if (questions.length === allQuestions.length) {
            client.post("quiz_attempt/", request).then((resp) => {
                const score = resp.data.quiz_score
                // setScore(score)
                // @ts-ignore
                const statusArray = resp.data.answer_status
                console.log("status array" + statusArray)
                // @ts-ignore
                const questionsArray = quizData

                // const updatedQuestionsArray = {
                //     // @ts-ignore
                //     questions: questionsArray.map(question => {
                //         // @ts-ignore
                //         const statusInfo = statusArray.find(status => status.questionid === question.questionid);
                //         if (statusInfo) {
                //             // @ts-ignore
                //             question.user_answer = statusInfo.user_answer
                //             // @ts-ignore
                //             // console.log("question.user_answer  " + question.user_answer.map((options) => (options)))
                //             question.status = statusInfo.status;
                //         }
                //         return question;
                //     })
                // };
                // const updatedQuestionsArray = {
                //     questions: questionsArray.map(question =>
                //     {
                //         // @ts-ignore
                //         const statusInfo = statusArray.filter(status => status.questionid === question.questionid);
                //         if (statusInfo.length > 0)
                //         {
                //             question.user_answer = statusInfo[0].user_answer;
                //             question.status = statusInfo.status;
                //         }
                //         return question;
                //     })
                // };
                // console.log("updatedQuestions  " + JSON.stringify(updatedQuestionsArray))
                // @ts-ignore
                setColor(statusArray)
                //  const passOrFail = score > 70;
                setPassOrFail(score);
                console.log(score)

                setAttempt(false)
                setResult(true)
                // setPassOrFail(score)
                setLoaderVisible(true);
                setTimeout(() => {
                    setLoaderVisible(false);
                    console.log("passorfail " + passOrFail)

                    // Check the score and conditionally render the appropriate component


                    if (score > 70) {
                        setSubmit(false);
                        setQuizHeadGreen(true);
                        // console.log("i am runnig")

                    } else {
                        setSubmit(false);
                        setQuizHeadRed(true);
                    }


                }, 1000);
            })
        } else {
            alert("Kindly answer all of the questions provided below")
        }

    };


    return (

        <div>
            {mediumScreen ? (submit &&
                <Card pl={"2rem"} radius={0} h={"4rem"} style={{ backgroundColor: "#262626" }}>
                    <Flex justify={"space-between"} align={"center"} gap={"1rem"}>
                        <Group>
                            <ActionIcon onClick={open} variant='transparent'><BiArrowBack color='#FFFFFF' size={25} /></ActionIcon>
                            <Text c={"#FFFFFF"} fw={600}>Quiz 1.{" " + lessonName}</Text>
                        </Group>
                        <Button mr={'3.5rem'}
                            variant="filled"
                            onClick={handleSubmit}
                            style={{ backgroundColor: "rgba(240, 154, 62, 1)" }}
                        >SUBMIT</Button>
                    </Flex>
                </Card>
            ) : (submit && <Flex p={"md"} h={"3rem"} style={{ backgroundColor: "#262626" }} >
                <Group>
                    <ActionIcon onClick={open} variant='transparent'><BiArrowBack size={25} color='#FFFFFF' /></ActionIcon>
                    <Text c={"#FFFFFF"} fw={600}>Quiz 1.{" " + lessonName}</Text>
                </Group>
            </Flex>)}
            <Modal style={{ display: "flex", justifyContent: "center" }} opened={opened} onClose={close} title="Are you sure?!">
                <Text>Do you really want to exit the quiz?</Text>
                <Space h={15} />
                <Flex justify={"end"} gap={"2%"}>
                    <Button style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "rgba(240, 154, 62, 1)" }} variant='filled' onClick={() => navigate(`/courseplayer/${course.courseid}/${lessonId.lessonid}`)}>Yes</Button>
                    <Button variant='outline' onClick={close}>No</Button>
                </Flex>
            </Modal>
            {
                quizHeadgreen && <QuizScoreGreen />
            }
            {
                quizHeadRed && <QuizScoreRed />
            }


            <Box>
                {loaderVisible && (
                    <Overlay blur={4}>
                        <div
                            style={{
                                height: "90vh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        ><Card w={320} h={240} style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                                <Center>
                                    {" "}
                                    <Flex direction={"column"} align={"center"}>
                                        <Loader size={"md"}
                                            color="grey"
                                            variant="bars" />
                                        <Space h="md" />
                                        <Text c={"#3A3A3A"} fz={14} fw={600}>Please wait...</Text>
                                        <Text c={"#3A3A3A"} fz={14} fw={600}>Generating your quiz score</Text>
                                    </Flex>
                                </Center>
                            </Card>
                        </div>
                    </Overlay>
                )}


            </Box>
            {attempt && <Container mt={mediumScreen ? "2.5rem" : "1rem"} size={"xl"} style={submit ? { pointerEvents: 'unset' } : { pointerEvents: 'none' }}>
                <>
                    {

                        quizData?.map((quiz, index) => (
                            <div key={quiz.
                                // @ts-ignore
                                quetion_id}>
                                <Group>
                                    <Text fw={600}>{index + 1} .</Text>
                                    <Text fw={600}
                                        onCopy={(e) => {
                                            e.preventDefault();
                                            navigator.clipboard.writeText('');
                                        }}>{quiz.
                                            // @ts-ignore
                                            question}</Text>
                                </Group>
                                <Space h={15} />
                                {quiz.
                                    // @ts-ignore
                                    question_type === "MCQ" ?
                                    (

                                        // <CheckboxGroup onChange={setValue} options={quiz.
                                        //     // @ts-ignore
                                        //     options} />
                                        <Checkbox.Group
                                            // @ts-ignore
                                            name={quiz.
                                                // @ts-ignore
                                                question_id} value={selectedOptions[quiz.question_id]} onChange={(value) => handleCheckOptionsSelected(quiz.question_id, value)}>
                                            {Object.keys(quiz.
                                                // @ts-ignore
                                                options).map((optionKey) => (
                                                    // @ts-ignore
                                                    <Checkbox mb={12} radius="lg" fw={400} key={optionKey} value={optionKey} label={quiz.options[optionKey]}
                                                    />
                                                ))}
                                            <Space h={10} />
                                            <Divider />
                                            <Space h={15} />
                                        </Checkbox.Group>


                                    )
                                    : (
                                        // {selectedOptions[quiz.question_id]}
                                        // @ts-ignore
                                        <Radio.Group name={quiz.question_id} value={selectedOptions[quiz.question_id]} onChange={(value) => handleOptionsSelected(quiz.question_id, value)}>
                                            {Object.keys(quiz.
                                                // @ts-ignore
                                                options).map((optionKey) => (

                                                    <Radio key={optionKey} mb={12}
                                                        // @ts-ignore
                                                        value={optionKey}
                                                        // @ts-ignore
                                                        label={quiz.options[optionKey]}
                                                    />

                                                ))}
                                            <Space h={10} />
                                            <Divider />
                                            <Space h={15} />
                                        </Radio.Group>
                                    )}

                            </div>

                        ))}

                </>
                {mediumScreen ? (null) : (submit && <Button h={"4rem"} fullWidth
                    variant="filled"
                    onClick={handleSubmit}
                    style={{ backgroundColor: "rgba(240, 154, 62, 1)" }}
                >SUBMIT</Button>)}
            </Container>}
            {result &&
                // @ts-ignore
                quiz.map((obj1, index) => {
                    // @ts-ignore
                    const matchingObject2 = answer_status.find((obj2) => obj2.question_id === obj1.question_id)

                    // @ts-ignore
                    // console.log("matchingObject  :  " + JSON.stringify(answer_status.find((obj2) => obj2.question_id === obj1.question_id)))
                    return (
                        <Result
                            key={obj1.question_id}
                            question_type={obj1.question_type}
                            question={obj1.question}
                            options={obj1.options}
                            // @ts-ignore
                            user_answer={matchingObject2 ? matchingObject2.user_answer : " "}
                            // @ts-ignore
                            status={matchingObject2 ? matchingObject2.status : " "}
                            index={index}
                        />
                    )
                })
            }
        </div>

    )
}

export default QuizComponent
