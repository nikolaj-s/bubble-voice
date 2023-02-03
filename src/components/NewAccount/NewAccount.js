import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccountSettingsLoading, selectNewAccountState, updateAccount } from '../../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Loading } from '../LoadingComponents/Loading/Loading';
import { SettingsHeader } from '../titles/SettingsHeader/SettingsHeader';
import { FinishSettingUp } from './FinishSettingUp/FinishSettingUp';
import { HowToJoinAServer } from './HowToJoinAServer/HowToJoinAServer';
import { NavigatingAServer } from './NavigatingAServer/NavigatingAServer';

import "./NewAccount.css";

export const NewAccount = ({mobile = false}) => {

    const dispatch = useDispatch();

    const [page, setPage] = React.useState('setup');

    const [newUserImage, setNewUserImage] = React.useState({});

    const [newUserBanner, setNewUserBanner] = React.useState({});

    const newAccount = useSelector(selectNewAccountState);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const loading = useSelector(selectAccountSettingsLoading);
    
    const handleAdvance = (skip = false) => {
        if (page === 'setup' && skip === false) return setPage("how-to-join");

        if (page === 'how-to-join' && skip === false) return setPage("navigate-a-server");

        if (skip || page === 'navigate-a-server') return dispatch(updateAccount({userImage: newUserImage, userBanner: newUserBanner}))
        
    }

    const handlePrev = () => {
        if (page === 'how-to-join') return setPage('setup');

        if (page === 'navigate-a-server') return setPage('how-to-join')
    }

    return (
        <>
        {newAccount ?
            <div 
            style={{
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0.5)`
            }}
            className='new-account-state-container'>
                <div 
                style={{backgroundColor: secondaryColor}}
                className='inner-new-account-state-container'>
                    <SettingsHeader title={"Welcome To Bubble"} />
                    <AnimatePresence exitBeforeEnter>
                        {page === 'setup' ? <FinishSettingUp key={"account"} setNewUserBanner={setNewUserBanner} setNewUserImage={setNewUserImage} /> : null}
                        {page === 'how-to-join' ? <HowToJoinAServer key={"how-to-join"} /> : null}
                        {page === 'navigate-a-server' ? <NavigatingAServer key={"how-to-navigate"} /> : null}
                    </AnimatePresence>
                    <div className='new-account-nav-container'>
                        <h3 onClick={() => {handleAdvance(true)}} style={{color: textColor}}>Skip</h3>
                        {page !== 'setup' ? <h3 onClick={handlePrev} className="new-account-prev-button" style={{color: textColor}}>Prev</h3> : null}
                        <div onClick={() => {handleAdvance(false)}} style={{backgroundColor: primaryColor}} className='new-next-button-container'>
                            <h3 style={{color: textColor}}>{page === 'navigate-a-server' ? "Finish" : "Next"}</h3>
                        </div>
                    </div>
                    <Loading loading={loading} />
                </div>
            </div>
        : null}
        </>
    )
}
