
import { DefaultHeader } from '../DefaultHeader/DefaultHeader'
import { DefaultFooter } from '../DefaultFooter/DefaultFooter'
import { Outlet } from 'react-router'
import ScrollLoadWrapper from '../ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper'

export const DefaultLayout = () => {
    return (
        <>
        <ScrollLoadWrapper style={{backgroundColor: 'transparent'}}>
            <DefaultHeader />
            <Outlet />
            <DefaultFooter />
        </ScrollLoadWrapper>
        </>
    )
}
