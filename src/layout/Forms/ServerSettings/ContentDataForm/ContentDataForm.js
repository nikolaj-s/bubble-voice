import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import Header from '../../../../components/ui/Titles/Header/Header'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import Label from '../../../../components/ui/Titles/Label/Label'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServerSettings } from '../../../../features/ServerSettings/Thunks/fetchServerSettings'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import { updateServerSettings } from '../../../../features/ServerSettings/Thunks/updateServerSettings'
import { toggleLoadingServerSettings } from '../../../../features/ServerSettings/serverSettingsSlice'

export const ContentDataForm = ({permissions}) => {

    const dispatch = useDispatch();

    const { settings, loading } = useSelector(state => state.serverSettingsSlice);

    const [newSettings, setNewSettings] = React.useState({});

    const [changeMade, setChangeMade] = React.useState(false);



    // Fetch settings if user has permission
    React.useEffect(() => {

        if (!permissions?.user_can_manage_data_settings) return;

        dispatch(toggleLoadingServerSettings(true));
      
        const timeout = setTimeout(() => {

          dispatch(fetchServerSettings());

        }, 300); // debounce time in ms
      
        return () => clearTimeout(timeout);

    }, [dispatch, permissions]);
      

    // Set newSettings on settings load
    React.useEffect(() => {
        console.log(settings)
        if (settings) {
            setNewSettings(settings);
        }
    }, [settings]);

    // Detect if newSettings differ from original settings
    React.useEffect(() => {

        const hasChanged = JSON.stringify(settings) !== JSON.stringify(newSettings);

        setChangeMade(hasChanged);

    }, [newSettings, settings]);

    const handleSettingChange = (key, value) => {
        setNewSettings(prev => ({
        ...prev,
        [key]: value,
        }));
    };

    const handleApplyChanges = () => {
        if (loading) return;

        dispatch(updateServerSettings(newSettings));

    }

    return (
        <NotAuthorized permission={permissions?.user_can_manage_data_settings}>
            <LoadingErrorFormWrapper sliceName='serverSettingsSlice'>
                <Header text='Content & Data' />
                <LineSpacer />
                <Header level={4} text='Recommendation Data' />
                <Label label='Disable sensitive content filter for recommendations' />
                <ToggleSwitch initialState={newSettings.disable_content_filter_for_recommendations} onToggle={(state) => {handleSettingChange('disable_content_filter_for_recommendations', state)}} />
                <LineSpacer />
                <Header level={4} text='Content' />
                <Label label='Block the ability of directly posting sensitive content within text channels from search' />
                <ToggleSwitch initialState={newSettings.content_filtering_for_text_channels} onToggle={(state) => {handleSettingChange('content_filtering_for_text_channels', state)}} />
                <TextButton disabled={!changeMade} action={handleApplyChanges} title='Apply Changes' />
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
