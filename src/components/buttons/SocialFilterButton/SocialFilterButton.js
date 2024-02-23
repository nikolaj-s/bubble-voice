import React from 'react'

import {ButtonAnimationWrapper} from '../ButtonAnimationWrapper/ButtonAnimationWrapper';
import { FilterIcon } from '../../Icons/FilterIcon/FilterIcon';
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';


export const SocialFilterButton = (props) => {

  const color = useSelector(selectTextColor);

    return (
      <ButtonAnimationWrapper {...props}>
          
          <FilterIcon />
          <p style={{color: color, marginLeft: 3, fontSize: 14, letterSpacing: 1}}>Filter</p>
      </ButtonAnimationWrapper>
    )
}
