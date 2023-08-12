import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchScreenShots, selectLoadingScreenShots, selectScreenShots } from '../../ServerDashBoardSlice'
import { Loading } from '../../../../../../components/LoadingComponents/Loading/Loading';
import { NoMedia } from '../../../../../../components/NoMedia/NoMedia';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Image } from '../../../../../../components/Image/Image';
import { SharedScreenShot } from './SharedScreenShot/SharedScreenShot';

export const ScreenShots = () => {

    const dispatch = useDispatch();

    const screenShots = useSelector(selectScreenShots);

    const loadingScreenShots = useSelector(selectLoadingScreenShots);

    React.useEffect(() => {

        if (screenShots.length > 18 || screenShots[screenShots.length - 1]?.no_more) return;

        dispatch(FetchScreenShots());

    }, [screenShots])

    return (
        <div  style={{height: 'calc(100%)'}} >
        {!loadingScreenShots && screenShots.length < 2 ?
        <NoMedia alt={true} message="No Screen Shots Have Been Shared" />
        :
        screenShots.map(data => {
            return <SharedScreenShot key={data._id} data={data} />
        })
        }
        <Loading loading={loadingScreenShots} />
        </div>
    )
}
