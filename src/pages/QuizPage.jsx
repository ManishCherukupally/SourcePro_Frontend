import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Quiz_test from '../components/quizComp/Quiz_test'
import client from '../API/api'

const QuizPage = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(false)
    const course = useParams()
    const lessonId = useParams()
    useEffect(() => {
        client.get("quiz/", {
            withCredentials: true,
            params: {
                course_id: course.courseid,
                lesson_id: lessonId.lessonid
            }
        }).then((resp) => {
            if (resp.data.status === 'unauthorized_user') {
                navigate("/")
            }
            else {
                setAuth(true)
            }
        })
    })
    return (
        <div>
            {
                auth && <Quiz_test />
            }
        </div>
    )
}

export default QuizPage
