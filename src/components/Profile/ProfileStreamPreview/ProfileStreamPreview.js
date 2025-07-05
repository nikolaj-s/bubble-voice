
import MiniStreamIndicator from '../../ui/MiniStreamIndicator/MiniStreamIndicator';
import { Card } from '../../ui/Wrappers/Card/Card';
import { Subtitle } from '../../ui/Titles/Subtitle/Subtitle';

export const ProfileStreamPreview = ({channel_status}) => {

    if (!channel_status?.streamDetails) return null;

    return (
        <Card style={{margin: '0 5px', width: 'calc(100% - 10px)'}}>
            <Subtitle>is streaming:</Subtitle>
            <MiniStreamIndicator streamColor={channel_status?.streamColor} thumbnail={channel_status?.streamPreview} name={channel_status?.streamDetails?.name} />
        </Card>
    )
}
