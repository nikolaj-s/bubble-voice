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
import { AnimatePresence, motion } from 'framer-motion'
import { AddRichTextWidget } from './AddRichTextWidget/AddRichTextWidget'
import { AddDynamicMediaGallery } from './AddDynamicMediaGalleryWidgetForm/AddDynamicMediaGallery'
import { AddMediaPlayerWidgetForm } from './AddMediaPlayerWidgetForm/AddMediaPlayerWidgetForm'

export const AddWidgetForm = ({permissions}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const {channel_id} = useSelector(state => state.manageWidgetsSlice);

    const channel = useSelector(state => state.channelsSlice.channels.find(c => c.channel_id === channel_id));

    const [options, setOptions] = React.useState([]);

    React.useEffect(() => {

        if (!channel) return setSearchParams({section: ""});

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
                <AnimatePresence mode='wait'>
                    <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 10
                    }}
                    >
                        {React.createElement(content[activeSection], {channel})}
                    </motion.div>
                </AnimatePresence>
                
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
