import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import Header from '../../../../components/ui/Titles/Header/Header'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import Label from '../../../../components/ui/Titles/Label/Label'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'

export const ContentDataForm = ({permissions}) => {

    const [disableRecommendationFilter, toggleDisableRecommendationFilter] = React.useState(false);

    return (
        <NotAuthorized permission={permissions?.user_can_manage_data_settings}>
            <LoadingErrorFormWrapper sliceName='serverContentDataSettingsSlice'>
                <Header text='Content & Data' />
                <LineSpacer />
                <Header level={4} text='Recommendation Data' />
                <Label label='Disable sensitive content filter for recommendations' />
                <ToggleSwitch initialState={disableRecommendationFilter} onToggle={toggleDisableRecommendationFilter} />
                
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
