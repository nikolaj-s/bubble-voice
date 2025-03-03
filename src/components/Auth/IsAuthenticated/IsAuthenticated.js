import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuthenticated } from '../../../features/Auth/AuthSlice'
import { useNavigate } from 'react-router-dom'

export const IsAuthenticated = ({children}) => {

    const navigate = useNavigate();

    const authenticated = useSelector(selectAuthenticated);

    React.useEffect(() => {
        
        if (authenticated) {
            navigate("/dashboard");
        }

    }, [authenticated])

    return (
        <>
        {children}
        </>
    )
}
