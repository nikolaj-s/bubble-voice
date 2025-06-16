
import IconButton from '../../../../components/ui/Buttons/IconButton/IconButton'
import { Logo } from '../../../../components/Icons/Bubble/Logo'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { resetServerDetails } from '../../../../features/ServerDetails/serverDetailsSlice'
import { toggleMobileMenu } from '../../../../features/Mobile/mobileSlice'

export const DashboardNavButton = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {isServerMenuOpen} = useSelector(state => state.mobileSlice);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const handleCloseMobileMenu = () => {
        if (isServerMenuOpen) {
            dispatch(toggleMobileMenu('isServerMenuOpen'));
        }
    }

    const handleReturnToDashBoard = () => {
        handleCloseMobileMenu();
        dispatch(resetServerDetails())
        navigate('/dashboard')
    }

    return (
        <IconButton 
        backgroundColor={server_id ? null : 'var(--accent-color)'}
        onClick={handleReturnToDashBoard}
        Icon={<Logo />}
        padding={2}
        width={50}
        height={50}
        title={
        <p style={{
            padding: 5,
            margin: 0,
            fontSize: '14px'
        }}>
            Dashboard
        </p>}
        position='right'
        />
    )
}
