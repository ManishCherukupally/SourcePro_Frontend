import React, { useEffect, useState } from 'react'
import { Center, Container, Image, Text } from "@mantine/core";
import client from '../API/api';
import { useParams } from 'react-router-dom';
import certificate from '../assets/certificate.png'


const Certificate = () => {
    const [certificateName, setCertifcatename] = useState("")

    const course = useParams()
    useEffect(() => {
        client.get("download_certificate/", {
            params: {
                course_id: course.courseid
            }
        }, [course.courseid])
            .then(resp => setCertifcatename(resp.data.name))
    })
    return (
        <div>





            <Image className='bg' h={'auto'} src={certificate} alt='Certificate' />
            <Center>
                <Text className='certificatename'>
                    {certificateName}
                </Text>
            </Center>
            {/* Add other relevant information as needed */}


            {/* <Flex justify={mediumScreen ? "end" : "start"} gap={"2%"}>

    <Button onClick={() => generatePDF(targetRef, options, { filename: 'Certificate.pdf' })}
        style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "rgba(240, 154, 62, 1)" }}>Download Certificate</Button >
    {mediumScreen ? null : <Button variant='outline' color='dark' onClick={() => setCertificateModal(false)}>No</Button>}
</Flex> */}


        </div>
    )
}

export default Certificate
