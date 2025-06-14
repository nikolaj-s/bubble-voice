import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import { useSelector } from 'react-redux'
import Header from '../../../../components/ui/Titles/Header/Header'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import { useSearchParams } from 'react-router-dom'
import { SelectWidgetTypeForm } from './SelectWidgetTypeForm/SelectWidgetTypeForm'
import { AddSingleImageWidgetForm } from './AddSingIeImageWidgetForm/AddSingleImageWidgetForm'
import { AddGalleryWidgetForm } from './AddGalleryWidgetForm/AddGalleryWidgetForm'
import { AddEmbedWidgetForm } from './AddEmbedWidgetForm/AddEmbedWidgetForm'

import { AddRichTextWidget } from './AddRichTextWidget/AddRichTextWidget'
import { AddDynamicMediaGallery } from './AddDynamicMediaGalleryWidgetForm/AddDynamicMediaGallery'
import { AddMediaPlayerWidgetForm } from './AddMediaPlayerWidgetForm/AddMediaPlayerWidgetForm'
import { SubPageWrapper } from '../../../../components/ui/Wrappers/SubPageWrapper/SubPageWrapper'

export const AddWidgetForm = ({permissions}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const {channel_id} = useSelector(state => state.manageWidgetsSlice);

    const channel = useSelector(state => state.channelsSlice.channels[channel_id]);

    React.useEffect(() => {

        if (!channel) return setSearchParams({section: ""});

    // eslint-disable-next-line
    }, [channel])

    const content = {
        selectWidgetType: SelectWidgetTypeForm,
        "single_image": AddSingleImageWidgetForm,
        gallery: AddGalleryWidgetForm,
        embed: AddEmbedWidgetForm,
        "rich_text": AddRichTextWidget,
        "dynamic_media": AddDynamicMediaGallery,
        "media_player": AddMediaPlayerWidgetForm
    }

    const activeSection = content[searchParams.get('widget')] ? searchParams.get('widget') : 'selectWidgetType'

    if (!channel) return;

    return (
        <NotAuthorized permission={permissions.user_can_edit_channels}>
            <LoadingErrorFormWrapper sliceName='manageWidgetsSlice'>
                <Header text={`Add a Widget To ${channel.channel_name}`} />
                <LineSpacer />
                <SubPageWrapper page={activeSection}>
                    {React.createElement(content[activeSection], {channel})}
                </SubPageWrapper>
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
