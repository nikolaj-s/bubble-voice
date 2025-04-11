import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import { useDispatch, useSelector } from 'react-redux'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import { createCategory } from '../../../../features/Categories/Thunks/createCategory'

export const CreateCategoryForm = ({permissions}) => {

    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = React.useState("");

    const {loading} = useSelector(state => state.channelsSlice);

    const handleCreateCategory = () => {
        if (loading) return;

        dispatch(createCategory({categoryName}));
    }

    return (
    <NotAuthorized permission={permissions?.user_can_manage_channels}>
        <LoadingErrorFormWrapper sliceName='channelsSlice'>
            <Header text='Create A Category' />
            <Label label='Category Name' />
            <TextInput placeholder={"Enter Category Name"} onChange={setCategoryName} value={categoryName} />
            <TextButton action={handleCreateCategory} disabled={categoryName.length < 3} title='Create' />
        </LoadingErrorFormWrapper>
    </NotAuthorized>
    )
}
