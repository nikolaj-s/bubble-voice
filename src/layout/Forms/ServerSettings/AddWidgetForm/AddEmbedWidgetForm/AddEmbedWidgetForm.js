import React from 'react'
import Label from '../../../../../components/ui/Titles/Label/Label'
import TextInput from '../../../../../components/ui/Inputs/TextInput/TextInput'
import { EmbedPlaceholder } from '../../../../../components/ui/Placeholders/EmbedPlaceholder/EmbedPlaceholder';
import { Embed } from '../../../../../components/ui/Embed/Embed';
import { ApplyChangesPopup } from '../../../../../components/ApplyChangesPopup/ApplyChangesPopup';
import { generateEmbedUrl } from '../../../../../lib/services/generateEmbedUrl';
import LinkComponent from '../../../../../components/LinkComponent/LinkComponent';
import { useDispatch } from 'react-redux';
import { createWidget } from '../../../../../features/Widgets/Thunks/createWidget';
import { useSearchParams } from 'react-router-dom';
import { DirectionsTooltip } from '../../../../../components/ui/DirectionsTooltip/DirectionsTooltip';

export const AddEmbedWidgetForm = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const [embed, setEmbed] = React.useState('');

    const [text, setText] = React.useState('');

    React.useEffect(() => {

        if (text.startsWith('https://')) {

            setEmbed(generateEmbedUrl(text));

        } else {
            setEmbed('');
        }

    }, [text])

    const handleCreateWidget = () => {
        if (!embed.startsWith('https://')) return;

        dispatch(createWidget({embed, type: 'embed'}));

        setSearchParams({section: 'manageWidgets'});
    }

    const clearEmbed = () => {
        setText("");
    }

    return (
        <>
        <Label label='Embed Preview:' />
        {embed?.startsWith('https://') ?
        <>
        <LinkComponent link={embed} />
        <Embed height={350} url={embed} />
        </>
        :
        <EmbedPlaceholder />
        }
        <DirectionsTooltip message='Drop a link here and we’ll work our magic to turn it into a shiny rich embed!' />
        <Label label='Enter a URL:' />
        <TextInput value={text} onChange={setText} placeholder={'url...'} />
        <ApplyChangesPopup onClearChanges={clearEmbed} onApply={handleCreateWidget} name='Create Embed Widget' disabled={!embed.startsWith('https://')} />
        </>
    )
}
