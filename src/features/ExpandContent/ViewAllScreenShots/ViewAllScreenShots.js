import React from 'react';

import "./ViewAllScreenShots.css";
import { useSelector } from 'react-redux';
import { selectServerId } from '../../server/ServerSlice';
import { FetchMemberDetails } from '../../../util/FetchMemberDetails';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Loading } from '../../../components/LoadingComponents/Loading/Loading';
import { selectPrimaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ViewAllScreenShots = ({username}) => {

    const [screenShots, setScreenShots] = React.useState([]);

    const [displayName, setDisplayName] = React.useState("");

    const [loading, toggleLoading] = React.useState(true);

    const server_id = useSelector(selectServerId);

    const color = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const fetchScreenShots = async () => {
        
        toggleLoading(true);

        await FetchMemberDetails(username, server_id, true).then(res => {
            
            if (res.display_name) setDisplayName(res.display_name);

            if (res.screenShots) setScreenShots(res.screenShots);
        
            toggleLoading(false);

            return;
        })
    }

    React.useEffect(() => {

        if (username) {
            fetchScreenShots();
        }

    }, [])

    return (


        <div 
        style={{backgroundColor: primaryColor}}
        className='screen-shots-expanded-container'>
            
            {loading ?
            null
            :
            <>
            <div
            style={{backgroundColor: primaryColor}}
            className='user-banner-title-screenshot-container'>
                <h3 style={{color: color}}>{displayName}'s Screenshots</h3>
            </div>
            <ResponsiveMasonry
            style={{
                width: 'calc(100% - 20px)',
                border: `10px solid ${primaryColor}`,
                borderTop: 'none'
            }}
            columnsCountBreakPoints={{800: 1, 1000: 2}} >
                <Masonry gutter='5px'>
                    {screenShots.map(screenshot => {
                        return <img alt='screenshot' src={screenshot?.content?.image} />
                    })}
                </Masonry>
            </ResponsiveMasonry>
            </>
            }
            <Loading loading={loading} />
        </div>
    )
}
