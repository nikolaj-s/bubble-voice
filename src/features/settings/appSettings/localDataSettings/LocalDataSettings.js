// library's
import React from 'react'
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { clearLocalData } from '../../../../util/LocalData';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';

const Settings = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {

        dispatch(setHeaderTitle("Local Data Settings"))

    }, [])

    const handleClearLocalData = () => {
        clearLocalData();
    }

    return (
        <div className='settings-wrapper'>
            <InputTitle title={"Clear Local Data"} />
            <TextButton action={clearLocalData} name={"Clear Data"} />
        </div>
    )
}

export const LocalDataSettings = () => useRoutes([
    { path: 'local-data', element: <Settings /> }
])