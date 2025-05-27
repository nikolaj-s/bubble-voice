
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper';

import ScreenPicker from '../../../components/ScreenPicker/ScreenPicker';

export const ScreenPickerOverlay = ({close}) => {

    return (
        <FullScreenWrapper onClose={close}>
            <ScreenPicker />
        </FullScreenWrapper>
    )
}
