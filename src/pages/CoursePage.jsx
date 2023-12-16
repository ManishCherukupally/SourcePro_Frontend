import React, { useEffect, useState } from 'react'
import Course_home from '../components/CourseComp/Course_home'
import { useNavigate, useParams } from 'react-router-dom'
import client from '../API/api'


const CoursePage = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(false)
    const course = useParams()
    const lessonId = useParams()
    useEffect(() => {
        client.get("usr_course_page/", {
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
    useEffect(() => {
        client.get("usr_course_page_lesson/", {
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
            <Course_home />
        </div>
    )
}

export default CoursePage
