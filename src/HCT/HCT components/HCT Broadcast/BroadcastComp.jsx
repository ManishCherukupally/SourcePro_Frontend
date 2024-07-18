import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react'
import Broadcast from './Broadcast';
import { AppShell, Header } from '@mantine/core';
import HeadHCT from '../HCT head/HeadHCT';

const BroadcastComp = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");



    return (
        <div>
            <>
                {
                    mediumScreen ? (
                        <AppShell header={
                            <Header><HeadHCT /></Header>
                        }><Broadcast /></AppShell>
                    ) : (
                        <>
                            <Broadcast />
                            {/* <MobileHead /> */}
                        </>
                    )
                }
            </>
        </div>
    )
}

export default BroadcastComp
