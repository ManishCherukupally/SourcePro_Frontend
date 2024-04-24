import React, { useEffect, useRef, useState } from 'react'
import Head from '../dashboard Header/Head'
import { atom, useAtom } from 'jotai';
// @ts-ignore
import { ActionIcon, AppShell, Box, Button, Card, Center, Checkbox, Container, Divider, Flex, Group, Loader, LoadingOverlay, Modal, Overlay, Radio, Space, Stack, Text, Title } from '@mantine/core'
import { BiArrowBack } from 'react-icons/bi'
import { QuizScoreGreen, QuizScoreRed } from './QuizScoreColor'
import { quiz, qwitho, scoreatom, valquiz } from '../../Store/store'
import { useNavigate, useParams } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import client from '../../API/api';
import QuizComponent from '../CommonComponents/QuizComponent';
// import axios from 'axios'
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'




const Quiz_test = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    return (

        <div>
            {
                mediumScreen ? (
                    <>
                        <AppShell header={<Head />}>
                            <QuizComponent />
                        </AppShell>
                    </>
                ) : (
                    <>
                        <QuizComponent />
                    </>
                )
            }
        </div>
    )
}

export default Quiz_test