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
import { ApplyChangesPopup } from '../../../../components/ApplyChangesPopup/ApplyChangesPopup'
import ConfirmationPopup from '../../../../components/ui/Menus/ConfirmationPopup/ConfirmationPopup'
import { Trash2 } from 'lucide-react'
import { deleteServerRecommendations } from '../../../../features/ServerSettings/Thunks/deleteServerRecommendations'

export const ContentDataForm = ({permissions}) => {

    const dispatch = useDispatch();

    const { settings, loading } = useSelector(state => state.serverSettingsSlice);

    const [newSettings, setNewSettings] = React.useState({});

    const [changeMade, setChangeMade] = React.useState(false);

    const [initLoading, toggleInitLoading] = React.useState(true);

    const [confirmDelete, toggleConfirmDelete] = React.useState(false);

    const [confirmationDataDeleted, toggleConfirmationDataDeleted] = React.useState(false);

    // Fetch settings if user has permission
    React.useEffect(() => {

        if (!permissions?.user_can_manage_data_settings) return;
      
        const timeout = setTimeout(() => {

          dispatch(fetchServerSettings());

        }, 300); // debounce time in ms
      
        return () => clearTimeout(timeout);

    }, [dispatch, permissions]);
      

    // Set newSettings on settings load
    React.useEffect(() => {
        
        if (settings?.server_id) {
            
            setNewSettings(settings);

            toggleInitLoading(false);

        }

        
    }, [settings, loading]);

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

    const handleDeleteRecommendationData = () => {
        toggleConfirmDelete(false);

        if (confirmationDataDeleted) return;

        toggleConfirmationDataDeleted(true);

        dispatch(deleteServerRecommendations());

    }

    return (
        <NotAuthorized permission={permissions?.user_can_manage_data_settings}>
            <LoadingErrorFormWrapper sliceName='serverSettingsSlice' initialLoading={initLoading} >
                <Header text='Content & Data' />
                <LineSpacer />
                <Header level={4} text='Recommendation Data' />
                <Label label='Disable sensitive content filter for recommendations' />
                <ToggleSwitch initialState={newSettings.disable_content_filter_for_recommendations} onToggle={(state) => {handleSettingChange('disable_content_filter_for_recommendations', state)}} />
                <LineSpacer />
                <Header level={4} text='Content' />
                <Label label='Block the ability of directly posting sensitive content within text channels from search' />
                <ToggleSwitch initialState={newSettings.content_filtering_for_text_channels} onToggle={(state) => {handleSettingChange('content_filtering_for_text_channels', state)}} />
                <LineSpacer />
                <Label label='Clear Recommendation Data' />
                <TextButton title='Delete' maxWidth={200} backgroundColor={'var(--error-color)'} action={() => {toggleConfirmDelete(true)}} icon={<Trash2 color='var(--text-color)' />} />
                <ApplyChangesPopup disabled={!changeMade} onApply={handleApplyChanges} />
                {confirmDelete && (<ConfirmationPopup 
                message={'Are you sure you want to delete recommendations data'} 
                onCancel={() => {toggleConfirmDelete(false)}}
                onConfirm={handleDeleteRecommendationData}
                />)}
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
