import { AppShell, Header } from '@mantine/core'
import React from 'react'
import HeadHCT from '../HCT head/HeadHCT'
import { useMediaQuery } from '@mantine/hooks';
import DashboardHCT from './DashboardHCT';

const DashboardComp = () => {
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
                        }><DashboardHCT /></AppShell>
                    ) : (
                        <>
                            <DashboardHCT />
                            {/* <MobileHead /> */}
                        </>
                    )
                }
            </>
        </div>
    )
}

export default DashboardComp
