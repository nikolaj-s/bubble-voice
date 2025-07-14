
import { ScreenShare } from 'lucide-react';
import ContentHeader from '../../../components/Headers/ContentHeader/ContentHeader';
import ScreenPicker from '../../../components/ScreenPicker/ScreenPicker';
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';

export const ScreenPickerOverlay = () => {

    return (
        <ScrollLoadWrapper>
        <ContentHeader Icon={ScreenShare} title={"Start Streaming"} subTitle={'Choose a source below to begin streaming'} />
        <ScreenPicker />
        </ScrollLoadWrapper>
    )
}
