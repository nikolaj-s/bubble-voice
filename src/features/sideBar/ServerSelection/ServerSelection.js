// library's
import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import { useNavigate, useRoutes } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';

// components
import { ServerSelectNavBar } from './serverSelectNavBar/ServerSelectNavBar'
import { ServerList } from './serverList/ServerList'
import { TextInput } from '../../../components/inputs/TextInput/TextInput';

// style's
import "./ServerSelection.css";
import { setServerId, setServerName, setTopPos } from '../../server/ServerSlice';
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice';
import { searchForServers, selectLoadingServerResultsState, selectLoadingUsersServersState, selectServerList, selectServerQuery, selectServerSearchResults, setServerQuery, setSideBarHeader } from '../sideBarSlice';
import { setServerToJoin } from '../../joinServer/joinServerSlice';
import { TextButton } from '../../../components/buttons/textButton/TextButton';

const Selection = () => {
    // localize tab switching to this component
    const [serverSearch, toggleServerSearch] = React.useState(false);

    const [serverSelect, toggleServerSelect] = React.useState(true);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // handle users server list
    const serverList = useSelector(selectServerList);

    const loadingUserServerListState= useSelector(selectLoadingUsersServersState);

    const selectServer = (_id, name, top_pos) => {
        
        dispatch(setServerId(_id))
        dispatch(setTopPos(top_pos))
        dispatch(setServerName(name))

        setTimeout(() => {

            navigate(`/dashboard/server/${name}`)
        
        }, 5)
            
    }
    // handle searching for a new server
    const serverSearchResults = useSelector(selectServerSearchResults);

    const loadingServerSearchResults = useSelector(selectLoadingServerResultsState);

    const serverSearchQuery = useSelector(selectServerQuery);

    const handleServerSearchInput = (value) => {
        dispatch(setServerQuery(value));
    }

    const search = (keyCode) => {
        if (keyCode === 13) {
            dispatch(searchForServers({value: serverSearchQuery}))
        }
    }

    React.useEffect(() => {
        dispatch(setHeaderTitle("Select Server"))
        dispatch(setSideBarHeader("Servers"))
    // eslint-disable-next-line   
    }, [])

    // handle switching between tabs 
    const toggleServerSearchTab = () => {
        if (serverSearch === false) {
            toggleServerSearch(true);
            toggleServerSelect(false)
        }
    }

    const toggleServerSelectTab = () => {
        if (serverSearch === true) {
            toggleServerSearch(false)
            toggleServerSelect(true)
        }
    }

    const selectServerToJoin = (server_id) => {
        const server = serverSearchResults.findIndex(server => server.server_id === server_id)

        if (server === -1) return;

        navigate(`/dashboard/join-server/${serverSearchResults[server].server_name}`)

        dispatch(setServerToJoin(serverSearchResults[server]));
    }

    return (
        <div className='side-bar-inner-container'>
            <ServerSelectNavBar toggle_1_state={serverSelect} toggle_2_state={serverSearch} toggle_1={toggleServerSelectTab} toggle_2={toggleServerSearchTab} />
                <AnimatePresence >
                    <div className='server-list-outer-wrapper'>
                        {serverSelect ?
                        <motion.div key={'server-select'} initial={{translateX: '-100%'}} animate={{translateX: '0%'}} exit={{translateX: "-100%"}} className='server-list-wrapper'>
                            <ServerList selectServer={selectServer} serverList={serverList} loading={loadingUserServerListState} />
                        </motion.div> : null}
                        {serverSearch ? 
                        <motion.div key={'server-list'} initial={{translateX: '100%'}} animate={{translateX: "0%"}} exit={{translateX: "100%"}} className='server-list-wrapper'>
                            <TextInput marginBottom='2%' keyCode={search} action={handleServerSearchInput} inputValue={serverSearchQuery}  marginTop='2%' placeholder={"Server Name"} />
                            {serverSearchQuery.length > 0 ? <TextButton action={() => {search(13)}} name={"Search"} /> : null}
                            <ServerList selectServer={selectServerToJoin} noresults='No Results' loading={loadingServerSearchResults} serverList={serverSearchResults}  />
                        </motion.div>
                        : null}
                    </div>
                </AnimatePresence>
        </div>
    )
}


export const ServerSelection = () => useRoutes([
    {path: "/", element: <Selection /> },
    {path: "/join-server/:id", element: <Selection /> },
    {path: "/createserver", element: <Selection /> }
])