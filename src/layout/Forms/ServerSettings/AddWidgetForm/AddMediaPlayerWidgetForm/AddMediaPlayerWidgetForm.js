import React from 'react'
import Label from '../../../../../components/ui/Titles/Label/Label'
import TextButton from '../../../../../components/ui/Buttons/TextButton/TextButton'
import MediaPlayerPlaceholder from '../../../../../components/ui/Placeholders/MediaPlayerPlaceholder/MediaPlayerPlaceholder'
import { Plus } from 'lucide-react'
import { LineSpacer } from '../../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { createWidget } from '../../../../../features/Widgets/Thunks/createWidget'
import { Description } from '../../../../../components/ui/Description/Description'

export const AddMediaPlayerWidgetForm = () => {

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const handleAddMediaPlayerWidget = () => {
        dispatch(createWidget({type: 'media_player'}));

        setSearchParams({section: "manageWidgets"});
    }

    return (
        <>
        <Label label='Add Media Player' />
        <Description description="The Media Player Widget lets you and your fellow channel dwellers watch videos together in perfect sync — whether it's a music drop, meme binge, or late-night documentary dive. Press play, sit back, and vibe out as a group. It's like a virtual couch, minus the popcorn crumbs." />
        <MediaPlayerPlaceholder />
        <LineSpacer />
        <TextButton action={handleAddMediaPlayerWidget} title='Add To Channel' maxWidth={180} icon={<Plus color='var(--text-color)' />} />
        </>
    )
}
