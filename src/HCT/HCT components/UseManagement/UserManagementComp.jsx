import { AppShell, Header } from '@mantine/core'
import React from 'react'
import HeadHCT from '../HCT head/HeadHCT'
import { useMediaQuery } from '@mantine/hooks';
import UserManagement from './UserManagement';

const UserManagementComp = () => {
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
                        }><UserManagement /></AppShell>
                    ) : (
                        <>
                            <UserManagement />
                            {/* <MobileHead /> */}
                        </>
                    )
                }
            </>
        </div>
    )
}

export default UserManagementComp
