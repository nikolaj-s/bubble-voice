import { createSlice } from "@reduxjs/toolkit";
import { createCategory } from "./Thunks/createCategory";
import { updateCategory } from "./Thunks/updateCategory";
import { deleteCategory } from "./Thunks/deleteCategory";

const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState: {
        loading: false,
        error: false,
        selectedCategory: false,
        categories: []
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        addCategory: (state, action) => {
            const existingCategory = state.categories.find(category => category.category_id === action.payload.category_id);
            if (!existingCategory) {
                state.categories.push(action.payload);
            }
        },
        removeCategory: (state, action) => {
            if (action.payload.category_id) {
                state.categories = state.categories.filter(category => category.category_id !== action.payload.category_id)
            }
        },
        setCategories: (state, action) => {
            state.categories = Array.isArray(action.payload) ? action.payload : [];
        },
        reorderCategories: (state, action) => {
            const sortOrder = action.payload.newOrder;
    
            state.categories = state.categories.sort((a, b) => {
                return sortOrder.indexOf(a.category_id) - sortOrder.indexOf(b.category_id);
            })
            
        },
        updateCategoryDetails: (state, action) => {
            if (action.payload.category_id) {
                state.categories = state.categories.map(category => {
                    if (category.category_id === action.payload.category_id) {
                        return {...category, ...action.payload}
                    } else {
                        return category;
                    }
                })
            }
        }
    },
    extraReducers: (builder) => {

        // create
        builder.addCase(createCategory.pending, (state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(createCategory.fulfilled, (state) => {
            state.error = false;
            state.loading = false;
        })

        // update
        builder.addCase(updateCategory.pending, (state) => {
            state.error = false;
            state.loading = false;
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.selectedCategory = action.payload;
        })

        // delete
        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(deleteCategory.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
            state.selectedCategory = false;
        })
    }
    
})

export const {
    setSelectedCategory,
    addCategory,
    setCategories,
    reorderCategories,
    updateCategoryDetails,
    removeCategory
} = categoriesSlice.actions;

export default categoriesSlice.reducer;