
import React, { useRef } from 'react'
import certificate from './assests/certificate.png'
import jsPDF from 'jspdf';

import { Container, Grid, Group, Image, Text, Button } from '@mantine/core';
import "./Css.css"
import generatePDF, { Margin, Resolution, usePDF } from 'react-to-pdf';
const Certificate = () => {
    const targetRef = useRef()
    // const { toPDF, tragetRef } = usePDF({ filename: "Certificate.pdf" });
    const name = "Manish.C"

    const options = {

        // default is 'A4'
        format: 'certificate',
        method: 'open',
        resolution: Resolution.NORMAL,
        page: {

            orientation: 'landscape',
        },
        overrides: {
            // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
            pdf: {
                compress: true
            }
        }
    }
    // const handleDownload = () => {
    //     const doc = new jsPDF({
    //         orientation: "landscape",
    //         unit: "in",

    //     });
    //     doc.html(document.querySelector('.certificate-container'), {
    //         callback: (doc) => {
    //             doc.save('certificate.pdf');
    //         },
    //     });
    // };
    // const form = useForm({
    //     initialValues: {
    //         name: "manish",

    //     },

    //     transformValues: (values) => ({
    //         name: `${values.name}`,

    //     }),
    // })
    // const clipboard = useClipboard({ timeout: 1000 });
    // const word = ["im manish", "ram", "sai"]
    // const [copiedIndex, setCopiedIndex] = useState(-1);
    return (
        <>

            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


                <div ref={targetRef} >
                    <Image className='bg' w={"99.1%"} h={"auto"} src={certificate} alt="Certificate" />
                    <Group position="absolute" >
                        <Text style={{ left: name.length > 8 ? ("510px") : ("600px") }} className='name'>{name}</Text>

                        {/* Add other relevant information as needed */}
                    </Group>
                </div>


            </Container>

            {/* <Button onClick={() => generatePDF(targetRef, options, { filename: 'Certificate.pdf' })}>Download Certificate</Button> */}
        </>
    )
}

export default Certificate
