import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import { updateCategory } from '../../../../features/Categories/Thunks/updateCategory'
import { deleteCategory } from '../../../../features/Categories/Thunks/deleteCategory'
import ConfirmationPopup from '../../../../components/ui/Menus/ConfirmationPopup/ConfirmationPopup'

export const EditCategoryForm = ({permissions}) => {

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const [categoryName, setCategoryName] = React.useState("");

    const [confirmDelete, toggleConfirmDelete] = React.useState(false);

    const categoryToEdit = useSelector(state => state.categoriesSlice.selectedCategory);

    const {loading} = useSelector(state => state.categoriesSlice);

    React.useEffect(() => {

        if (!categoryToEdit) return setSearchParams({section: null});

        setCategoryName(categoryToEdit?.category_name);

    }, [categoryToEdit, setSearchParams])

    const handleUpdateCategory = () => {

        if (loading) return;
        
        if (categoryName.trim().length < 3) return;

        dispatch(updateCategory({category_name: categoryName, category_id: categoryToEdit.category_id}));

    }

    const handleConfirmDeleteCategory = () => {
        toggleConfirmDelete(true);
    }

    const handleDeleteCategory = () => {

        toggleConfirmDelete(false);

        if (loading) return;

        dispatch(deleteCategory({category: categoryToEdit}));
    }

    return (
        <NotAuthorized permission={permissions.user_can_manage_categories}>
            <LoadingErrorFormWrapper sliceName='categoriesSlice'>
                <Header text='Manage Category' />
                <Label label='Edit Category Name:' />
                <TextInput error={categoryName?.trim()?.length < 3 && "Category name cannot be less than 3 characters long"} value={categoryName} onChange={setCategoryName}  />
                <TextButton title='Apply Changes' action={handleUpdateCategory} disabled={categoryName.trim().length < 3 || categoryName === categoryToEdit?.category_name}  />
                <Label label='Delete Category:' />
                <TextButton maxWidth={100} backgroundColor={'var(--error-color)'} action={handleConfirmDeleteCategory} title='Delete' /> 
                {confirmDelete && (<ConfirmationPopup 
                onCancel={() => {toggleConfirmDelete(false)}} 
                onConfirm={handleDeleteCategory}
                message={`Are you sure you want to delete the category ${categoryToEdit.category_name}`}
                />)}
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
