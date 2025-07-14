
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { MessageSquare, Pencil, Pointer } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { ToolBar } from '../../ui/Wrappers/ToolBar/ToolBar';
import { pokeUser } from '../../../features/Social/Thunks/pokeUser';

export const ProfileActionBar = ({profile}) => {

    const [,setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    
    const {_id: userID} = useSelector(state => state.accountSlice.account);

    const {loading} = useSelector(state => state.socialSlice);
    
    const handleOpenEditAccount = () => {
        setSearchParams({});

        dispatch(setOverlay('settings'));
    }

    const handlePokeUser = () => {

        if (loading) return;

        dispatch(pokeUser(profile._id));
    }

    return (
        <ToolBar style={{width: 'calc(100% - 20px)', margin: '0 5px', maxWidth: 'calc(100% - 20px)'}}>
            {profile._id === userID ?
            <>
            <IconButton 
            Icon={Pencil}
            title={'Edit Account'}
            onClick={handleOpenEditAccount}
            />
            </>
            :
            <>
            <IconButton 
            Icon={MessageSquare}
            title={`Message ${profile?.display_name}`}
            onClick={() => {}}
            />
            <IconButton
            disabled={loading}
            Icon={Pointer}
            title={`Poke ${profile?.display_name}`}
            onClick={() => {handlePokeUser()}}
            />
            </>
            }
        </ToolBar>
    )
}
