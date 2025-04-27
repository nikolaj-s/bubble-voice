import React from 'react'

import Label from '../../../../../components/ui/Titles/Label/Label'

import RichTextEditor from '../../../../../components/ui/Inputs/RichTextEditor/RichTextEditor'

import { ApplyChangesPopup } from '../../../../../components/ApplyChangesPopup/ApplyChangesPopup'

import { useDispatch } from 'react-redux'

import { createWidget } from '../../../../../features/Widgets/Thunks/createWidget'

import { useSearchParams } from 'react-router-dom'

export const AddRichTextWidget = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const [text, setText] = React.useState('');

    const handleCreate = () => {
        if (text.length < 20) return;

        dispatch(createWidget({text, type: 'rich_text'}));

        setSearchParams({section: 'manageWidgets'});

    }

    return (
        <>
        <Label label='Mark up some text!' />
        <RichTextEditor value={text} onChange={setText} />
        <ApplyChangesPopup onClearChanges={() => {setText('')}} onApply={handleCreate} name='Create' disabled={text.trim().length < 20} />
        </>
    )
}
