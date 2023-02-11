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
import { AltSearchButton } from '../../../components/buttons/AltSearchButton/AltSearchButton';

// state
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice';
import { clearCreateServerState, closeCreateServerError, createServerFunction, selectCreateConfirmServerPassword, selectCreateServerErrorMessage, selectCreateServerErrorState, selectCreateServerLoadingState, selectCreateServerName, selectCreateServerPassword, setCreateServerState } from '../createServerSlice';

// style's
import "./CreateServerMenu.css";
import { searchForServers, selectLoadingServerResultsState, selectServerQuery, selectServerSearchResults, setServerQuery } from '../../sideBar/sideBarSlice';
import { ServerList } from '../../sideBar/ServerSelection/serverList/ServerList';
import { setServerToJoin } from '../../joinServer/joinServerSlice';

export const Menu = () => {

    const [image, setImage] = React.useState({});

    const [page, setPage] = React.useState('join')

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const animation = useAnimation();

    const serverResults = useSelector(selectServerSearchResults);

    const serverSearchQuery = useSelector(selectServerQuery);

    const loadingResults = useSelector(selectLoadingServerResultsState);

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

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
        
        navigate("/dashboard")
        
    }

    const navigatePage = (page) => {
        setPage(page)
    }

    const handleServerSearchInput = (value) => {
        dispatch(setServerQuery(value));
    }

    const search = () => {
        if (serverSearchQuery.length === 0) return;

        dispatch(searchForServers({value: serverSearchQuery}));
    }

    React.useEffect(() => {
        if (page === 'join') {
            document.getElementById('search-for-server-input').focus();
        } else {
            document.getElementById('new-server-name-input').focus();
        }
    }, [page])

    React.useEffect(() => {

        dispatch(setHeaderTitle("Add Server"))

        animation.start({
            opacity: 1
        })

        return () => {
            setImage({});
            dispatch(clearCreateServerState());
            dispatch(setHeaderTitle("Select Server"));
        }
    // eslint-disable-next-line
    }, [])

    const selectServerToJoin = (server_id) => {
        const server = serverResults.findIndex(server => server.server_id === server_id)

        if (server === -1) return;

        navigate(`/dashboard/join-server/${serverResults[server].server_name}`)

        dispatch(setServerToJoin(serverResults[server]));
    }



    return (
        <motion.div
        style={{
            backgroundColor: secondaryColor
        }}
        initial={{opacity: 0}}
        animate={animation}
        className='create-server-menu-container'>
            <div 
            style={{backgroundColor: primaryColor, border: `solid 3px ${primaryColor}`}}
            className='add-server-nav-container'>
                <h3 onClick={() => {navigatePage("join")}} style={{color: textColor, backgroundColor: page === 'join' ? secondaryColor : primaryColor}}>Join Server</h3>
                <h3 onClick={() => {navigatePage("create")}} style={{color: textColor, backgroundColor: page === 'create' ? secondaryColor : primaryColor}} >Create Server</h3>
                <div style={{height: '100%',width: '100%', backgroundColor: secondaryColor}} />
                <div onClick={closeCreateServerMenu} style={{backgroundColor: secondaryColor}} className='close-add-server-screen'>
                    <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z" fill={textColor}/>
                    </svg>
                </div>
            </div>
            <AnimatePresence>

                {page === 'join' ?
                <div className='inner-create-server-menu-container'>
                    <div className='search-server-input-wrapper'>
                        <TextInput id={"search-for-server-input"} keyCode={(key) => {if (key === 13) search()}} action={handleServerSearchInput} inputValue={serverSearchQuery} marginTop='10px' placeholder={"Server Name"} />
                        <div className='server-search-button-container'>
                            <AltSearchButton action={search} borderRadius={0} invert={false} height={28} width={32} />
                        </div>
                    </div>
                    <ServerList selectServer={selectServerToJoin} noresults='No Results' serverList={serverResults} />
                </div>
                :
                <div className='inner-create-server-menu-container'>
                    <InputTitle title={"Server Name"} />
                    <TextInput id={"new-server-name-input"} inputValue={serverName} action={handleInput} stateSelector={"serverName"} placeholder={"Name"} />
                    <InputTitle title={"Server Banner"} />
                    <div className='create-server-banner-container'>
                        <ImageInput getFile={setServerBanner} center={true} />
                    </div>
                    <InputTitle title={"Enter Server Password"} />
                    <TextInput inputValue={serverPassword} action={handleInput} stateSelector={"serverPassword"} marginBottom='2%' type='password' placeholder={"Password"} />
                    <TextInput inputValue={confirmServerPassword} action={handleInput} stateSelector={"confirmServerPassword"} type='password' placeholder={'Confirm Password'} />
                    <ApplyCancelButton apply={handleApplyButton} cancel={closeCreateServerMenu} name={"Create"} />
                </div>
                }
            
            {error ? <Error action={closeError} errorMessage={errorMessage} buttonLabel={"Ok"} /> : null}
            <Loading loading={loading || loadingResults} error={error} />
            </AnimatePresence>
        </motion.div> 
    )
}

export const CreateServerMenu = () => useRoutes([
    {path: "/createserver", element: <Menu /> }
])
