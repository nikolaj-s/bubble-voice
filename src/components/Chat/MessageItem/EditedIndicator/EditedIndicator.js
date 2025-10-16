import React from 'react'
import { BoxLabel } from '../../../ui/Titles/BoxLabel/BoxLabel';
import DateTimeDisplay from '../../../ui/DateTimeDisplay/DateTimeDisplay';

export const EditedIndicator = ({edited, updatedAt}) => {

    if (!edited) return null;

    return (
        <BoxLabel  maxWidth={'100%'} label={<span style={{whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 4}}>Edited <DateTimeDisplay date={updatedAt} /></span>} />
    )
}
