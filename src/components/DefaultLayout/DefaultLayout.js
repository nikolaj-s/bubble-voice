import React from 'react'
import { DefaultHeader } from '../DefaultHeader/DefaultHeader'
import { DefaultFooter } from '../DefaultFooter/DefaultFooter'
import { Outlet } from 'react-router'
import ScrollLoadWrapper from '../ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper'

export const DefaultLayout = () => {
    return (
        <>
        <DefaultHeader />
        <ScrollLoadWrapper style={{height: 'calc(100% - 84px)', backgroundColor: 'transparent'}}>
            <Outlet />
            <DefaultFooter />
        </ScrollLoadWrapper>
        </>
    )
}
