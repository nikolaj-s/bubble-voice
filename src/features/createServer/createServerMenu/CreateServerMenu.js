// library's
import React from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useRoutes } from 'react-router';

// component's
import { InputTitle } from '../../../components/titles/inputTitle/InputTitle';
import { TextInput } from '../../../components/inputs/TextInput/TextInput';
import { ImageInput } from '../../../components/inputs/ImageInput/ImageInput';
import { ApplyCancelButton } from '../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { Error } from "../../../components/Error/Error";
import { Loading} from "../../../components/LoadingComponents/Loading/Loading";

// state
import { selectSecondaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice';
import { clearCreateServerState, closeCreateServerError, createServerFunction, selectCreateConfirmServerPassword, selectCreateServerErrorMessage, selectCreateServerErrorState, selectCreateServerLoadingState, selectCreateServerName, selectCreateServerPassword, setCreateServerState } from '../createServerSlice';

// style's
import "./CreateServerMenu.css";

export const Menu = () => {

    const [image, setImage] = React.useState({})

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const animation = useAnimation();

    const secondaryColor = useSelector(selectSecondaryColor);

    const serverName = useSelector(selectCreateServerName);

    const serverPassword = useSelector(selectCreateServerPassword);

    const confirmServerPassword = useSelector(selectCreateConfirmServerPassword);

    const loading = useSelector(selectCreateServerLoadingState);

    const error = useSelector(selectCreateServerErrorState);

    const errorMessage = useSelector(selectCreateServerErrorMessage);

    // handle input
    const setServerBanner = (file) => {
        setImage(file)
    }

    const handleInput = (value, state) => {
        dispatch(setCreateServerState({value: value, state: state}));
    }

    const handleApplyButton = () => {
        dispatch(createServerFunction(image))
    }

    const closeError = () => {
        dispatch(closeCreateServerError())
    }

    const closeCreateServerMenu = () => {
        animation.start({
            left: "100%"
        }).then(() => {
            navigate("/dashboard")
        })
    }

    React.useEffect(() => {

        dispatch(setHeaderTitle("Create Server"))

        animation.start({
            left: "0%"
        })

        return () => {
            setImage({});
            dispatch(clearCreateServerState());
            dispatch(setHeaderTitle("Select Server"));
        }
    // eslint-disable-next-line
    }, [])

    return (
        <motion.div
        style={{
            backgroundColor: secondaryColor
        }}
        initial={{left: '100%'}}
        animate={animation}
        className='create-server-menu-container'>
            <div className='inner-create-server-menu-container'>
                <InputTitle title={"Server Name"} />
                <TextInput inputValue={serverName} action={handleInput} stateSelector={"serverName"} placeholder={"Name"} />
                <InputTitle title={"Server Banner"} />
                <div className='create-server-banner-container'>
                    <ImageInput getFile={setServerBanner} center={true} />
                </div>
                <InputTitle title={"Enter Server Password"} />
                <TextInput inputValue={serverPassword} action={handleInput} stateSelector={"serverPassword"} marginBottom='2%' type='password' placeholder={"Password"} />
                <TextInput inputValue={confirmServerPassword} action={handleInput} stateSelector={"confirmServerPassword"} type='password' placeholder={'Confirm Password'} />
                <ApplyCancelButton apply={handleApplyButton} cancel={closeCreateServerMenu} name={"Create"} />
            </div>
            <AnimatePresence>
                {error ? <Error action={closeError} errorMessage={errorMessage} buttonLabel={"Ok"} /> : null}
                <Loading loading={loading} error={error} />
            </AnimatePresence>
        </motion.div> 
    )
}

export const CreateServerMenu = () => useRoutes([
    {path: "/createserver", element: <Menu /> }
])
