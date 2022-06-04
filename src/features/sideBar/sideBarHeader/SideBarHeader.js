// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// components
import { BubbleLogo } from '../../../components/Icons/bubbleLogo/BubbleLogo';
import { ExpansionToggle } from '../../../components/buttons/expansionToggle/ExpansionToggle';
import { HeaderTitle } from '../../../components/titles/headerTitle/headerTitle';
import { selectSideBarHeader } from '../sideBarSlice';

// style's
import "./SideBarHeader.css";

export const SideBarHeader = () => {

    const navigate = useNavigate();

    const returnToServerSelect = () => {
        navigate('/dashboard')
    }

    const title = useSelector(selectSideBarHeader);
    
    return (
        <div className='side-bar-header-container'>
            <BubbleLogo action={returnToServerSelect} />
            <HeaderTitle title={title} />
            <ExpansionToggle />
        </div>
    )
}
