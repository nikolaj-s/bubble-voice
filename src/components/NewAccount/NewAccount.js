
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleUpdateBio, selectAccountSettingsLoading, selectDisplayName, selectNewAccountState, selectProfileBio, selectProfileColor, selectUserBanner, selectUserImage, selectUsername, updateAccount, updateAccountInputState } from '../../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { selectGlassColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Loading } from '../LoadingComponents/Loading/Loading';
import { SettingsHeader } from '../titles/SettingsHeader/SettingsHeader';

import "./NewAccount.css";
import { EditMemberPanel } from '../../features/settings/appSettings/accountSettings/EditMemberPanel/EditMemberPanel';

export const NewAccount = ({mobile = false}) => {

    const dispatch = useDispatch();

    const [newUserImage, getNewUserImage] = React.useState({});

    const [newUserBanner, getNewUserBanner] = React.useState({});

    const [color, updateColor] = React.useState("");

    const [newDisplayName, setDisplayName] = React.useState("");

    const [newShape, setNewShape] = React.useState("circle");

    const [previewBio, togglePreviewBio] = React.useState(false);

    const [newBio, setNewBio] = React.useState("");

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const loading = useSelector(selectAccountSettingsLoading);

    const displayName = useSelector(selectDisplayName);

    const username = useSelector(selectUsername);

    const userImage = useSelector(selectUserImage);

    const userBanner = useSelector(selectUserBanner);

    const userColor = useSelector(selectProfileColor);

    const glassColor = useSelector(selectGlassColor);

    const changeProfileShape = (shape) => {
        setNewShape(shape);
    }

    React.useEffect(() => {

        setDisplayName(displayName);

        updateColor(userColor || secondaryColor);

    }, [])

    const handleDisplayName = (value) => {
        setDisplayName(value);
    }

    const handleInput = (value, state) => {
        dispatch(updateAccountInputState({value: value, state: state}));
    }
    
    const handleAdvance = (skip = false) => {
        dispatch(updateAccount({userImage: newUserImage, userBanner: newUserBanner, newShape: newShape, color: color, bio: newBio, displayName: newDisplayName}))
    }

    const changeProfileBio = (value) => {
        if (value.length > 1024) return;

        setNewBio(value);
    }

    return (
        <div 
        style={{
            backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0.5)`
        }}
        className='new-account-state-container'>
            <div 
            style={{backgroundColor: secondaryColor, border: `solid 8px ${secondaryColor}`}}
            className='inner-new-account-state-container'>
                <div 
                style={{backgroundColor: primaryColor}}
                className='new-account-welcome-message-box'>
                    <h2
                    style={{color: textColor}}
                    >Welcome To Bubble</h2>
                    <h3 style={{color: textColor}}>Finish Setting Up Your Bubble Profile</h3>
                </div>
                <EditMemberPanel disablePreview={true} username={username} handleNewDisplayName={handleDisplayName} color={color} updateColor={updateColor} newShape={newShape} getNewUserBanner={getNewUserBanner} getNewUserImage={getNewUserImage} userImage={userImage} userBanner={userBanner} changeProfileShape={changeProfileShape} handleInput={handleInput} displayName={newDisplayName} previewBio={previewBio} togglePreviewBio={togglePreviewBio} profileBio={newBio} changeProfileBio={changeProfileBio}/>
                <div className='new-account-nav-container'>
                    
                    <div onClick={() => {handleAdvance(false)}} style={{backgroundColor: primaryColor}} className='new-next-button-container'>
                        <h3 style={{color: textColor}}>Finish</h3>
                    </div>
                </div>
                
                {loading ?
                <div 
                style={{backgroundColor: glassColor}}
                className='outer-finish-loading-new-account'>
                    <div 
                    style={{backgroundColor: primaryColor}}
                    className='loading-finish-setting-up-account'>
                        <Loading loading={loading} />
                        <h3 style={{color: textColor}}>Getting Things Ready</h3>
                    </div>
                </div>
                : null}
                <div style={{height: 100, width: '100%', flexShrink: 0}} />
            </div>
        </div>
    )
}
