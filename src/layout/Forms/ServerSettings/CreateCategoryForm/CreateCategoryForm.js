import React from 'react'
import Header from '../../../../components/Titles/Header/Header'
import Label from '../../../../components/Titles/Label/Label'
import TextInput from '../../../../components/Inputs/TextInput/TextInput'
import TextButton from '../../../../components/Buttons/TextButton/TextButton'

export const CreateCategoryForm = ({permissons}) => {

    const [categoryName, setCategoryName] = React.useState("");

    return (
       <>
       <Header text='Create A Category' />
       <Label label='Category Name' />
       <TextInput placeholder={"Enter Category Name"} onChange={setCategoryName} value={categoryName} />
       <TextButton title='Create' />
       </>
    )
}
