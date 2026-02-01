
import { ScreenShare } from 'lucide-react';
import ContentHeader from '../../../components/Headers/ContentHeader/ContentHeader';
import ScreenPicker from '../../../components/ScreenPicker/ScreenPicker';
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import { MenuCloseHeader } from '../../../components/Headers/MenuCloseHeader/MenuCloseHeader';

export const ScreenPickerOverlay = ({close}) => {

    return (
        <div style={{backgroundColor: 'var(--primary-color)', display: 'grid', gridTemplateRows: '45px auto', borderRadius: 'var(--border-radius)', overflow: 'hidden'}}>
            <MenuCloseHeader title={'Choose A Stream'} onClose={close} />
                    <ScrollLoadWrapper>
                    <ContentHeader Icon={ScreenShare} title={"Start Streaming"} subTitle={'Choose a source below to begin streaming'} />
                    <ScreenPicker />
                    </ScrollLoadWrapper>
        </div>
    )
}
