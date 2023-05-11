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

    const [color, setColor] = React.useState("");

    const newAccount = useSelector(selectNewAccountState);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const loading = useSelector(selectAccountSettingsLoading);
    
    const handleAdvance = (skip = false) => {
        dispatch(updateAccount({userImage: newUserImage, userBanner: newUserBanner, newShape: 'circle', color: color}))
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
                        <FinishSettingUp getColor={(c) => {setColor(c)}} key={"account"} setNewUserBanner={setNewUserBanner} setNewUserImage={setNewUserImage} />
                    </AnimatePresence>
                    <div className='new-account-nav-container'>
                       
                        <div onClick={() => {handleAdvance(false)}} style={{backgroundColor: primaryColor}} className='new-next-button-container'>
                            <h3 style={{color: textColor}}>Finish</h3>
                        </div>
                    </div>
                    <Loading loading={loading} />
                </div>
            </div>
        : null}
        </>
    )
}
