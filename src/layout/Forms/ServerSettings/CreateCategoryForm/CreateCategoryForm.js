import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import { useDispatch, useSelector } from 'react-redux'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import { createCategory } from '../../../../features/Categories/Thunks/createCategory'
import { ApplyChangesPopup } from '../../../../components/ApplyChangesPopup/ApplyChangesPopup'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { Description } from '../../../../components/ui/Description/Description'

export const CreateCategoryForm = ({permissions}) => {

    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = React.useState("");

    const [autoSort, toggleAutoSort] = React.useState(false);

    const {loading} = useSelector(state => state.channelsSlice);

    const handleCreateCategory = () => {
        if (loading) return;

        dispatch(createCategory({categoryName, autoSort}));
    }

    return (
    <NotAuthorized permission={permissions?.user_can_manage_channels}>
        <LoadingErrorFormWrapper sliceName='channelsSlice'>
            <Header text='Create Category' />
            <Label label='Category Name' />
            <TextInput placeholder={"Enter Category Name"} onChange={setCategoryName} value={categoryName} />
            <Label label='Enable Auto Sort' />
            <Description description={"Flip the switch and your channels snap into A→Z order—just remember, any custom placements will be wiped clean!"} />
            <ToggleSwitch initialState={autoSort} onToggle={() => {toggleAutoSort(!autoSort)}} />
            <ApplyChangesPopup onApply={handleCreateCategory} disabled={categoryName.trim().length < 3} name='Create' onClearChanges={() => {setCategoryName(""); toggleAutoSort(false)}} />

        </LoadingErrorFormWrapper>
    </NotAuthorized>
    )
}
