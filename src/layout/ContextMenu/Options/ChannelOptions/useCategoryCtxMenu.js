import { FolderPen } from 'lucide-react';
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedCategory } from '../../../../features/Categories/categoriesSlice';
import { useSearchParams } from 'react-router-dom';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';

export const useCategoryCtxMenu = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    const dispatch = useDispatch();

    const getCategoryOptions = useCallback((options, data, permissions) => {
        if (permissions.user_can_manage_categories) {
            options.push({
                label: "Edit Category",
                icon: <FolderPen color='var(--text-color)' />,
                onClick: () => {

                    dispatch(setSelectedCategory(data.category));

                    setSearchParams({section: "editCategory"});

                    dispatch(setOverlay("serverSettings"));

                },
                type: "button"
            })
        }
    }, [dispatch, setSearchParams])
  
    return {getCategoryOptions}
}
