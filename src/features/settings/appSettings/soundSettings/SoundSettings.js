// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router';
import { Range } from '../../../../components/inputs/Range/Range';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectSoundEffectVolume, setSoundEffectsVolume } from '../../soundEffects/soundEffectsSlice';

const Settings = () => {

    const dispatch = useDispatch();

    const soundLevel = useSelector(selectSoundEffectVolume);

    React.useEffect(() => {
        dispatch(setHeaderTitle("Sound Settings"))
    }, [])
    
    const handleSoundLevelChange = (value) => {
        dispatch(setSoundEffectsVolume(value));
    }

    return (
        <div className='settings-wrapper'>
            <InputTitle title={"Sound Effects Volume"} />
            <Range action={handleSoundLevelChange} value={soundLevel}  />
        </div>
    )
}

export const SoundSettings = () => useRoutes([
    { path: 'sound-settings', element: <Settings />}
])