import React from 'react'
import TextInput from '../../../../../components/ui/Inputs/TextInput/TextInput'
import { DynamicMediaWidget } from '../../../../../components/Widgets/DynamicMediaWidget/DynamicMediaWidget'
import Label from '../../../../../components/ui/Titles/Label/Label';
import { ApplyChangesPopup } from '../../../../../components/ApplyChangesPopup/ApplyChangesPopup';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { createWidget } from '../../../../../features/Widgets/Thunks/createWidget';

export const AddDynamicMediaGallery = () => {

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const [query, setQuery] = React.useState("");

    const handleCreateWidget = () => {
        if (query.trim().length < 2) return;

        dispatch(createWidget({type: 'dynamic_media', query}));

        setSearchParams({section: "manageWidgets"});
    }

    const handleClearWidget = () => {
        setQuery("");
    }

    return (
        <>
        <Label label='A preview to your input' />
        <DynamicMediaWidget query={query} />
        <Label label='What masterpiece shall we summon today?' />
        <TextInput placeholder={'Query'} value={query} onChange={setQuery} />
        <ApplyChangesPopup disabled={query.trim().length < 2} onApply={handleCreateWidget} onClearChanges={handleClearWidget} />
        </>
    )
}
