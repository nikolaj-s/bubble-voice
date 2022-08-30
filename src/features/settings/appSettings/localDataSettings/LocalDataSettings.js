// library's
import React from 'react'
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router';

// components
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';

// state
import { clearLocalData } from '../../../../util/LocalData';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';

const Settings = () => {

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(false);

    React.useEffect(() => {

        dispatch(setHeaderTitle("Local Data Settings"))

    }, [])

    const handleClearLocalData = () => {

        toggleLoading(true);

        clearLocalData();

        setTimeout(() => {
            toggleLoading(false);
        }, 200)
    }

    return (
        <div className='settings-wrapper'>
            <InputTitle title={"Clear Local Data"} />
            <TextButton action={handleClearLocalData} name={"Clear Data"} />
            <Loading loading={loading} />
        </div>
    )
}

export const LocalDataSettings = () => useRoutes([
    { path: 'local-data', element: <Settings /> }
])