import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuthenticated } from '../../../features/Auth/AuthSlice'
import { useLocation, useNavigate } from 'react-router-dom'

export const IsAuthenticated = ({children}) => {

    const navigate = useNavigate();

    const location = useLocation();

    const authenticated = useSelector(selectAuthenticated);

    React.useEffect(() => {
        
        if (authenticated && location.pathname !== "/dashboard") {
            navigate("/dashboard");
        }

    }, [authenticated, location.pathname, navigate])

    return (
        <>
        {children}
        </>
    )
}
