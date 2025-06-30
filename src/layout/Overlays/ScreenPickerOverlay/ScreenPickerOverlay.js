
import { ScreenShare } from 'lucide-react';
import ContentHeader from '../../../components/Headers/ContentHeader/ContentHeader';
import ScreenPicker from '../../../components/ScreenPicker/ScreenPicker';

export const ScreenPickerOverlay = () => {

    return (
        <>
        <ContentHeader Icon={ScreenShare} title={"Start Streaming"} subTitle={'Choose a source below to begin streaming'} />
        <ScreenPicker />
        </>
    )
}
