import React from 'react'
import { AbsoluteContentWrapper } from '../ui/Wrappers/AbsoluteContentWrapper/AbsoluteContentWrapper'
import { Card } from '../ui/Wrappers/Card/Card'
import Header from '../ui/Titles/Header/Header'
import { AlertCircle } from 'lucide-react'
import { Description } from '../ui/Description/Description'
import { Text } from '../ui/Text/Text'
import TextButton from '../ui/Buttons/TextButton/TextButton'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export const SensitiveContentWarning = ({close, channelID}) => {

    const navigate = useNavigate();

    const [showWarning, toggleShowWarning] = React.useState(false);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const { disable_sensitive_content_warning } = useSelector(state => state.accountPreferencesSlice);
    

    React.useEffect(() => {

        if (disable_sensitive_content_warning) return toggleShowWarning(false);

        const interactedBefore = sessionStorage.getItem(`sensitive_warn_for_${channelID}`);

        if (!interactedBefore) toggleShowWarning(true);

    }, [channelID, disable_sensitive_content_warning])

    const proceed = () => {
        sessionStorage.setItem(`sensitive_warn_for_${channelID}`, true);

        toggleShowWarning(false);
    }

    const goBack = () => {
        navigate(`/dashboard/server/${server_id}`);
    }

    if (showWarning) {
        return (
            <AbsoluteContentWrapper backgroundColor='var(--background-color)'>
                <Card style={{alignItems: 'center', maxWidth: 'calc(100% - 20px)', margin: '0 auto', textAlign: 'center', width: 500}} >
                    <AlertCircle color='var(--error-color)' size={60} />
                    <Header textAlign='center' text='Sensitive Content Detected Within This Channel' />
                    <Text>This channel may contain sensitive or explicit content that some users might find disturbing or inappropriate. Viewer discretion is advised.</Text>
                    <Description description={'You can disable this warning at any time by going to Settings → Content → Sensitive Content.'} />
                    <TextButton title='Proceed' action={proceed} />
                    <TextButton title='Go Back' action={goBack} backgroundColor={'var(--error-color)'} />
                </Card>
            </AbsoluteContentWrapper>
        )
    }

    return null;
}
