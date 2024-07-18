import { useMediaQuery } from '@mantine/hooks';
import React from 'react'
import Template from './Template';
import { AppShell, Header } from '@mantine/core';
import HeadHCT from '../HCT head/HeadHCT';

const TemplateComp = () => {
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
                        }><Template /></AppShell>
                    ) : (
                        <>
                            <Template />
                            {/* <MobileHead /> */}
                        </>
                    )
                }
            </>
        </div>
    )
}

export default TemplateComp
