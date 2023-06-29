
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleUpdateBio, selectAccountSettingsLoading, selectDisplayName, selectNewAccountState, selectProfileBio, selectUserBanner, selectUserImage, updateAccount, updateAccountInputState } from '../../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Loading } from '../LoadingComponents/Loading/Loading';
import { SettingsHeader } from '../titles/SettingsHeader/SettingsHeader';

import "./NewAccount.css";
import { EditMemberPanel } from '../../features/settings/appSettings/accountSettings/EditMemberPanel/EditMemberPanel';

export const NewAccount = ({mobile = false}) => {

    const dispatch = useDispatch();

    const [newUserImage, getNewUserImage] = React.useState({});

    const [newUserBanner, getNewUserBanner] = React.useState({});

    const [color, updateColor] = React.useState("");

    const [newShape, setNewShape] = React.useState("circle");

    const [previewBio, togglePreviewBio] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const loading = useSelector(selectAccountSettingsLoading);

    const displayName = useSelector(selectDisplayName);

    const profileBio = useSelector(selectProfileBio);

    const userImage = useSelector(selectUserImage);

    const userBanner = useSelector(selectUserBanner);

    const changeProfileShape = (shape) => {
        setNewShape(shape);
    }

    const handleInput = (value, state) => {
        dispatch(updateAccountInputState({value: value, state: state}));
    }
    
    const handleAdvance = (skip = false) => {
        dispatch(updateAccount({userImage: newUserImage, userBanner: newUserBanner, newShape: newShape, color: color}))
    }

    const changeProfileBio = (value) => {
        if (value.length > 1024) return;

        dispatch(handleUpdateBio(value));
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
                <SettingsHeader title={"Welcome, Finsh Account Set Up"} />
                <EditMemberPanel color={color} updateColor={updateColor} newShape={newShape} getNewUserBanner={getNewUserBanner} getNewUserImage={getNewUserImage} userImage={userImage} userBanner={userBanner} changeProfileShape={changeProfileShape} handleInput={handleInput} displayName={displayName} previewBio={previewBio} togglePreviewBio={togglePreviewBio} profileBio={profileBio} changeProfileBio={changeProfileBio}/>
                <div className='new-account-nav-container'>
                    
                    <div onClick={() => {handleAdvance(false)}} style={{backgroundColor: primaryColor}} className='new-next-button-container'>
                        <h3 style={{color: textColor}}>Finish</h3>
                    </div>
                </div>
                <Loading loading={loading} />
            </div>
        </div>
    )
}
