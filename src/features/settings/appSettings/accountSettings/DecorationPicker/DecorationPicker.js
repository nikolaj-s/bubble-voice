import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfileDecorations, selectLoadingDecorations, selectProfileDecorations } from '../accountSettingsSlice'
import { InputTitle } from '../../../../../components/titles/inputTitle/InputTitle';
import { Decoration } from '../../../../../components/Decoration/Decoration';
import { ImageButton } from '../../../../../components/buttons/ImageButton/ImageButton';
import { selectAccentColor } from '../../appearanceSettings/appearanceSettingsSlice';

import "./DecorationPicker.css";
import { NullButton } from '../../../../../components/buttons/NullButton/NullButton';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';

export const DecorationPicker = ({currentDecoration, setDecoration}) => {

    const dispatch = useDispatch();

    const decorations = useSelector(selectProfileDecorations);

    const accentColor = useSelector(selectAccentColor);

    const loadingDecorations = useSelector(selectLoadingDecorations);

    React.useEffect(() => {
        if (decorations.length === 0) {
            dispatch(fetchProfileDecorations());
        }
    }, [])
    console.log(currentDecoration)
    return (
        <>
        <InputTitle title={"Choose A Profile Decoration"} />
        <div className='decorations-wrapper'>
            <NullButton active_background={accentColor} active={currentDecoration === "" || !currentDecoration} invert={true} action={() => {setDecoration("")}} width={45} height={45}  />
            {decorations.map(decoration => {
                return <ImageButton active_background={accentColor} active={currentDecoration === decoration} invert={true} action={() => {setDecoration(decoration)}} width={45} height={45} image={decoration} />
            })}
            <Loading loading={loadingDecorations} />
        </div>
        </>
    )
}
